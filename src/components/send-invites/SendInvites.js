import React from "react";

import PageContainer from "../common/PageContainer";
import SendInvitesCard from "./SendInvitesCard";
import SendInvitesIllustration from "./SendInvitesIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const SendInvites = ({ caller, recipient }) => {
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
