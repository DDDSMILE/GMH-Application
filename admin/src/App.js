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
import "./app.scss";

function App() {
  const { darkMode } = useContext(AppContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="dishes">
              <Route index element={<Dishes />} />
            </Route>
            <Route path="suppliers">
              <Route index element={<Suppliers />} />
            </Route>
            <Route path="shippers">
              <Route index element={<Shippers />} />
              <Route path=":shipperId" element={<Profile />} />
              <Route
                path="create"
                element={<Create inputs={userInputs} />}
                title="Thêm nhân viên"
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
