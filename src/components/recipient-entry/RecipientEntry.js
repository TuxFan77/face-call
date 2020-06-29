import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import RecipientEntryCard from "./RecipientEntryCard";
import RecipientEntryIllustration from "./RecipientEntryIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const RecipientEntry = () => {
  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <RecipientEntryCard />
      <RecipientEntryIllustration />
    </PageContainer>
  );
};

export default RecipientEntry;
