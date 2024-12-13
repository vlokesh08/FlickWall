import ENV from '../env';

export const config = {
  api: {
    baseUrl: ENV.API_URL,
    version: ENV.API_VERSION,
  },
  features: {
    analytics: ENV.ENABLE_ANALYTICS,
    pushNotifications: ENV.ENABLE_PUSH_NOTIFICATIONS,
  },
  cache: {
    ttl: ENV.CACHE_TTL,
  },
};

export const getApiUrl = (endpoint: string): string => {
  return `${config.api.baseUrl}/${endpoint}`;
}; 