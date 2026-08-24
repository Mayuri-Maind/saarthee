import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
import Interview from "./components/Interview";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />


        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* Interview */}
        <Route
          path="/interview"
          element={<Interview />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;