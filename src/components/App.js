import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";

import MainHeader from "./main-header/MainHeader";
import Home from "./home/Home";
import NameEntry from "./name-entry/NameEntry";
import RecipientEntry from "./recipient-entry/RecipientEntry";
import SendInvites from "./send-invites/SendInvites";
import VideoCall from "./video-call/VideoCall";

function App() {
  const location = useLocation();

  const [caller, setCaller] = useState("");
  const [recipients, setRecipients] = useState([]);

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
              name={caller}
              handleNameEntry={name => setCaller(name)}
            />
          </Route>
          <Route path="/enterRecipients">
            <RecipientEntry
              handleRecipientEntry={recipient =>
                setRecipients([...recipients, recipient])
              }
            />
          </Route>
          <Route path="/sendInvites">
            <SendInvites caller={caller} recipients={recipients} />
          </Route>
          <Route path="/videoCall">
            <VideoCall />
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
