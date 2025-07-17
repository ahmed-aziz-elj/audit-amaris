import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://13.62.55.138:8080/',
  realm: 'auditApp',
  clientId: 'audit-app',
});

export default keycloak;
// Keycloak
