import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardLayout from "@/components/DashboardLayout";
import SubscriptionPage from "@/pages/Subscription";
import Checkout from "./pages/Checkout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <DashboardLayout>
            <div className="container mx-auto px-4">
              <h1 className="text-3xl font-bold text-crypto-blue">Welcome to Mericulum</h1>
            </div>
          </DashboardLayout>
        } />
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;