import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";
import { Card } from "./components/ui/card";

// Lazy load pages
const Index = lazy(() => import("@/pages/Index"));
const SignIn = lazy(() => import("@/pages/SignIn"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const Research = lazy(() => import("@/pages/Research"));
const Games = lazy(() => import("@/pages/Games"));
const Admin = lazy(() => import("@/pages/Admin"));
const News = lazy(() => import("@/pages/News"));
const Subscription = lazy(() => import("@/pages/Subscription"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const ProjectDetails = lazy(() => import("@/pages/ProjectDetails"));
const ICODashboard = lazy(() => import("@/pages/ICODashboard"));

const LoadingFallback = () => (
  <Card className="p-6 m-4">
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
    </div>
  </Card>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/research" element={<Research />} />
            <Route path="/games" element={<Games />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/news" element={<News />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/project/:slug" element={<ProjectDetails />} />
            <Route path="/ico-dashboard" element={<ICODashboard />} />
          </Routes>
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
