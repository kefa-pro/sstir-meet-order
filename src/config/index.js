const env = process.env.VUE_APP_BASE_URL_TYPE;

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case "dev":
      return {
        baseUrl: "http://172.16.70.122:30000/vedio/",
        homepageUrl: "http://www.sstir.cn"
      };
    // production
    case "prod":
      return {
        baseUrl: "http://vedio-meeting-sstir.apps.datadrivecloud.com/vedio/",
        homepageUrl: "http://www.sstir.cn"
      };
    case "qa":
      return {
        baseUrl: "http://vedio-meeting-sstir-pre.apps.datadrivecloud.com/vedio/",
        homepageUrl: "http://web-ui-sstir-pre.apps.datadrivecloud.com/"
      };
    // default: dev
    default:
      return {
        baseUrl: "http://vedio-meeting-sstir.apps.datadrivecloud.com/vedio/",
        homepageUrl: "http://www.sstir.cn"
      };
  }
};

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl,
  homepageUrl: getBaseUrl(env).homepageUrl
};

export default appConfig;
