import React from "react";

import PageContainer from "../../styles/global/PageContainer";
import EntryCard from "./EntryCard";
import NameEntryIllustration from "./NameEntryIllustration";

const NameEntry = () => {
  return (
    <PageContainer>
      <EntryCard />
      <NameEntryIllustration />
    </PageContainer>
  );
};

export default NameEntry;
