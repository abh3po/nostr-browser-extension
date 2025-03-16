import Container from "@components/Container";
import Navbar from "@components/Navbar";
import Accounts from "@screens/Accounts";
import AccountDetail from "@screens/Accounts/Detail";
import Keysend from "@screens/Keysend";
import TestConnection from "@screens/Options/TestConnection";
import Publishers from "@screens/Publishers";
import PublisherDetail from "@screens/Publishers/Detail";
import Unlock from "@screens/Unlock";
import { useTranslation } from "react-i18next";
import { HashRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import AccountDetailLayout from "~/app/components/AccountDetailLayout";
import ScrollToTop from "~/app/components/ScrollToTop";
import Toaster from "~/app/components/Toast/Toaster";
import Providers from "~/app/context/Providers";
import RequireAuth from "~/app/router/RequireAuth";
import { getConnectorRoutes, renderRoutes } from "~/app/router/connectorRoutes";
import BackupMnemonic from "~/app/screens/Accounts/BackupMnemonic";
import GenerateMnemonic from "~/app/screens/Accounts/GenerateMnemonic";
import NewMnemonic from "~/app/screens/Accounts/GenerateMnemonic/new";
import ImportMnemonic from "~/app/screens/Accounts/ImportMnemonic";
import NostrSettings from "~/app/screens/Accounts/NostrSettings";

import ChooseConnectorPath from "~/app/screens/connectors/ChooseConnectorPath";

function Options() {
  const connectorRoutes = getConnectorRoutes();

  return (
    <Providers>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="nostr/new" replace />} />
            <Route path="nostr/new" element={<NostrSettings />} />
            <Route path="publishers">
              <Route path=":id" element={<PublisherDetail />} />
              <Route index element={<Publishers />} />
            </Route>
            <Route path="keysend" element={<Keysend />} />
            <Route path="accounts">
              <Route index element={<Accounts />} />
              <Route path=":id" element={<AccountDetailLayout />}>
                <Route path="nostr/settings" element={<NostrSettings />} />
                <Route index element={<AccountDetail />} />
                <Route path="secret-key/backup" element={<BackupMnemonic />} />
                <Route
                  path="secret-key/generate"
                  element={<GenerateMnemonic />}
                />
                <Route path="secret-key/new" element={<NewMnemonic />} />
                <Route path="secret-key/import" element={<ImportMnemonic />} />
              </Route>

              <Route
                path="new"
                element={
                  <div className="flex flex-1 justify-center items-center">
                    <Container maxWidth="xl">
                      <Outlet />
                    </Container>
                  </div>
                }
              >
                <Route index={true} element={<ChooseConnectorPath />}></Route>
                <Route index element={<ChooseConnectorPath />} />

                <Route path="choose-connector">
                  {renderRoutes(connectorRoutes)}
                </Route>
              </Route>
            </Route>
            <Route
              path="test-connection"
              element={
                <Container>
                  <TestConnection />
                </Container>
              }
            />
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
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar>
        {/* <Navbar.Link href="">{tCommon("wallet")}</Navbar.Link> */}
        {/* <Navbar.Link href="/publishers">
          {tCommon("connected_sites")}
        </Navbar.Link>
        <Navbar.Link href="https://getalby.com/discover" target="_blank">
          {tCommon("discover")}
          <PopiconsArrowUpLine className="h-5 w-5 rotate-45" />
        </Navbar.Link> */}
      </Navbar>
      <Toaster />
      <Outlet />
    </div>
  );
};

export default Options;
