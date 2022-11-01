

 const b2cPolicies = {
    names: {
      signUpSignIn: 'B2C_1A_USERNAME_SUSI',
      editProfile: 'B2C_1A_PROFILEEDIT'
    },
    authorities: {
      signUpSignIn: {
        authority: 'https://tpsdevb2c.b2clogin.com/tpsdevb2c.onmicrosoft.com/b2c_1a_username_susi'
      },
      editProfile: {
        authority: 'https://tpsdevb2c.b2clogin.com/tpsdevb2c.onmicrosoft.com/B2C_1A_PROFILEEDIT'
      }
    },
    authorityDomain: 'tpsdevb2c.b2clogin.com'
  };
  
  const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

const msalConfig = {
    auth: {
      clientId: '446e6950-218b-4ed4-8117-bb060ae6e4c3', // mandatory field
      authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
      knownAuthorities: [b2cPolicies.authorityDomain],
      redirectUri: window.location.origin, // Register this URI on Azure portal.
      postLogoutRedirectUri: '/', // page to navigate after logout.
      navigateToLoginRequestUrl: true // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
      cacheLocation: "localStorage", // Configures cache location. "sessionStorage" or "localStorage"
      storeAuthStateInCookie: isIE // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback(logLevel, message) {
          console.log(message);
          window.location.href = "/workspace";
        },
        logLevel: 0,
        piiLoggingEnabled: false
      }
    }
  };
let tpsMsalClient;
tpsAuthService = {};
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

console.log("HELLO WORLD | JS FILE LOADED")

tpsAuthService.init = async() =>{
  const result = new Promise((resolve , reject)=>{
    // Create the main tpsMsalClient instance
  // configuration parameters are located at authConfig.js
  tpsMsalClient = new msal.PublicClientApplication(msalConfig);

  // Redirect: once login is successful and redirects with tokens, call Graph API
  tpsMsalClient.handleRedirectPromise().then((response)=>{
    handleResponse(response);
    console.log("HandleResponse | FINISHED");
    resolve(response);

  }).catch(err => {
      console.error(err);
      reject(err);
  });
    
  });

  console.log("HELLO WORLD | INIT")
return result;
}

tpsAuthService.login=(username,password)=>{
  //signIn("popup");
  signIn("redirect");
  
}

/*
 The following code was copied from this repo:
https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/VanillaJSTestApp2.0/app/default

More info:
https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-browser
https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-browser-samples/VanillaJSTestApp2.0

*/

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest = {
    scopes: [
        'https://tpsdevb2c.onmicrosoft.com/scopes/AccountUserApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/AccountClientMessageApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/PayerPayerListApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/PowerBiEmbedApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityPayerApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityInquiryApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityHistoryApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityUsageReportApi.All',
        'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityActionableInsightApi.All'
      ]
};

// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: "https://dtpssv-apimanager.azure-api.net/Account/User/Users?webUserId=376887",
    graphMailEndpoint: "https://graph.microsoft-ppe.com/v1.0/me/messages"
};

