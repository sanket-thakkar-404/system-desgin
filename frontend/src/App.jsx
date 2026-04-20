import { RouterProvider } from "react-router";
import router from "./AppRoutes";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
