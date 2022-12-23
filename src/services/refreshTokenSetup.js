export const refreshTokenSetup = ({ res, handleSetToken }) => {
  // Timing to renew access token
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    handleSetToken(newAuthRes);

    // Setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
};