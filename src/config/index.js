const env = process.env.VUE_APP_BASE_URL_TYPE;

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case "dev":
      return {
        baseUrl: "http://172.16.70.122:30000/vedio/",
        homepageUrl: "http://10.10.11.165:8222/cas/logout?backUrl=http://localhost:8080"
      };
    // production
    case "prod":
      return {
        baseUrl: "http://vedio-meeting-sstir.apps.datadrivecloud.com/vedio/",
        homepageUrl: "http://cas.sstir.cn/cas/logout?backUrl=http://vedio.sstir.cn"
      };
    case "qa":
      return {
        baseUrl: "http://vedio-meeting-sstir-pre.apps.datadrivecloud.com/vedio/",
        homepageUrl: "http://10.10.11.165:8222/cas/logout?backUrl=http://vedio1-sstir-pre.apps.datadrivecloud.com/#/"
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
