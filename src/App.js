import React from "react";
import Login from "./Containers/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./Containers/PageNotFound";
import Home from "./Containers/Home";
import { ToastContainer } from "react-toastify";
import Dashboard from "./Containers/Dashboard";
import Configurations from "./Containers/Configurations";
import PrivateRoute from "./Services/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="configurations" element={<Configurations />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
