import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute user={user}>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/chat/:chatId"
          element={
            <ProtectRoute user={user}>
              <Chat />
            </ProtectRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectRoute user={user}>
              <Groups />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
