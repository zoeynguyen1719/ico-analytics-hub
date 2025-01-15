import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import SubscriptionPage from "@/pages/Subscription";
import Checkout from "./pages/Checkout";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Research from "./pages/Research";
import Games from "./pages/Games";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/research" element={<Research />} />
          <Route path="/games" element={<Games />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
};

export default App;