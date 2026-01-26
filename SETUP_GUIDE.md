# 📋 Guia de Configuração - Lubdan Platform

## ✅ Passo 1: Clonar o Repositório

```bash
git clone https://github.com/mumaggos/manusludban.git
cd manusludban
```

---

## ✅ Passo 2: Instalar Dependências

```bash
pnpm install
```

Ou se usar npm:
```bash
npm install
```

---

## ✅ Passo 3: Criar Ficheiro `.env.local`

Na **raiz do projeto** (mesmo nível do `package.json`), crie um ficheiro chamado `.env.local` e copie o seguinte conteúdo:

```
# Admin Token for Newsletter Management
ADMIN_TOKEN=admin-secret-token

# Analytics (Optional)
VITE_ANALYTICS_ID=
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=

# Server Port
PORT=3000

# Environment
NODE_ENV=development
```

**Importante**: Este ficheiro é automaticamente ignorado pelo Git (está no `.gitignore`), portanto é seguro guardar informações sensíveis aqui.

---

## ✅ Passo 4: Iniciar o Servidor em Desenvolvimento

```bash
npm run dev
```

Ou com pnpm:
```bash
pnpm dev
```

O servidor iniciará em: `http://localhost:3000`

---

## ✅ Passo 5: Aceder ao Painel de Admin

1. Abra o navegador e vá para: `http://localhost:3000/admin`

2. Clique em **"Connect Wallet"** (canto superior direito)

3. Selecione **MetaMask** ou outra wallet

4. Autorize a conexão

5. **Importante**: O endereço da wallet deve ser o endereço autorizado. Se receber "Access Denied", contacte o administrador para adicionar o seu endereço.

---

## ✅ Passo 6: Gerir Subscritores da Newsletter

1. No painel de admin, clique em **"Load Subscribers"**

2. Clique em **"Enter Admin Token"**

3. Insira o token: `admin-secret-token`

4. Clique em **"Load"**

Agora pode:
- ✓ Ver todos os subscritores
- ✓ Ver data de subscrição
- ✓ Eliminar subscritores
- ✓ Exportar em CSV

---

## 🔐 Configuração em Produção (Vercel)

### Passo 1: Gerar um Token Seguro

Execute este comando no seu terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Vai receber algo como:
```
f86162c0cc2930f55356dc6f49a108864c9589ad01bd272669cf078fb90b5033
```

**Copie este token e guarde-o num local seguro!**

### Passo 2: Configurar no Vercel

1. Vá para: https://vercel.com/dashboard

2. Selecione o projeto **manusludban**

3. Clique em **Settings** (no topo)

4. Clique em **Environment Variables** (à esquerda)

5. Clique em **Add New**

6. Preencha:
   - **Name**: `ADMIN_TOKEN`
   - **Value**: Cole o token que gerou acima
   - **Environments**: Selecione **Production**, **Preview** e **Development**

7. Clique em **Save**

8. Vá para **Deployments** e clique em **Redeploy** no deployment mais recente

9. Aguarde o deploy completar

### Passo 3: Testar em Produção

1. Vá para: `https://seu-dominio.com/admin`

2. Conecte a wallet

3. Clique em **"Load Subscribers"**

4. Insira o token que configurou

5. Clique em **"Load"**

---

## 🔄 Alterar o Endereço Autorizado (Opcional)

Se quiser que outro endereço tenha acesso ao painel de admin:

1. Abra o ficheiro: `client/src/pages/Admin.tsx`

2. Procure pela linha 14:
   ```typescript
   const OWNER_ADDRESS = "0x6a2ed39204da66d9eecd06d398e3b06e6ab609ae";
   ```

3. Substitua o endereço pelo seu:
   ```typescript
   const OWNER_ADDRESS = "0xSEU_ENDERECO_AQUI";
   ```

4. Faça commit e push:
   ```bash
   git add client/src/pages/Admin.tsx
   git commit -m "chore: update authorized admin address"
   git push origin main
   ```

---

## 📊 Resumo de Tokens

| Ambiente | Token |
|----------|-------|
| **Desenvolvimento** | `admin-secret-token` |
| **Produção** | Token seguro (gerado com crypto) |

---

## ❓ Troubleshooting

### Problema: "Invalid token"
**Solução**: Verifique se o token está correto no `.env.local` ou nas Environment Variables do Vercel

### Problema: "Access Denied"
**Solução**: O endereço da wallet não é o autorizado. Altere `OWNER_ADDRESS` em `client/src/pages/Admin.tsx`

### Problema: "Failed to load subscribers"
**Solução**: 
- Verifique se o servidor está a correr
- Verifique os logs do servidor
- Certifique-se de que o ficheiro `subscribers.json` existe

### Problema: Porta 3000 já está em uso
**Solução**: Altere a porta no `.env.local`:
```
PORT=3001
```

---

## 📚 Ficheiros Importantes

- `.env.local` - Configuração local (não versionado)
- `.env.example` - Exemplo de configuração
- `README.ADMIN.md` - Documentação do painel de admin
- `client/src/pages/Admin.tsx` - Código do painel de admin
- `server/index.ts` - API do servidor

---

## 🚀 Comandos Úteis

```bash
# Instalar dependências
pnpm install

# Iniciar em desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start

# Limpar cache
pnpm store prune
```

---

**Pronto! Agora tem tudo configurado corretamente! 🎉**
