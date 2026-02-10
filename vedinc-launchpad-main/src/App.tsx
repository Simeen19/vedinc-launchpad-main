import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PreviewListPage from "./link-preview/PreviewListPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import IndustryHub from "./pages/IndustryHub";
import Admin from "./pages/Admin";
import AdminCourses from "./pages/AdminCourses";
import AdminGuard from "./components/admin/AdminGuard";
const queryClient = new QueryClient();
import AdminAdmins from "./pages/AdminAdmins";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/website-previews" element={<PreviewListPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminGuard><Admin /></AdminGuard>} />
          <Route path="/admin/courses" element={<AdminGuard><AdminCourses /></AdminGuard>} />

          <Route path="/industry-hub" element={<IndustryHub />} />
          <Route path="/admin/admins" element={<AdminGuard><AdminAdmins /></AdminGuard>} />


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
