# 📧 Configuração do Newsletter com Web3Forms

## O que é Web3Forms?

Web3Forms é um serviço **gratuito** que permite receber emails de formulários sem precisar de servidor backend. Perfeito para Vercel!

---

## 🎯 Como Configurar (5 minutos)

### Passo 1: Criar Conta no Web3Forms

1. Vá para: https://web3forms.com/
2. Clique em **"Get Started for Free"**
3. Insira seu email
4. Clique em **"Create Access Key"**

---

### Passo 2: Copiar Access Key

Após criar a conta, você receberá um **Access Key** como este:

```
a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

**Copie este Access Key!**

---

### Passo 3: Configurar no Projeto

#### Opção A: Variável de Ambiente (RECOMENDADO)

1. Vá para Vercel → Settings → Environment Variables
2. Adicione:
   - **Name**: `VITE_WEB3FORMS_KEY`
   - **Value**: Cole o Access Key que copiou
3. Clique em **Save**
4. Redeploy o projeto

#### Opção B: Direto no Código (Menos Seguro)

1. Abra: `client/src/components/Newsletter.tsx`
2. Procure por: `access_key: "YOUR_WEB3FORMS_ACCESS_KEY"`
3. Substitua por: `access_key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"`
4. Faça commit e push

---

## ✅ Como Funciona

1. Utilizador insere email na newsletter
2. Email é enviado para Web3Forms
3. Web3Forms envia email para você
4. Você recebe notificação no seu email

---

## 📧 Onde Receber os Emails

Os emails dos subscritores serão enviados para o email que você usou para criar a conta no Web3Forms.

Você pode configurar para enviar para outro email:
1. Vá para: https://web3forms.com/
2. Faça login
3. Clique em **"Settings"**
4. Altere o email de destino

---

## 🎁 Vantagens

✅ **100% Gratuito** - Até 250 emails/mês
✅ **Sem Servidor** - Funciona perfeitamente no Vercel
✅ **Simples** - Configuração em 5 minutos
✅ **Confiável** - Usado por milhares de sites

---

## 📊 Alternativa: Usar LocalStorage

Se não quiser configurar Web3Forms agora, o sistema já está configurado para guardar emails no **localStorage** do navegador como backup.

Para ver os emails:
1. Abra o site
2. Pressione F12 (DevTools)
3. Vá para **Application** → **Local Storage**
4. Procure por `lubdan_subscribers`

---

## 🔄 Atualizar o Código

Se já configurou o Access Key, atualize o código:

```typescript
// client/src/components/Newsletter.tsx
access_key: process.env.VITE_WEB3FORMS_KEY || "YOUR_WEB3FORMS_ACCESS_KEY"
```

---

## ❓ Problemas?

### "Failed to subscribe"
- Verifique se o Access Key está correto
- Verifique se a variável de ambiente está configurada no Vercel

### "An error occurred"
- Verifique a conexão com a internet
- Tente novamente em alguns minutos

---

**Pronto! Newsletter configurado e funcionando! 🎉**
