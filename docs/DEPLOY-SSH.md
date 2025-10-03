# Deploy via SSH - RS Prólipsi

Este documento explica como fazer deploy do projeto RS Prólipsi via SSH.

## Pré-requisitos

1. Acesso SSH ao servidor
2. Node.js instalado na sua máquina local
3. Chave SSH configurada (ou acesso por senha)

## Instalação

Para usar o script de deploy, instale as dependências necessárias:

```bash
# Na pasta raiz do projeto
npm install --save-dev node-ssh
```

## Configuração

1. Edite o arquivo `scripts/deploy-config.json` com as informações do seu servidor:

```json
{
  "host": "seu-servidor.com",
  "username": "rsprolipsi",
  "port": 22,
  "privateKeyPath": "~/.ssh/id_rsa",
  "remotePath": "/home/rsprolipsi/apps",
  "apps": ["raiz", "admin", "escritorio", "api", "rsshop", "rsia", "rswalletpay"]
}
```

## Uso

Execute o script de deploy:

```bash
# Na pasta raiz do projeto
node scripts/deploy-ssh.js
```

O script irá:
1. Conectar ao servidor via SSH
2. Perguntar qual aplicação você deseja fazer deploy
3. Atualizar o código (git pull)
4. Instalar dependências
5. Executar build (exceto para a API)
6. Reiniciar o serviço no PM2

## Solução de problemas

### Erro de conexão SSH

Verifique se:
- O servidor está acessível
- As credenciais estão corretas
- A chave SSH tem as permissões corretas (chmod 600)

### Erro durante o deploy

Verifique os logs do PM2:
```bash
pm2 logs
```

## Configuração da chave SSH

Se você ainda não tem uma chave SSH:

1. Gere uma nova chave:
   ```bash
   ssh-keygen -t rsa -b 4096
   ```

2. Copie a chave para o servidor:
   ```bash
   ssh-copy-id usuario@seu-servidor.com
   ```

3. Teste a conexão:
   ```bash
   ssh usuario@seu-servidor.com
   ```