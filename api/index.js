// const API_BASE_URL = 'http://192.168.1.8:8080'; //本地
// const API_BASE_URL = 'http://192.168.1.12'; //本地192.168.1.8   
// 微信配置信息
// APPID:wxbd8f954f4e194af7
// APPSECRT:a209b937bce7191a828df5aac8584920
// APPKEY:gzytbz81172988811729888117298855
// MATCHID:1322053801
const API_BASE_URL = "http://teademo.gz-jiayou.com/" //线上-测试
const APIROOT = '/api/';
const APPID = 'wxbd8f954f4e194af7' // 线上-测试wxbd8f954f4e194af7 甲由线上wx64c5746a790dfa7a
// const APPID = 'wx490d129db878b83d' //  茶叶测试wx8209eeb441349479 甲由测试wx490d129db878b83d 

// const WECHATSECRET = ''
// const WECHATSECRET = 'ebf8c0527958b6346ce024a9de4255ce'// 测试
const REDIRECT_URI = "http://teaweb.gz-jiayou.com" // 线上-测试
// const REDIRECT_URI = "http://192.168.1.8:8080/index.html"
// const TOKEN_KEY = '53387e2e7c06e1b871b03002afcdb0b0'
const TOKEN_KEY = sessionStorage.getItem("TOKEN")

const HISTORY_KEY = 'History-Key'

console.log("TOKEN_KEY", TOKEN_KEY);
// sessionStorage.clear()
// 配置axios
const axiosConfig = {
    baseURL: API_BASE_URL + APIROOT,
    timeout: 3000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "*",
        // "Access-Control-Allow-Headers": "Content-Type,Access-Token",
        // "Access-Control-Expose-Headers": "*",
        'token': TOKEN_KEY
    },
    // paramsSerializer: function (params) {
    //     return JSON.stringify(params, {
    //         arrayFormat: 'brackets'
    //     })
    // },

    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream

}

// 创建实例对象
const instance = axios.create(axiosConfig);


// 访问后端转换
function request(val) {
    // const requestVal = interceptor(instance, val)
    // console.log("requestVal", requestVal);
    // console.log("发送请求", val);
    return instance(val);
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("发送请求", config);
    return config;
}, function (error) {
    // 对请求错误做些什么
    // console.log("对请求错误做些什么");
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log("对响应数据做点什么");
    if (response.status == 200) {
        return response.data;
    } else {
        vant.Toast.fail('请求失败');
    }
}, function (error) {
    // 对响应错误做点什么
    // console.log("对响应错误做点什么");
    return Promise.reject(error);
});