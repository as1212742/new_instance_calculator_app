/** @format */

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

//transform of os data in representational format
const Transform_OS_Data = (os, type) => {
  const opsys = {
    Windows: "Windows Server",
    "Red Hat Enterprise Linux with HA": "Red Hat Enterprise Linux with HA",
    Linux: "Linux",
    RHEL: "Red Hat Enterprise Linux",
    SUSE: "SUSE Linux Enterprise Server",
    NA: "",
  };

  const ostype = {
    "SQL Std": "with SQL Server Standard",
    "SQL Web": "with SQL Server Web",
    "SQL Ent": "with SQL Server Enterprise",
    NA: "",
  };

  if (opsys[os] === "" && ostype[type] === "") return "";

  if (opsys[os] !== "" && ostype[type] === "") return opsys[os];

  if (opsys[os] === "" && ostype[type] !== "") return ostype[type];

  return opsys[os] + " " + ostype[type];
};

function delete_cookie(cname) {
  document.cookie = cname + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export { setCookie, getCookie, Transform_OS_Data, delete_cookie };
