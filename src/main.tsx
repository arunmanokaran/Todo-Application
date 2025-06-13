import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./Components/UserPage.tsx";
import AdminPage from "./Components/AdminPage.tsx";
import SignUp from "./Components/SignUp.tsx";
import { AuthProvider } from "./Utilis/AuthProvider.ts";
import ProtectedRoute from "./Utilis/ProtectedRoute.tsx";
import Login from "./Components/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <ProtectedRoute />, // <-- Protect these routes
    children: [
      {
        path: "/userpage/:userId",
        element: <UserPage />,
      },
      {
        path: "/adminpage",
        element: <AdminPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
