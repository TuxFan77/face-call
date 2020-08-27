import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import PageContainer from "../common/PageContainer";
import SendInvitesCard from "./SendInvitesCard";
import SendInvitesIllustration from "./SendInvitesIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const SendInvites = ({ caller, recipient, handleRoom }) => {
  useEffect(() => handleRoom(uuidv4()), [handleRoom]);

  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SendInvitesCard caller={caller} recipient={recipient} />
      <SendInvitesIllustration />
    </PageContainer>
  );
};

export default SendInvites;
