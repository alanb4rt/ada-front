import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
