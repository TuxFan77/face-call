import React from "react";
import styled from "styled-components";

import { ReactComponent as GroupVideoIllustration } from "../../images/group_video.svg";
import IllustrationWrapperBase from "../../styles/global/IllustrationWrapper";

const IllustrationWrapper = styled(IllustrationWrapperBase)`
  margin-left: 8rem;
`;

const NameEntryIllustration = () => {
  return (
    <IllustrationWrapper>
      <GroupVideoIllustration />
    </IllustrationWrapper>
  );
};

export default NameEntryIllustration;
