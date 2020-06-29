import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

import MainHeader from "./main-header/MainHeader";
import Home from "./home/Home";
import NameEntry from "./name-entry/NameEntry";

function App() {
  const location = useLocation();

  return (
    <>
      <MainHeader />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/enter-name">
            <NameEntry />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
