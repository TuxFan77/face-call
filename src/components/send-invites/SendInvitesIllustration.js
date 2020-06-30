import React from "react";
import styled from "styled-components";

import { ReactComponent as ConnectionIllustration } from "../../images/connection.svg";
import IllustrationWrapperBase from "../../styles/global/IllustrationWrapper";

const IllustrationWrapper = styled(IllustrationWrapperBase)`
  margin-left: 8rem;
`;

const SendInvitesIllustration = () => {
  return (
    <IllustrationWrapper>
      <ConnectionIllustration />
    </IllustrationWrapper>
  );
};

export default SendInvitesIllustration;
