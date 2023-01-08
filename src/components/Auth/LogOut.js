import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const LogOut = ({ handleSetUser, handleSetAdmin, handleSetAuth}) => {
  const clientId = "455738767873-gvb4qamkrjv3bqf91odopf7ft0c0tcvp.apps.googleusercontent.com";
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const onSuccess = () => {
    console.log("[LogOut done]");
    handleSetUser(null);
    handleSetAdmin(false);
    handleSetAuth(null);
  };

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText="LogOut"
      onLogoutSuccess={onSuccess}
      style={{
        // marginTop: "100px",
        width: "100%"
      }}
    />
  );
};

export default LogOut;
