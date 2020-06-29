import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

import MainHeader from "./main-header/MainHeader";
import Home from "./home/Home";
import NameEntry from "./name-entry/NameEntry";
import RecipientEntry from "./recipient-entry/RecipientEntry";

function App() {
  const location = useLocation();

  const [callParameters, setCallParameters] = useState({
    caller: "",
    recipients: []
  });

  return (
    <>
      <MainHeader />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/enterName">
            <NameEntry
              handleNameEntry={name =>
                setCallParameters({ ...callParameters, caller: name })
              }
            />
          </Route>
          <Route path="/enterRecipients">
            <RecipientEntry />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
