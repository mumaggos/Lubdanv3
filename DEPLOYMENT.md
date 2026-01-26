# Deployment Guide - Lubdan Platform

## Correções Aplicadas

Este projeto foi corrigido para resolver problemas de tradução. As seguintes chaves de tradução foram adicionadas ao `LanguageContext.tsx`:

### Chaves Adicionadas:
- `home.hero.title.where` - "Where" (em todas as línguas)
- `home.hero.title.meets` - "Meets" (em todas as línguas)
- `home.hero.presale_live` - "Presale Phase {phase} Live" (em todas as línguas)
- `faq.title` - "Frequently Asked" (em todas as línguas)
- `dashboard.eligible` - "Eligible" (em todas as línguas)
- `presale.phase1` - "Phase 1" (em todas as línguas)
- `presale.phase2` - "Phase 2" (em todas as línguas)
- `presale.current` - "Current" (em todas as línguas)
- `footer.audit` - "Audit Report" (em todas as línguas)
- `presale.widget.connect_first` - "Please connect your wallet first" (em todas as línguas)
- `presale.widget.error` - "Error processing transaction" (em todas as línguas)
- `presale.widget.success` - "Transaction successful" (em todas as línguas)
- `presale.widget.valid_amount` - "Please enter a valid amount" (em todas as línguas)

### Línguas Suportadas:
- English (en)
- Português (pt)
- Français (fr)
- Deutsch (de)
- 中文 (zh)
- 日本語 (ja)
- 한국어 (ko)

## Build & Deploy

### Development
```bash
pnpm install
pnpm dev
```

### Production Build
```bash
pnpm install
pnpm build
pnpm start
```

### Environment Variables
Create a `.env` file with:
```
VITE_ANALYTICS_ID=your_analytics_id
VITE_ANALYTICS_ENDPOINT=your_endpoint
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

## Deployment Options

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t lubdan-platform .
docker run -p 3000:3000 lubdan-platform
```

### Node.js
```bash
NODE_ENV=production node dist/index.js
```

## Troubleshooting

If translations are not showing:
1. Check browser console for missing translation keys
2. Verify `LanguageContext.tsx` has all required keys
3. Clear browser cache and localStorage
4. Check localStorage for saved language preference

## Support
For issues, check the README.md and SETUP_GUIDE.md files.
