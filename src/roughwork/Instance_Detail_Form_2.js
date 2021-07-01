/** @format */

// /** @format */

// import FormSection from "aws-northstar/components/FormSection";
// import Container from "aws-northstar/layouts/Container";
// import React, { useContext, useEffect, useState } from "react";
// import Form from "aws-northstar/components/Form";
// import Button from "aws-northstar/components/Button";
// import Select from "aws-northstar/components/Select";
// import BreadCrumbs from "../../breadcrumbs/BreadCrumbs";
// import { DataContext } from "../../../context/provider/Provider";
// import lodash from "lodash";
// import { useHistory } from "react-router-dom";
// import axios from "axios";

// const Instance_Detail_Form_2 = () => {
//   const [isProcessorSelected, setisProcessorSelected] = useState(false);
//   const [isStorageSelected, setisStorageSelected] = useState(false);
//   const [isNetworkSelected, setisNetworkSelected] = useState(false);

//   const [ProcessorTypes, setProcessorTypes] = useState([]);
//   const [ProcessorSelectedOption, ProcessorSetSeletedOption] = useState();
//   const [EBSStorageTypes, setEBSStorageTypes] = useState([]);
//   const [EBSSelectedOption, EBSSetSeletedOption] = useState();
//   const [OSTypes, setOSTypes] = useState([]);
//   const [OSSelectedOption, setOSSelectedOption] = useState();
//   const [NetworkTypes, setNetworkTypes] = useState([]);
//   const [NetworkSelectedOption, NetworkSetSeletedOption] = useState();
//   const [loadingEBS, setloadingEBS] = useState("notloading");
//   const [NextStatus, setNextStatus] = useState();
//   const [statusType, setStatusType] = useState(null);
//   const history = useHistory();

//   console.log(EBSStorageTypes);
//   const onNext = (e) => {
//     e.preventDefault();
//     history.push("/Pods/Config/Recommendation");
//   };

//   const onCancel = () => {
//     history.push("/");
//   };

//   return (
//     <BreadCrumbs>
//       <Form
//         onSubmit={(e) => onNext(e)}
//         actions={
//           <div>
//             <Button variant="link" onClick={onCancel}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={NextStatus} variant="primary">
//               Next
//             </Button>
//           </div>
//         }
//       >
//         <FormSection header="EKS Details">
//           <Container headingVariant="h4" title="Select Processor Type">
//             <Select
//               placeholder="Choose an option"
//               options={ProcessorTypes}
//               selectedOption={ProcessorSelectedOption}
//               onChange={onChangeProcessor}
//               // disabled={ShiftTopic !== 0}
//               // statusType={loadingEBS}
//               // loadingText="Loading options"
//             />
//           </Container>
//           <Container headingVariant="h4" title="Select Storage Type">
//             <Select
//               placeholder="Choose an option"
//               options={EBSStorageTypes}
//               selectedOption={EBSSelectedOption}
//               onChange={onChangeEBS}
//               // disabled={true}
//               // statusType={loadingEBS}
//               // loadingText="Loading options"
//             />
//           </Container>
//           <Container headingVariant="h4" title="Select Operating System Type">
//             <Select
//               placeholder="Choose an option"
//               options={OSTypes}
//               selectedOption={OSSelectedOption}
//               onChange={onChangeOS}
//               // disabled={true}
//               // statusType={loadingEBS}
//               // loadingText="Loading options"
//             />
//           </Container>
//           <Container headingVariant="h4" title="Select Network Performance">
//             <Select
//               placeholder="Choose an option"
//               options={NetworkTypes}
//               // selectedOption={NetworkSelectedOption}
//               // onChange={onChangeNetwork}
//               // // disabled={ShiftTopic !== 2}
//               // statusType={statusType}
//               // onFocus={onFocusNetwork}
//             />
//           </Container>
//         </FormSection>
//       </Form>
//     </BreadCrumbs>
//   );
// };

// export default Instance_Detail_Form_2;
