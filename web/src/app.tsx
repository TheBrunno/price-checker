import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Laptops } from "./pages/laptops";
import { Account } from "./pages/account";

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Laptops />} index />
          <Route element={<Account />} path="/account" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}