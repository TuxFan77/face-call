import React from "react";

import PageContainer from "../common/PageContainer";
import RecipientEntryCard from "./RecipientEntryCard";
import RecipientEntryIllustration from "./RecipientEntryIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const RecipientEntry = ({ recipient, handleRecipientEntry }) => {
  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <RecipientEntryCard
        recipient={recipient}
        handleRecipientEntry={handleRecipientEntry}
      />
      <RecipientEntryIllustration />
    </PageContainer>
  );
};

export default RecipientEntry;
