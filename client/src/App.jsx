import React, { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Route>
        <Route
          path="/login"
          element={
            <ProtectRoute user={!user} redirect={"/"}>
              <Login />
            </ProtectRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
