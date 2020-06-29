import React from "react";
import styled from "styled-components";

import { ReactComponent as BusinessChatIllustration } from "../../images/business_chat.svg";
import IllustrationWrapperBase from "../../styles/global/IllustrationWrapper";

const IllustrationWrapper = styled(IllustrationWrapperBase)`
  margin-left: 8rem;
`;

const NameEntryIllustration = () => {
  return (
    <IllustrationWrapper>
      <BusinessChatIllustration />
    </IllustrationWrapper>
  );
};

export default NameEntryIllustration;
