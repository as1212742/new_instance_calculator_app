/** @format */

import LoadingIndicator from "aws-northstar/components/LoadingIndicator";
import Container from "aws-northstar/layouts/Container";
import React from "react";

const Loading = () => {
  return (
    <Container headingVariant="h4" title="Loading...">
      <LoadingIndicator size="large" />
    </Container>
  );
};

export default Loading;
