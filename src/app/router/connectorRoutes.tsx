import { Route } from "react-router-dom";
import { EmptyConnector } from "~/app/screens/connectors/EmptyConnector";

export const normalizeKey = (key: string) =>
  key as unknown as TemplateStringsArray;

interface ChildRoute {
  index?: boolean;
  path?: string;
  element: JSX.Element;
}

interface ConnectorElementChildRoute extends ChildRoute {
  title: string;
  path: string;
  description?: string;
  logo: string;
}

interface Route {
  path: string;
  element: JSX.Element;
  title: string;
  description?: string;
  logo: string;
}

interface ConnectorRoute extends Route {
  children?: (ChildRoute | ConnectorElementChildRoute)[];
}

const connectorMap: { [key: string]: ConnectorRoute } = {
  empty: {
    path: "empty",
    element: <EmptyConnector />,
    title: "Nostr ",
    logo: "https://uploads-ssl.webflow.com/63c03639465a40c317d8a341/63e4386c03459d099f4b1221_Nostrgram_Logo.png",
  },
};

function getConnectorRoutes(): ConnectorRoute[] {
  return [connectorMap["empty"]];
}

function renderRoutes(routes: (ChildRoute | ConnectorRoute)[]) {
  return routes.map((route: ChildRoute | ConnectorRoute, index: number) => {
    if ("children" in route && route.children) {
      if ("element" in route && route.element) {
        return (
          <Route key={`${route.path}-${index}`} path={route.path}>
            <Route index element={route.element} />
            {renderRoutes(route.children)}
          </Route>
        );
      } else {
        let indexRoute;
        const indexRouteIndex = route.children.findIndex(
          (childRoute) => childRoute.index === true
        );

        if (indexRouteIndex !== -1) {
          indexRoute = route.children.splice(indexRouteIndex, 1)[0];
          return (
            <Route key={`${route.path}-${index}`} path={route.path}>
              <Route index element={indexRoute.element} />
              {renderRoutes(route.children)}
            </Route>
          );
        }
      }
    } else {
      return (
        <Route
          key={`${route.path}-${index}`}
          path={route.path}
          element={route.element}
        />
      );
    }
  });
}

export { ConnectorRoute, getConnectorRoutes, renderRoutes };
