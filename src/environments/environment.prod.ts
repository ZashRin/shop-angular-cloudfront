import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    products: 'https://dvzqnx6nl3.execute-api.us-east-1.amazonaws.com/dev/',
    order: 'https://dvzqnx6nl3.execute-api.us-east-1.amazonaws.com/dev/',
    import: 'https://dvzqnx6nl3.execute-api.us-east-1.amazonaws.com/dev/',
    bff: 'https://dvzqnx6nl3.execute-api.us-east-1.amazonaws.com/dev/',
    cart: 'https://dvzqnx6nl3.execute-api.us-east-1.amazonaws.com/dev/',
  },
  apiEndpointsEnabled: {
    products: true,
    order: false,
    import: false,
    bff: true,
    cart: false,
  },
};
