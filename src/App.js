import React, { useEffect, useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = (props) => {
  const [token, setToken] = useState();

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    getToken();
  };

  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    setToken(userToken);
  };

  useEffect(() => {
    const sessionTimeout = setInterval(() => getToken(), 5000);
    return () => {
      clearInterval(sessionTimeout);
    };
  }, []);

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          {token === "" || token === undefined || token === null ? (
            <>
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                path="/"
                name="Login Page"
                render={(props) => <Login {...props} setToken={saveToken} />}
              />
            </>
          ) : (
            <>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} setToken={saveToken} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={(props) => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={(props) => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={(props) => <Page500 {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={(props) => <TheLayout {...props} />}
              />
            </>
          )}
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
};

export default App;
