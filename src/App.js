import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home />}
            // element={access_token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            element={<Login />}
            path="/login"
            // element={access_token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={<Register />}
            // element={access_token ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
