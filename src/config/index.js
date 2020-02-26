const env = process.env.VUE_APP_BASE_URL_TYPE;

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case "dev":
      return {
        baseUrl: "http://101.132.40.63:8081/"
      };
    // production
    case "prod":
      return {
        baseUrl: "http://101.132.40.63:8081/"
      };
    case "qa":
      return {
        baseUrl: "http://10.11.0.70:6999"
      };
    // default: dev
    default:
      return {
        baseUrl: "http://101.132.40.63:8081/"
      };
  }
};

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl
};

export default appConfig;
