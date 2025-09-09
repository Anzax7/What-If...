import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SimulationResult from "./pages/SimulationResult";
import { SimulationProvider } from "./context/SimulationContext";
import Background from "./components/Background";
import SocialLink from "./components/SocialLink"; // Import the new SocialLink component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SimulationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Background />
        <BrowserRouter>
          <div className="relative min-h-screen"> {/* Added relative positioning for absolute children */}
            <div className="absolute top-4 left-4 z-50"> {/* Position the social link */}
              <SocialLink 
                href="https://www.instagram.com/anzaxmusic/" 
                src="/images/instagram-logo.png" 
                alt="Instagram" 
              />
            </div>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/simulation" element={<SimulationResult />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </SimulationProvider>
  </QueryClientProvider>
);

export default App;