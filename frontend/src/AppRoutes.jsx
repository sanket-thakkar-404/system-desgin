import { createBrowserRouter } from "react-router";
import DashboardLayout from "./Layout/DashboardLayout";
import ClientPage from "./pages/ClientPage";
import ServicesPage from "./pages/ServicesPage";
import ErrorPage from "./pages/ErrorPage";
import CreateClients from "./components/ClientForm";
import AddService from "./components/AddService";
import AssignService from "./components/AssignService";
import TeamPage from "./pages/TeamPage";
import TeamForm from "./components/TeamForm";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "/client",
            element: <ClientPage />,
          },
          {
            path: "/client/create",
            element: <CreateClients />,
          },
          {
            path: "/service",
            element: <ServicesPage />,
          },
          {
            path: "/service/create",
            element: <AddService />,
          },
          {
            path: "/service/assign",
            element: <AssignService />,
          },
          {
            path: "/team",
            element: <TeamPage />,
          },
          {
            path: "/team/create",
            element: <TeamForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
