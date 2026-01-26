# 🚀 CONFIGURAÇÃO VERCEL - PASSO A PASSO

## Token Seguro Configurado

```
f55765671e191da58dfdf6799479d44e73fa69d3a5593e3ee849f6af1abbe668
```

---

## O que Fazer no Vercel

### Passo 1: Ir para o Dashboard

Vá para: https://vercel.com/dashboard

---

### Passo 2: Selecionar o Projeto

Clique no projeto **manusludban**

---

### Passo 3: Ir para Settings

Clique em **Settings** (no topo do projeto)

---

### Passo 4: Environment Variables

No menu à esquerda, clique em **Environment Variables**

---

### Passo 5: Adicionar Variável

Clique em **Add New** (botão azul)

---

### Passo 6: Preencher os Dados

Na caixa que aparecer, preencha:

**Name:**
```
ADMIN_TOKEN
```

**Value:**
```
f55765671e191da58dfdf6799479d44e73fa69d3a5593e3ee849f6af1abbe668
```

**Environments:** Selecione os 3:
- ☑️ Production
- ☑️ Preview
- ☑️ Development

---

### Passo 7: Guardar

Clique em **Save**

---

### Passo 8: Redeploy

1. Vá para **Deployments** (no topo)
2. Procure o deployment mais recente
3. Clique nos **3 pontos** (...)
4. Clique em **Redeploy**
5. Aguarde o deploy completar (vai aparecer "Ready")

---

## ✅ Pronto!

Depois do redeploy completar, o painel de admin funcionará com o token:

```
f55765671e191da58dfdf6799479d44e73fa69d3a5593e3ee849f6af1abbe668
```

---

## 🧪 Testar

1. Vá para: `https://seu-dominio.com/admin`
2. Conecte a wallet
3. Clique em "Load Subscribers"
4. Insira o token: `f55765671e191da58dfdf6799479d44e73fa69d3a5593e3ee849f6af1abbe668`
5. Clique em "Load"

**Pronto! Agora vê todos os emails! ✅**

---

## 📝 Resumo

| Item | Valor |
|------|-------|
| **Variável** | ADMIN_TOKEN |
| **Token** | f55765671e191da58dfdf6799479d44e73fa69d3a5593e3ee849f6af1abbe668 |
| **Ambientes** | Production, Preview, Development |
| **Ação** | Redeploy |

---

**Tudo pronto! 🎉**
