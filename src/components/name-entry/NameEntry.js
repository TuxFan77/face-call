import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import EntryCard from "./EntryCard";
import NameEntryIllustration from "./NameEntryIllustration";
import { pageVariants, pageTransition } from "../../animation/pageTransition";

const NameEntry = () => {
  return (
    <PageContainer
      initial="in"
      animate="normal"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <EntryCard />
      <NameEntryIllustration />
    </PageContainer>
  );
};

export default NameEntry;
