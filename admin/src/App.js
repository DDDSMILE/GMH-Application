import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dishes from "./pages/dishes/Dishes";
import Suppliers from "./pages/suppliers/Suppliers";
import Shippers from "./pages/shippers/Shippers";
import Profile from "./components/Profile/Profile";
import Create from "./components/Create/Create";
import { userInputs } from "./utils/forminputs";
import "react-toastify/dist/ReactToastify.css";
import "./app.scss";
import Updated from "./components/Updated/Updated";

function App() {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dishes />} />
          <Route path="dishes">
            <Route index element={<Dishes />} />
          </Route>
          <Route path="suppliers">
            <Route index element={<Suppliers />} />
          </Route>
          <Route path="shippers">
            <Route index element={<Shippers />} />
            <Route path=":shipperId" element={<Profile />} />
            <Route path=":shipperId/updated" element={<Updated />} />
            <Route
              path="create"
              element={<Create inputs={userInputs} />}
              title="Thêm nhân viên"
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
