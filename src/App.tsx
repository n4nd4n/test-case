import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NameEntry from "./pages/NameEntry";
import ImageUpload from "./pages/ImageUpload";
import BirthdayReveal from "./pages/BirthdayReveal";
import Celebration from "./pages/Celebration";
import CakeCutting from "./pages/CakeCutting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NameEntry />} />
          <Route path="/upload" element={<ImageUpload />} />
          <Route path="/birthday" element={<BirthdayReveal />} />
          <Route path="/celebration" element={<Celebration />} />
          <Route path="/cake" element={<CakeCutting />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
