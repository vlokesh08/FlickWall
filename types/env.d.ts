declare module '../env' {
  interface Env {
    API_URL: string;
    API_VERSION: string;
    ENABLE_ANALYTICS: boolean;
    ENABLE_PUSH_NOTIFICATIONS: boolean;
    CACHE_TTL: number;
  }
  const env: Env;
  export default env;
} 