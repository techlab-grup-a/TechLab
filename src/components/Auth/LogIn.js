import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { refreshTokenSetup } from "../../services/refreshTokenSetup";
import { Button } from "react-bootstrap";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const API_URL = 'http://localhost:5000';

const LogIn = ({ handleSetUser, handleSetToken }) => {
  const clientId = "455738767873-gvb4qamkrjv3bqf91odopf7ft0c0tcvp.apps.googleusercontent.com";
  // const navigate = useNavigate();

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, []);

  const onSuccess = (res) => {
    console.log("[Login OK]");
    console.log(res.profileObj);

    var postData = {
      id_usr: res.profileObj.googleId,
      email: res.profileObj.email,
      nom: res.profileObj.givenName,
      cognom: res.profileObj.familyName
    };
  
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;"
      }
    };

    axios.post(API_URL + '/usr/', postData, axiosConfig)
      .then((res2) => {
        console.log('RESPONSE RECEIVED: ', res2);
        handleSetUser(res.profileObj);
        // handleSetToken(res.tokenObj);
        sessionStorage.setItem('token_type', res.tokenObj.token_type)
        sessionStorage.setItem('access_token', res.tokenObj.access_token)
        sessionStorage.setItem('id_token', res.tokenObj.id_token)
        refreshTokenSetup({ res, handleSetToken });
      })
      .catch((err) => {
        console.log('AXIOS ERROR: ', err);
      });

    
    
    // handleSetUser(res.profileObj);
    // handleSetToken(res.tokenObj);
    // refreshTokenSetup({ res, handleSetToken });
  };

  const onFailure = (res) => {
    console.log("[Login ERROR]:", res);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      style={{
        marginTop: "100px",
      }}
      isSignedIn={true}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          variant="primary"
          className="rounded-pill w-100"
        >
          Accedir
        </Button>
      )}
    />
  );
};

export default LogIn;