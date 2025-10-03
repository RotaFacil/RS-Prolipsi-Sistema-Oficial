#!/usr/bin/env node

/**
 * Script para deploy via SSH
 * 
 * Este script permite fazer deploy do projeto RS Prólipsi via SSH
 * Ele usa a biblioteca node-ssh para se conectar ao servidor e executar comandos
 */

const { NodeSSH } = require('node-ssh');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { promisify } = require('util');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = promisify(rl.question).bind(rl);

// Configurações padrão
const DEFAULT_CONFIG = {
  host: 'seu-servidor.com',
  username: 'rsprolipsi',
  port: 22,
  privateKeyPath: '~/.ssh/id_rsa',
  remotePath: '/home/rsprolipsi/apps',
  apps: ['raiz', 'admin', 'escritorio', 'api', 'rsshop', 'rsia', 'rswalletpay']
};

async function executeCommand(ssh, command, options, ignoreErrors = false) {
  console.log(`Executando: ${command}`);
  const result = await ssh.execCommand(command, options);

  if (result.stdout) {
    console.log(result.stdout);
  }
  if (result.stderr) {
    // Não trate todos os stderr como erros, pois alguns comandos (como pm2) os usam para status
    if (result.code !== 0) {
      console.error(result.stderr);
    }
  }

  if (result.code !== 0 && !ignoreErrors) {
    const errorMessage = `Erro ao executar comando: "${command}" (código de saída: ${result.code})`;
    throw new Error(errorMessage);
  }

  return result;
}

