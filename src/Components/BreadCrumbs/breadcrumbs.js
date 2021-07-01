/** @format */

import React from "react";
import Typography from "@material-ui/core/Typography";
import { Breadcrumbs as MUIBreadcrumbs } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;

  const pathnames = pathname.split("/").filter((x) => x);

  const logic = () => {
    return pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
      const islast = index === pathnames.length - 1;
      return islast ? (
        <Typography key={name}>{name}</Typography>
      ) : (
        <Link key={name} onClick={() => history.push(routeTo)}>
          {name}
        </Link>
      );
    });
  };

  return (
    <>
      <MUIBreadcrumbs
        separator={<NavigateNextIcon fontSize="default" />}
        aria-label="breadcrumb"
      >
        {pathnames.length > 0 ? (
          <Link onClick={() => history.push("/")}>Home</Link>
        ) : (
          <Typography>Home</Typography>
        )}
        {logic()}
      </MUIBreadcrumbs>
      {props.children}
    </>
  );
};

export default withRouter(Breadcrumbs);
