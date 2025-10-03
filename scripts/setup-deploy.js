#!/usr/bin/env node

/**
 * Script para configurar rapidamente o ambiente de deploy
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Caminho para o arquivo de configuração
const configPath = path.join(__dirname, 'deploy-config.json');

console.log('=== Configuração Rápida de Deploy SSH ===');

// Instalar dependências
console.log('\n1. Instalando dependências necessárias...');
try {
  execSync('npm install --save-dev node-ssh', { stdio: 'inherit' });
  console.log('✅ Dependências instaladas com sucesso!');
} catch (error) {
  console.error('❌ Erro ao instalar dependências:', error.message);
}

// Configurar servidor
console.log('\n2. Configurando servidor...');

// Carregar configuração existente
let config = {
  host: 'seu-servidor.com',
  username: 'rsprolipsi',
  port: 22,
  privateKeyPath: '~/.ssh/id_rsa',
  remotePath: '/home/rsprolipsi/apps',
  apps: ['raiz', 'admin', 'escritorio', 'api', 'rsshop', 'rsia', 'rswalletpay']
};

if (fs.existsSync(configPath)) {
  try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    console.warn('Aviso: Erro ao ler arquivo de configuração existente');
  }
}

// Perguntar informações do servidor
rl.question(`Host do servidor [${config.host}]: `, (host) => {
  config.host = host || config.host;
  
  rl.question(`Nome de usuário [${config.username}]: `, (username) => {
    config.username = username || config.username;
    
    rl.question(`Porta SSH [${config.port}]: `, (port) => {
      config.port = port ? parseInt(port, 10) : config.port;
      
      rl.question(`Caminho da chave privada [${config.privateKeyPath}]: `, (keyPath) => {
        config.privateKeyPath = keyPath || config.privateKeyPath;
        
        rl.question(`Caminho remoto no servidor [${config.remotePath}]: `, (remotePath) => {
          config.remotePath = remotePath || config.remotePath;
          
          // Salvar configuração
          fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
          console.log('✅ Configuração salva com sucesso!');
          
          console.log('\n3. Testando conexão SSH...');
          try {
            execSync(`ssh -o BatchMode=yes -o ConnectTimeout=5 ${config.username}@${config.host} echo "Conexão SSH funcionando!"`, { stdio: 'inherit' });
            console.log('✅ Conexão SSH estabelecida com sucesso!');
          } catch (error) {
            console.warn('⚠️ Não foi possível conectar via SSH automaticamente.');
            console.log('Você pode precisar configurar sua chave SSH manualmente:');
            console.log(`1. ssh-keygen -t rsa -b 4096`);
            console.log(`2. ssh-copy-id ${config.username}@${config.host}`);
          }
          
          console.log('\n🎉 Configuração concluída!');
          console.log('\nPara fazer deploy:');
          console.log('node scripts/deploy-ssh.js');
          
          rl.close();
        });
      });
    });
  });
});