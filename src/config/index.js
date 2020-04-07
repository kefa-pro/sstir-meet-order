const env = process.env.VUE_APP_BASE_URL_TYPE;

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case "dev":
      return {
        baseUrl: "http://192.168.2.3:30000/vedio/"
      };
    // production
    case "prod":
      return {
        baseUrl: "http://192.168.2.3:30000/vedio/"
      };
    case "qa":
      return {
        baseUrl: "http://192.168.2.3:30000/vedio/"
      };
    // default: dev
    default:
      return {
        baseUrl: "http://192.168.2.3:30000/vedio/"
      };
  }
};

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl
};

export default appConfig;
