import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import SubscriptionPage from "@/pages/Subscription";
import Checkout from "./pages/Checkout";
import Index from "./pages/Index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;