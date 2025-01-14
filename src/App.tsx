import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResearchLibrary from "./pages/ResearchLibrary";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardLayout from "@/components/DashboardLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<DashboardContent activeSection="INTRODUCTION" isAuthenticated={false} sections={{}} />} />
            <Route path="/research-library" element={<ResearchLibrary />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;