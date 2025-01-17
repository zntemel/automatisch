import defineApp from '../../helpers/define-app';
import addAuthHeader from './common/add-auth-header';

export default defineApp({
  name: 'Github',
  key: 'github',
  baseUrl: 'https://github.com',
  apiBaseUrl: 'https://api.github.com',
  iconUrl: '{BASE_URL}/apps/github/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/connections/github',
  primaryColor: '000000',
  supportsConnections: true,
  beforeRequest: [addAuthHeader],
});
