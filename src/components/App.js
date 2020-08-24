import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";

import { mainHeaderHeight } from "../styles/sizes";
import MainHeader from "./main-header/MainHeader";
import Home from "./home/Home";
import NameEntry from "./name-entry/NameEntry";
import RecipientEntry from "./recipient-entry/RecipientEntry";
import SendInvites from "./send-invites/SendInvites";
import VideoCallUI from "./video-call/VideoCallUI";

const AppWrapper = styled.div`
  position: absolute;
  top: ${mainHeaderHeight};
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const location = useLocation();

  const [caller, setCaller] = useState("");
  const [recipient, setRecipient] = useState({ contact: "", type: "sms" });

  return (
    <>
      <MainHeader />
      <AppWrapper>
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
                recipient={recipient}
                handleRecipientEntry={recipient => setRecipient(recipient)}
              />
            </Route>
            <Route path="/sendInvites">
              <SendInvites caller={caller} recipient={recipient} />
            </Route>
            <Route path="/videoCall">
              <VideoCallUI />
            </Route>
          </Switch>
        </AnimatePresence>
      </AppWrapper>
    </>
  );
}

export default App;
