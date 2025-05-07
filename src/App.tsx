import { BrowserRouter } from "react-router-dom";
import { StyleProvider } from "@ant-design/cssinjs";
import "./App.css";
import { renderRoutes, routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <StyleProvider layer>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      </QueryClientProvider>
    </StyleProvider>
  );
}

export default App;
