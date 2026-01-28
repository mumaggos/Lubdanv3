import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingFallback } from "./components/LoadingFallback";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import SocialFloatingButtons from "./components/SocialFloatingButtons";
import { Suspense, lazy, useMemo } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3Wrapper } from "./components/Web3Wrapper";
import Home from "./pages/Home";

// Lazy load pages that require Web3
const Presale = lazy(() => import("./pages/Presale"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Dividends = lazy(() => import("./pages/Dividends"));
const Admin = lazy(() => import("./pages/Admin"));

// Lazy load heavy pages with charts and large libraries
const Tokenomics = lazy(() => import("./pages/Tokenomics"));
const Roadmap = lazy(() => import("./pages/Roadmap"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));

function Router({ queryClient }: { queryClient: QueryClient }) {
  return (
    <>
      <Switch>
        {/* Non-Web3 routes */}
        <Route path={"/"} component={Home} />
        <Route path={"/roadmap"}>
          <Suspense fallback={<LoadingFallback />}>
            <Roadmap />
          </Suspense>
        </Route>
        <Route path={"/faq"}>
          <Suspense fallback={<LoadingFallback />}>
            <FAQ />
          </Suspense>
        </Route>
        <Route path={"/whitepaper"}>
          <Suspense fallback={<LoadingFallback />}>
            <Whitepaper />
          </Suspense>
        </Route>
        <Route path={"/tokenomics"}>
          <Suspense fallback={<LoadingFallback />}>
            <Tokenomics />
          </Suspense>
        </Route>
        
        {/* Web3 routes - wrapped with Suspense and Web3Wrapper */}
        <Route path={"/presale"}>
          {() => (
            <Suspense fallback={<LoadingFallback />}>
              <Web3Wrapper queryClient={queryClient}>
                <Presale />
              </Web3Wrapper>
            </Suspense>
          )}
        </Route>
        <Route path={"/dashboard"}>
          {() => (
            <Suspense fallback={<LoadingFallback />}>
              <Web3Wrapper queryClient={queryClient}>
                <Dashboard />
              </Web3Wrapper>
            </Suspense>
          )}
        </Route>
        <Route path={"/dividends"}>
          {() => (
            <Suspense fallback={<LoadingFallback />}>
              <Web3Wrapper queryClient={queryClient}>
                <Dividends />
              </Web3Wrapper>
            </Suspense>
          )}
        </Route>
        <Route path={"/admin"}>
          {() => (
            <Suspense fallback={<LoadingFallback />}>
              <Web3Wrapper queryClient={queryClient}>
                <Admin />
              </Web3Wrapper>
            </Suspense>
          )}
        </Route>
        
        {/* Fallback routes */}
        <Route path={"/404"} component={NotFound} />
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

function App() {
  // Create QueryClient once and reuse it
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      },
    },
  }), []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="lubdan-theme">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router queryClient={queryClient} />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
