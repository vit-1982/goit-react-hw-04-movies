import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../../views/HomePage/HomePage";
import routes from "../../routes";

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<h2>...Loading</h2>}>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
          <Route component={HomePage} />
        </Switch>
      </Suspense>
    </Layout>
  );
}
