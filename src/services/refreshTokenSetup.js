// export const refreshTokenSetup = ({ res, handleSetToken }) => {
//   // Timing to renew access token
//   let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

//   const refreshToken = async () => {
//     const newAuthRes = await res.reloadAuthResponse();
//     console.log(newAuthRes);
//     refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//     handleSetToken(newAuthRes);
//     sessionStorage.setItem('token_type', res.tokenObj.token_type)
//     sessionStorage.setItem('access_token', res.tokenObj.access_token)

//     // Setup the other timer after the first one
//     setTimeout(refreshToken, 5000);
//   };

//   // Setup first refresh timer
//   setTimeout(refreshToken, 5000);
// };


export const refreshTokenSetup = ({ res }) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    console.log(newAuthRes);
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    // handleSetToken(newAuthRes);
    // sessionStorage.setItem('token_type', res.tokenObj.token_type)
    // sessionStorage.setItem('access_token', res.tokenObj.id_token)

    sessionStorage.removeItem('token_type');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');

    sessionStorage.setItem('token_type', res.tokenObj.token_type)
    sessionStorage.setItem('access_token', res.tokenObj.access_token)
    sessionStorage.setItem('id_token', res.tokenObj.id_token)

    // Setup the other timer after the first one
    setTimeout(refreshToken, 5000);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, 5000);
};
