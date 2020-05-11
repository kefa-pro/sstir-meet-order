const env = process.env.VUE_APP_BASE_URL_TYPE;

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case "dev":
      return {
        baseUrl: "http://172.16.70.122:30000/vedio/",
        homepageUrl: "http://10.10.11.165:8222/cas/login?service=http://localhost:8080",
        domain: '.apps.datadrivecloud.com'
      };
    // production
    case "prod":
      return {
        baseUrl: "http://apigate.sstir.cn/vedio/",
        homepageUrl: "http://cas.sstir.cn/cas/login?service=http://meet3.cloud.sstir.cn",
        domain: '.sstir.cn'
      };
    case "qa":
      return {
        baseUrl: "http://vedio-meeting-sstir-pre.apps.datadrivecloud.com/vedio/",
        homepageUrl: "http://cas.sstir.cn/cas/login?service=http://gateway-sstir-pre.apps.datadrivecloud.com/basic/cas/login/meeting",
        domain: '.apps.datadrivecloud.com'
      };
    // default: dev
    default:
      return {
        baseUrl: "http://apigate.sstir.cn/vedio/",
        homepageUrl: "http://cas.sstir.cn/cas/login?service=http://meet3.cloud.sstir.cn",
        domain: '.apps.datadrivecloud.com'
      };
  }
};

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl,
  homepageUrl: getBaseUrl(env).homepageUrl,
  domain: getBaseUrl(env).domain
};

export default appConfig;
