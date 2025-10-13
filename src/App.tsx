
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryProvider } from "./providers/QueryProvider";
import DataSourceSwitcher from "./components/DataSourceSwitcher";
import DataSourceDebug from "./components/DataSourceDebug";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BookingPage from "./pages/BookingPage";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const App = () => (
  <QueryProvider>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/book/:providerId" element={<BookingPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/services" element={<Services />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <DataSourceSwitcher />
        <DataSourceDebug />
      </AuthProvider>
    </TooltipProvider>
  </QueryProvider>
);

export default App;