// Add here scopes for access token to be used at MS Graph API endpoints.
const tokenRequest = {
    scopes: [ 'https://tpsdevb2c.onmicrosoft.com/scopes/AccountUserApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/AccountClientMessageApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/PayerPayerListApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/PowerBiEmbedApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityPayerApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityInquiryApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityHistoryApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityUsageReportApi.All',
    'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityActionableInsightApi.All'],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

// const silentRequest = {
//     scopes: ["openid", "profile", 'https://tpsdevb2c.onmicrosoft.com/scopes/AccountUserApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/AccountClientMessageApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/PayerPayerListApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/PowerBiEmbedApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityPayerApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityInquiryApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityHistoryApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityUsageReportApi.All',
//         'https://tpsdevb2c.onmicrosoft.com/scopes/TransEligibilityActionableInsightApi.All']
// };

const logoutRequest = {}
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf("MSIE ");
  const msie11 = ua.indexOf("Trident/");
  const msedge = ua.indexOf("Edge/");
  const isEdge = msedge > 0;

  let signInType;
  let accountId = "";



  function handleResponse(resp) {
    console.log('HandleResponse | START');
      if (resp !== null) {
          accountId = resp.account.homeAccountId;
          console.log(accountId);
          tpsMsalClient.setActiveAccount(resp.account);
          showWelcomeMessage(resp.account);
      } else {
          // need to call getAccount here?
          const currentAccounts = tpsMsalClient.getAllAccounts();
          if (!currentAccounts || currentAccounts.length < 1) {
              return;
          } else if (currentAccounts.length > 1) {
              // Add choose account code here
          } else if (currentAccounts.length === 1) {
              const activeAccount = currentAccounts[0];
              tpsMsalClient.setActiveAccount(activeAccount);
              accountId = activeAccount.homeAccountId;
              showWelcomeMessage(activeAccount);
          }
      }
  }

  function showWelcomeMessage(message){
      console.log('Welcome Message' , message);
  }
  async function signIn(method) {
      signInType = isIE ? "redirect" : method;
      if (signInType === "popup") {
          return tpsMsalClient.loginPopup(loginRequest).then(handleResponse).catch(function (error) {
              console.log(error);
          });
      } else if (signInType === "redirect") {
          return tpsMsalClient.loginRedirect(loginRequest)
      }
  }

  function signOut(interactionType) {
      const logoutRequest = {
          account: tpsMsalClient.getAccountByHomeId(accountId)
      };

      if (interactionType === "popup") {
          tpsMsalClient.logoutPopup(logoutRequest).then(() => {
              window.location.reload();
          });
      } else {
          tpsMsalClient.logoutRedirect(logoutRequest);
      }
  }

  async function getTokenPopup(request, account) {
      return await tpsMsalClient.acquireTokenSilent(request).catch(async (error) => {
          console.log("silent token acquisition fails.");
          if (error instanceof msal.InteractionRequiredAuthError) {
              console.log("acquiring token using popup");
              return tpsMsalClient.acquireTokenPopup(request).catch(error => {
                  console.error(error);
              });
          } else {
              console.error(error);
          }
      });
  }

  // This function can be removed if you do not need to support IE
  async function getTokenRedirect(request, account) {
      return await tpsMsalClient.acquireTokenSilent(request).catch(async (error) => {
          console.log("silent token acquisition fails.");
          if (error instanceof msal.InteractionRequiredAuthError) {
              // fallback to interaction when silent call fails
              console.log("acquiring token using redirect");
              tpsMsalClient.acquireTokenRedirect(request);
          } else {
              console.error(error);
          }
      });
  }
  // Helper function to call MS Graph API endpoint
// using authorization bearer token scheme
function callMSGraph(endpoint, accessToken, callback) {
  console.log('callMSGraph | START ENDPOINT :' , endpoint,"Acces TKEN :", accessToken);
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers: headers
  };

  console.log('request made to Graph API at: ' + new Date().toString());

  fetch(endpoint, options)
      .then(response => response.json())
      .then(response => {
        console.log('callMSGraph | FETCH START');
        callback(response, endpoint)
      })
      .catch(error => console.log(error));
}

function  graphCallback(response, endpoint){
  console.log(response);
  console.log(endpoint);
}

async function seeProfile() {
  const currentAcc = tpsMsalClient.getAccountByHomeId(accountId);
  if (currentAcc) {
      const response = await getTokenPopup(loginRequest, currentAcc).catch(error => {
          console.log(error);
      });
      callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, graphCallback);
      //profileButton.style.display = 'none';
  }
}

async function readMail() {
  const currentAcc = tpsMsalClient.getAccountByHomeId(accountId);
  if (currentAcc) {
      const response = await getTokenPopup(tokenRequest, currentAcc).catch(error => {
          console.log(error);
      });
      callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, graphCallback);
      //mailButton.style.display = 'none';
  }
}

async function seeProfileRedirect() {
  console.log('seeProfileRedirect | START' , accountId );
  const currentAcc = tpsMsalClient.getAccountByHomeId(accountId);
  console.log('seeProfileRedirect | Account : ' , currentAcc);
  if (currentAcc) {
      const response = await getTokenRedirect(loginRequest, currentAcc).catch(error => {
          console.log(error);
      });
      console.log('seeProfileRedirect | getTokenRedirect :' , response);
      //callMSGraph(response.idTokenClaims.iss, response.accessToken, callback);
      //profileButton.style.display = 'none';
      return response;
  }
}

async function readMailRedirect() {
  const currentAcc = tpsMsalClient.getAccountByHomeId(accountId);
  if (currentAcc) {
      const response = await getTokenRedirect(tokenRequest, currentAcc).catch(error => {
          console.log(error);
      });
      callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, graphCallback);
     //mailButton.style.display = 'none';
  }
}


//end MSAL example

getToken=()=> {
  return localStorage.getItem(ACCESS_TOKEN);
}

getRefreshToken=()=> {
  return localStorage.getItem(REFRESH_TOKEN);
}

saveToken=(token)=>  {
  localStorage.setItem(ACCESS_TOKEN, token);
}

saveRefreshToken=(refreshToken)=>  {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

removeToken=()=> {
  localStorage.removeItem(ACCESS_TOKEN);
}

removeRefreshToken=()=> {
  localStorage.removeItem(REFRESH_TOKEN);
}