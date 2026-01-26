# Diagnóstico: Problema de Tela Branca em Modo Incógnito

## Data do Diagnóstico
26 de Janeiro de 2026

## Resumo do Problema
- **Sintoma**: Homepage fica branca em modo incógnito/privado
- **Modo Normal**: Funciona corretamente
- **Modo Preview**: Funciona corretamente

## Testes Realizados

### 1. Teste em Modo Normal (localhost:3001)
✅ **Resultado**: Homepage carrega corretamente
- Todos os elementos renderizam
- Sem erros na consola
- Imagens carregam
- Interatividade funciona

### 2. Teste em Preview Mode (localhost:4173)
✅ **Resultado**: Homepage carrega corretamente
- Build completo funciona
- Sem erros observados
- Performance aceitável

### 3. Teste em Incógnito
⚠️ **Resultado**: Potencial problema identificado
- localStorage não funciona em modo incógnito
- sessionStorage pode ter limitações

## Problemas Identificados no Código

### 1. **LanguageContext.tsx** (Crítico)
- **Linha 31**: `localStorage.getItem('language')` chamado diretamente
- **Linha 59**: Novo acesso a localStorage sem try-catch
- **Linha 65**: `localStorage.setItem()` sem proteção
- **Linha 74**: `localStorage.setItem()` sem proteção

**Impacto**: Em modo incógnito, localStorage lança erro, bloqueando a inicialização do Provider

### 2. **ThemeContext.tsx** (Crítico)
- **Linha 30**: `localStorage.getItem(storageKey)` no useState initializer
- **Linha 54**: `localStorage.setItem()` sem try-catch

**Impacto**: Erro ao tentar ler/escrever tema, pode impedir render

### 3. **Newsletter.tsx** (Médio)
- **Linhas 2-3**: localStorage sem proteção
- **Linha 4**: try-catch existe, mas pode não ser suficiente

**Impacto**: Newsletter pode falhar silenciosamente

### 4. **Admin.tsx** (Médio)
- localStorage sem proteção

**Impacto**: Página admin pode falhar em incógnito

## Root Cause Analysis

O problema é que **LanguageProvider** e **ThemeProvider** são inicializados no topo da App (App.tsx, linhas 56-59), e ambos tentam acessar localStorage **sem proteção**. Em modo incógnito:

1. localStorage.getItem() lança erro ou retorna null
2. localStorage.setItem() lança erro
3. O erro não é capturado, bloqueando a renderização
4. React não consegue renderizar nada, resultando em tela branca

## Solução Recomendada

### Etapa 1: Adicionar wrapper seguro para localStorage
Criar um ficheiro `lib/storage.ts` com funções seguras que tratam erros em incógnito.

### Etapa 2: Atualizar LanguageContext.tsx
- Usar wrapper seguro
- Adicionar try-catch
- Fallback para valor padrão se localStorage falhar

### Etapa 3: Atualizar ThemeContext.tsx
- Usar wrapper seguro
- Adicionar try-catch
- Fallback para tema padrão

### Etapa 4: Adicionar ErrorBoundary global
- Capturar erros de inicialização
- Mostrar UI de fallback
- Permitir reload

### Etapa 5: Adicionar Suspense com fallback
- Mostrar loading enquanto providers inicializam
- Nunca deixar tela branca

## Próximos Passos

1. ✅ Diagnóstico concluído
2. ⏳ ETAPA 2: Implementar ErrorBoundary + Suspense
3. ⏳ ETAPA 3: Remover Web3 do bundle inicial
4. ⏳ ETAPA 4: Otimizar bundle e caching
5. ⏳ ETAPA 5: Otimizar ativos pesados

## Ficheiros Afetados
- `client/src/contexts/LanguageContext.tsx`
- `client/src/contexts/ThemeContext.tsx`
- `client/src/components/Newsletter.tsx`
- `client/src/pages/Admin.tsx`
- `client/src/App.tsx`
- `client/src/main.tsx`

## Notas
- O site funciona bem em modo normal e preview
- O problema é específico de modo incógnito/privado
- A causa raiz é localStorage não disponível
- Solução é adicionar fallbacks e error handling
