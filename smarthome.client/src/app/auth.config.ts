import { AuthConfig } from "angular-oauth2-oidc";

const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  clientId: '937612733311-ne8qa1bdt4vaffij4d096m5rt7nm9bgb.apps.googleusercontent.com',
  redirectUri: window.location.origin,
  responseType: 'token id_token',
  scope: 'openid profile email',
  showDebugInformation: false,
  strictDiscoveryDocumentValidation: false,
  userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
};

export { authConfig };