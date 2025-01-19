import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import Analytics from "@/pages/Analytics";
import Research from "@/pages/Research";
import Games from "@/pages/Games";
import Admin from "@/pages/Admin";
import News from "@/pages/News";
import Subscription from "@/pages/Subscription";
import Checkout from "@/pages/Checkout";
import ProjectDetails from "@/pages/ProjectDetails";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;