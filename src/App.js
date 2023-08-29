import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SocketContext from "./context/SocketContext";
import Home from "./pages/Home";

// Socket io
const socket = io(process.env.REACT_APP_SERVER_ENDPOINT);

const App = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={token ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={token ? <Navigate to="/" /> : <Register />}
            />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
};

export default App;
