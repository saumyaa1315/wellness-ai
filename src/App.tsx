import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WellnessProvider } from "@/contexts/WellnessContext";
import Profile from "./pages/Profile";
import Tips from "./pages/Tips";
import TipDetails from "./pages/TipDetails";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WellnessProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/tip/:id" element={<TipDetails />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WellnessProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
