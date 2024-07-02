import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute.jsx";
import { LayoutLoader } from "./components/layout/Loaders.jsx";
import { server } from "./constants/config.js";
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Groups = lazy(() => import("./pages/Groups.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement.jsx"));
const ChatsManagement = lazy(() => import("./pages/admin/ChatManagement.jsx"));
const MessageManagement = lazy(() =>
  import("./pages/admin/MessageManagement.jsx")
);

const App = () => {
  useEffect(() => {
    console.log(server);
  }, []);
  const user = true;
  return (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
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
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatsManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
