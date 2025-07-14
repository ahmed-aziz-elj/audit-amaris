import keycloak from './Keycloak.js';

const initKeycloak = async () => {
  if (!keycloak.__initialized) {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      silentCheckSsoRedirectUri: window.location.origin.replace('localhost', 'host.docker.internal') + '/silent-check-sso.html',
      pkceMethod: 'S256',
    });
    keycloak.__initialized = true;
    return authenticated;
  } else {
    console.warn('Keycloak was already initialized — skipping');
    return keycloak.authenticated ?? false;
  }
};


export { keycloak, initKeycloak };
