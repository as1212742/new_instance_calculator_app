/** @format */

import Stack from "aws-northstar/layouts/Stack";
import Box from "aws-northstar/layouts/Box";

const MainContent = (props) => {
  return (
    <Box bgcolor="grey.300" width="100%" height="1000px">
      <Stack>{props.children}</Stack>
    </Box>
  );
};

export default MainContent;