async function main() {
  console.log('=== Deploy RS Prólipsi via SSH ===');

  // Carregar configuração ou usar padrão
  let config = DEFAULT_CONFIG;

  try {
    if (fs.existsSync(path.join(__dirname, 'deploy-config.json'))) {
      config = {
        ...DEFAULT_CONFIG,
        ...JSON.parse(fs.readFileSync(path.join(__dirname, 'deploy-config.json'), 'utf8'))
      };
      console.log('Configuração carregada do arquivo deploy-config.json');
    }
  } catch (error) {
    console.warn('Erro ao carregar configuração:', error.message);
    console.log('Usando configuração padrão');
  }

  // Perguntar informações de conexão se não estiverem configuradas
  if (config.host === 'seu-servidor.com') {
    config.host = await question('Endereço do servidor: ');
  }

  if (!config.password && (!config.privateKeyPath || !fs.existsSync(path.resolve(config.privateKeyPath.replace('~', process.env.HOME || process.env.USERPROFILE))))) {
    console.log('Chave privada não encontrada em:', config.privateKeyPath);
    config.password = await question('Senha SSH: ');
  }

  // Perguntar qual app deve ser deployado
  console.log('\nAplicações disponíveis:');
  config.apps.forEach((app, index) => {
    console.log(`${index + 1}. ${app}`);
  });
  console.log(`${config.apps.length + 1}. Todos`);
  console.log(`${config.apps.length + 2}. Ver logs de uma aplicação`);
  
  const appChoice = await question('\nQual operação deseja realizar? (número): ');
  const appIndex = parseInt(appChoice, 10) - 1;
  
  let selectedApps = [];
  let action = 'deploy';

  if (appIndex === config.apps.length) {
    selectedApps = [...config.apps];
    console.log('Fazendo deploy de todas as aplicações');
  } else if (appIndex === config.apps.length + 1) {
    action = 'logs';
    const logAppChoice = await question('De qual aplicação você quer ver os logs? (número): ');
    const logAppIndex = parseInt(logAppChoice, 10) - 1;
    if (logAppIndex >= 0 && logAppIndex < config.apps.length) {
      selectedApps = [config.apps[logAppIndex]];
    } else {
      console.error('Opção inválida');
      process.exit(1);
    }
  } else if (appIndex >= 0 && appIndex < config.apps.length) {
    selectedApps = [config.apps[appIndex]];
    console.log(`Fazendo deploy de: ${selectedApps[0]}`);
  } else {
    console.error('Opção inválida');
    process.exit(1);
  }
  
  // Conectar via SSH
  const ssh = new NodeSSH();
  
  try {
    console.log(`\nConectando a ${config.username}@${config.host}...`);
    
    const sshConfig = {
      host: config.host,
      username: config.username,
      port: config.port
    };
    
    // Usar senha ou chave privada
    if (config.password) {
      sshConfig.password = config.password;
    } else {
      sshConfig.privateKey = fs.readFileSync(
        path.resolve(config.privateKeyPath.replace('~', process.env.HOME || process.env.USERPROFILE)),
        'utf8'
      );
    }
    
    await ssh.connect(sshConfig);
    console.log('Conectado com sucesso!');

    if (action === 'logs') {
      const app = selectedApps[0];
      console.log(`Buscando logs para ${app}...`);
      await executeCommand(ssh, `npx pm2 logs ${app} --lines 100`, {}, true);
      ssh.dispose();
      rl.close();
      return;
    }

    // Enviar arquivos da raiz do projeto para o servidor
    const remoteRoot = path.dirname(config.remotePath);
    const rootFilesToSync = ['package.json', 'package-lock.json', 'tsconfig.base.json'];
    console.log(`\n=== Sincronizando arquivos da raiz para ${remoteRoot} ===`);
    for (const file of rootFilesToSync) {
      const localPath = path.join(__dirname, '..', file);
      const remotePath = [remoteRoot, file].join('/');
      if (fs.existsSync(localPath)) {
        console.log(`Enviando ${file}...`);
        await ssh.putFile(localPath, remotePath);
      } else {
        console.warn(`AVISO: Arquivo ${file} não encontrado localmente. Pulando.`);
      }
    }
    
    // Executar deploy para cada app selecionado
    for (const app of selectedApps) {
      console.log(`\n=== Iniciando deploy de ${app} ===`);
      
      // Corrigir o caminho para usar barras normais
      const appPath = [config.remotePath, app].join('/');
      const localAppPath = path.join(__dirname, '../apps', app);

      try {
        // Garantir que o diretório remoto exista
        await executeCommand(ssh, `mkdir -p ${appPath}`);

        // Copiar arquivos do diretório local para o remoto, garantindo a sincronização
        console.log(`Sincronizando arquivos de ${app} para ${appPath}...`);
        const failed = [];
        const status = await ssh.putDirectory(localAppPath, appPath, {
          recursive: true,
          concurrency: 10,
          validate: (itemPath) => !itemPath.includes('node_modules') && !itemPath.includes('.next'),
          tick: (localPath, remotePath, error) => {
            if (error) {
              failed.push(localPath);
            }
          }
        });

        if (!status || failed.length > 0) {
          throw new Error(`Falha ao sincronizar arquivos para ${appPath}. Arquivos com falha: ${failed.join(', ')}`);
        }
        console.log('Arquivos sincronizados com sucesso.');

        // Verificar o conteúdo do package.json no servidor
        console.log('Verificando o conteúdo do package.json no servidor...');
        await executeCommand(ssh, `cat ${appPath}/package.json`, {}, true);

        // Instalar dependências
        await executeCommand(ssh, 'npm install', { cwd: appPath });
        
        // Build (se necessário para apps Next.js)
        if (['raiz', 'admin', 'escritorio', 'rsshop'].includes(app)) {
          console.log('Executando build...');
          await executeCommand(ssh, 'npm run build', { cwd: appPath });
        }
        
        // Reiniciar ou iniciar o serviço no PM2
        console.log('Reiniciando serviço no PM2...');
        const pm2Command = `npx pm2 restart ${app} --update-env || npx pm2 start npm --name "${app}" -- run start`;
        await executeCommand(ssh, pm2Command, { cwd: appPath }, true); // Ignora erros para o caso de o app não existir
        
        console.log(`\n✅ Deploy de ${app} concluído com sucesso!`);

      } catch (error) {
        console.error(`❌ Falha no deploy de ${app}: ${error.message}`);
        console.log(`Pulando para a próxima aplicação...`);
      }
    }
    
    ssh.dispose();
    console.log('\n🎉 Deploy concluído!');
    
  } catch (error) {
    console.error('Erro durante o deploy:', error.message);
    if (ssh.isConnected()) {
      ssh.dispose();
    }
    process.exit(1);
  }

  rl.close();
}

main();