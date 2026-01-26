# 🔐 GUIA DE TOKEN SEGURO

## O que é um Token Seguro?

Um token seguro é uma **sequência aleatória de caracteres** que serve como **senha** para aceder ao painel de admin.

---

## ❌ O que NÃO fazer

**Não use:**
- `123456`
- `password`
- `admin`
- `lubdan`
- Datas (2024, 01201)
- Nomes (João, Maria)
- Sequências óbvias (abcdef, 111111)

---

## ✅ O que Fazer

Use um **token gerado aleatoriamente** pelo computador.

---

## 🎲 Como Gerar um Token Seguro

### Opção 1: Usar o Comando (RECOMENDADO)

Abra o terminal e copie isto:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Vai receber algo como:

```
f86162c0cc2930f55356dc6f49a108864c9589ad01bd272669cf078fb90b5033
```

**Este é o seu token seguro!** Copie e guarde.

---

### Opção 2: Usar um Gerador Online

Se não conseguir usar o comando, vá para:

https://www.random.org/strings/

Configurações:
- **Number of strings**: 1
- **Length of each string**: 64
- **Characters to use**: 0-9, a-f

Clique em "Get Strings" e copie o resultado.

---

### Opção 3: Usar Outro Gerador

Vá para: https://generate-random.org/encryption-key-generator

Selecione:
- **Key Size**: 256 bits
- **Format**: Hexadecimal

Clique em "Generate" e copie.

---

## 📝 Exemplo de Tokens Seguros

```
f86162c0cc2930f55356dc6f49a108864c9589ad01bd272669cf078fb90b5033
a7b3c9d2e1f4a8b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8
9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c
```

Todos estes são seguros porque foram gerados aleatoriamente.

---

## 🔄 Como Usar o Token

### Em Desenvolvimento (Local)

1. Gere um token com o comando acima
2. Abra o ficheiro `.env.local`
3. Substitua:

```
ADMIN_TOKEN=admin-secret-token
```

Por:

```
ADMIN_TOKEN=f86162c0cc2930f55356dc6f49a108864c9589ad01bd272669cf078fb90b5033
```

4. Guarde o ficheiro
5. Reinicie o servidor (`npm run dev`)
6. No painel de admin, use o novo token

---

### Em Produção (Vercel)

1. Gere um token com o comando acima
2. Vá para: https://vercel.com/dashboard
3. Clique no projeto **manusludban**
4. Clique em **Settings**
5. Clique em **Environment Variables**
6. Clique em **Add New**
7. Preencha:
   - **Name**: `ADMIN_TOKEN`
   - **Value**: Cole o token que gerou
8. Clique em **Save**
9. Vá para **Deployments** e clique em **Redeploy**
10. Aguarde o deploy completar
11. No painel de admin, use o novo token

---

## 💾 Onde Guardar o Token

**Importante**: Guarde o token num local seguro!

Opções:
- 📝 Num ficheiro de texto privado no seu computador
- 🔐 Num gestor de palavras-passe (1Password, LastPass, Bitwarden)
- 📱 Num bloco de notas encriptado
- 📧 Num email para si mesmo (em rascunho)

**Nunca compartilhe o token com ninguém!**

---

## 🆚 Comparação

| | Fraco | Seguro |
|---|---|---|
| **Exemplo** | `admin123` | `f86162c0cc2930f55356dc6f49a108864c9589ad01bd272669cf078fb90b5033` |
| **Comprimento** | Curto | Longo (64 caracteres) |
| **Padrão** | Óbvio | Aleatório |
| **Segurança** | Baixa | Alta |

---

## 🎯 Resumo Rápido

1. **Gere um token**:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Copie o resultado** (algo como `f86162c0cc...`)

3. **Use em Desenvolvimento**:
   - Coloque no `.env.local`

4. **Use em Produção**:
   - Coloque nas Environment Variables do Vercel

5. **Guarde o token** num local seguro

---

## ❓ Perguntas Frequentes

**P: Posso usar a mesma senha que uso noutros sítios?**
R: Não! Gere um token novo e único.

**P: Posso mudar o token depois?**
R: Sim! Gere um novo e atualize em Vercel.

**P: E se esquecer o token?**
R: Gere um novo e atualize em Vercel.

**P: Quantas vezes posso gerar tokens?**
R: Quantas quiser! Cada vez que executa o comando, recebe um novo.

---

**Pronto! Agora sabe como gerar e usar tokens seguros! 🔐**
