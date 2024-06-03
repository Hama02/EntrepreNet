/* eslint-disable react/prop-types */
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Landing from "./Landing";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import EditProfile from "./Pages/EditProfile/EditProfile";
import { AuthContext } from "./Context/authContext";
import { useContext } from "react";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { currentUser, isTokenExpired } = useContext(AuthContext);
    let location = useLocation();
    if (Object.keys(currentUser).length === 0) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (isTokenExpired()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile/:id?",
      element: (
        <ProtectedRoute>
          <Profile />,
        </ProtectedRoute>
      ),
    },
    {
      path: "/profile/edit",
      element: (
        <ProtectedRoute>
          <EditProfile />,
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <>404 Not Found</>,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
