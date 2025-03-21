import Navbar from "@components/Navbar";
import ConfirmPayment from "@screens/ConfirmPayment";
import Home from "@screens/Home";
import Keysend from "@screens/Keysend";
import Unlock from "@screens/Unlock";
import { HashRouter, Outlet, Route, Routes } from "react-router-dom";
import Toaster from "~/app/components/Toast/Toaster";
import Providers from "~/app/context/Providers";
import RequireAuth from "../RequireAuth";

function Popup() {
  return (
    <Providers>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="keysend" element={<Keysend />} />
            <Route path="confirmPayment" element={<ConfirmPayment />} />
          </Route>
          <Route
            path="unlock"
            element={
              <>
                <Unlock />
                <Toaster />
              </>
            }
          />
        </Routes>
      </HashRouter>
    </Providers>
  );
}

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />

      <main className="flex flex-col grow">
        <Outlet />
        <Toaster />
      </main>
    </div>
  );
};

export default Popup;
