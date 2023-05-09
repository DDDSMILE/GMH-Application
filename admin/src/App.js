import React, { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dishes from "./pages/dishes/Dishes";
import Suppliers from "./pages/suppliers/Suppliers";

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
            <Route path='suppliers'>
              <Route index element={<Suppliers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
