# Lubdan Platform

A long-term Polygon project designed for sustainability, transparency, and real MATIC dividends.

## Features

- **Whitepaper Page**: Complete documentation of the Lubdan project
- **Newsletter System**: Subscribe to updates with admin panel to manage subscribers
- **Multi-Language Support**: Automatic language detection (English, Portuguese, French, German, Chinese, Japanese, Korean)
- **Presale Management**: Real-time presale statistics and token purchase
- **Dividend System**: Track and claim MATIC dividends
- **Admin Dashboard**: Manage presale phases, withdrawals, and newsletter subscribers

## Installation

```bash
# Install dependencies
pnpm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env` file in the root directory:

```env
ADMIN_TOKEN=your-secret-admin-token
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── contexts/        # React contexts (Language, Theme)
│   │   ├── hooks/           # Custom hooks
│   │   └── lib/             # Utilities and configurations
│   └── public/              # Static assets
├── server/
│   └── index.ts             # Express server with API endpoints
└── shared/                  # Shared utilities
```

## API Endpoints

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/admin/subscribers` - Get all subscribers (requires auth)
- `DELETE /api/admin/subscribers/:id` - Delete subscriber (requires auth)
- `GET /api/admin/subscribers/export/csv` - Export subscribers as CSV (requires auth)

## Multi-Language Support

The application automatically detects the user's browser language and displays content in the appropriate language. Supported languages:
- English (en)
- Português (pt)
- Français (fr)
- Deutsch (de)
- 中文 (zh)
- 日本語 (ja)
- 한국어 (ko)

Users can manually switch languages using the language selector in the header.

## Admin Panel

Access the admin panel at `/admin` with a connected wallet (must be the owner address).

Features:
- View presale statistics
- Manage presale phases
- Withdraw funds
- Manage newsletter subscribers
- Export subscriber data as CSV

## Technologies

- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Blockchain**: Wagmi, Viem, Polygon
- **UI Components**: Radix UI
- **Routing**: Wouter
- **State Management**: React Context

## License

MIT
