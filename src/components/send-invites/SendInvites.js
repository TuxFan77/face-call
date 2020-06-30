import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import SendInvitesCard from "./SendInvitesCard";
import SendInvitesIllustration from "./SendInvitesIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const SendInvites = ({ caller, recipients }) => {
  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <SendInvitesCard caller={caller} recipients={recipients} />
      <SendInvitesIllustration />
    </PageContainer>
  );
};

export default SendInvites;
