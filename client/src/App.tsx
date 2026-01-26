import { Toaster } from "@/components/ui/sonner";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './lib/wagmi';
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Presale from "./pages/Presale";
import Dashboard from "./pages/Dashboard";
import Dividends from "./pages/Dividends";
import Roadmap from "./pages/Roadmap";
import FAQ from "./pages/FAQ";
import Whitepaper from "./pages/Whitepaper";
import Tokenomics from "./pages/Tokenomics";
import SocialFloatingButtons from "./components/SocialFloatingButtons";



function Router() {
  return (
    <>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/presale"} component={Presale} />
        <Route path={"/dashboard"} component={Dashboard} />
        <Route path={"/dividends"} component={Dividends} />
        <Route path={"/roadmap"} component={Roadmap} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/whitepaper"} component={Whitepaper} />
        <Route path={"/tokenomics"} component={Tokenomics} />
        <Route path={"/admin"} component={Admin} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <SocialFloatingButtons />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="lubdan-theme">
              <TooltipProvider>
                <Toaster />
                <Router />
              </TooltipProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
