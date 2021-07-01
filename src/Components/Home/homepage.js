/** @format */

import AppLayout from "aws-northstar/layouts/AppLayout";
import header from "./Sub-Components/header";
import helpPanel from "./Sub-Components/helppanel";

const App = (props) => {
  return (
    <AppLayout header={header} helpPanel={helpPanel}>
      {props.children}
    </AppLayout>
  );
};

export default App;
