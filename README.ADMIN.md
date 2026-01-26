# Admin Panel - Newsletter Management

## Acesso ao Painel de Admin

O painel de admin está disponível em `/admin` e permite gerir os subscritores da newsletter.

### Requisitos

1. **Wallet Conectada**: Você precisa conectar uma wallet Web3 (MetaMask, etc.)
2. **Endereço Autorizado**: O endereço da wallet deve ser o endereço do proprietário (configurado em `client/src/pages/Admin.tsx`)
3. **Token de Admin**: Um token seguro para aceder aos dados dos subscritores

## Configuração do Token de Admin

### Desenvolvimento Local

1. Copie o ficheiro `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Gere um token seguro (opcional, o padrão é `admin-secret-token`):
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. Configure o token no ficheiro `.env.local`:
   ```
   ADMIN_TOKEN=seu-token-seguro-aqui
   ```

4. Reinicie o servidor para aplicar as mudanças

### Produção (Vercel)

1. Vá para o dashboard do Vercel
2. Selecione o projeto `manusludban`
3. Vá para **Settings** → **Environment Variables**
4. Adicione uma nova variável:
   - **Name**: `ADMIN_TOKEN`
   - **Value**: Um token seguro gerado com o comando acima
5. Clique em **Save**
6. Faça redeploy do projeto

## Usando o Painel de Admin

1. Aceda a `https://seu-dominio.com/admin`
2. Conecte sua wallet (deve ser o endereço autorizado)
3. Clique em **"Load Subscribers"**
4. Insira o token de admin
5. Clique em **"Load"**

Agora pode:
- Ver todos os subscritores da newsletter
- Ver a data de subscrição
- Eliminar subscritores individuais
- Exportar a lista completa em CSV

## Tokens Padrão

- **Desenvolvimento**: `admin-secret-token`
- **Produção**: Configure uma variável de ambiente segura

## Segurança

⚠️ **Importante**: 
- Nunca compartilhe o token de admin
- Use um token diferente em produção
- Mude o endereço autorizado (`OWNER_ADDRESS`) para o seu endereço
- O token é transmitido como Bearer token no header `Authorization`

## Troubleshooting

### "Invalid token"
- Verifique se o token está correto
- Verifique se a variável de ambiente `ADMIN_TOKEN` está configurada
- Reinicie o servidor

### "Access Denied"
- Verifique se a wallet conectada é o endereço autorizado
- O endereço está configurado em `client/src/pages/Admin.tsx` (linha 14)
- Mude o valor de `OWNER_ADDRESS` para o seu endereço

### "Failed to load subscribers"
- Verifique a conexão com o servidor
- Verifique os logs do servidor
- Certifique-se de que o ficheiro `subscribers.json` existe no servidor
