// module.exports = './axios.min.js';

// const axios = require('./axios.min.js');
// const axiosIndex = require('./index.js');



const $api = {
    // 地址列表
    address: (params) => {
        // console.log("发送的数据", params)
        return request({
            url: 'address',
            // data: params,
            method: 'get'
        })
    },
    // 默认地址修改
    addressState: (params) => {
        return request({
            url: "address/update/state/" + params.id,
            method: 'POST'
        })
    },
    // 修改
    addressUpdata: (params) => {
        return request({
            url: "address/update/" + params.id,
            data: params,
            method: 'POST'
        })
    },
    // 新增
    addressSave: (params) => {
        return request({
            url: "address/save",
            data: params,
            method: 'POST'
        })
    },
    // 删除
    addressDel: (params) => {
        // console.log("发送的数据", params)
        return request({
            url: "address/delete/" + params.id,
            // data: params,
            method: 'DELETE'
        })
    },
    // 商品列表
    goodsList: (params = {}) => {
        // console.log("发送的数据", JSON.stringify(params))
        return request({
            url: "goods/list",
            params: params,
            method: 'GET'
        })
    },
    // 商品详情
    goodsInfo: (params = {}) => {
        // console.log("发送的数据", JSON.stringify(params))
        return request({
            url: "goods/" + params.id,
            // params: params,
            method: 'GET'
        })
    },
    // 行业分类
    industry: (params = {}) => {
        // console.log("发送的数据", JSON.stringify(params))
        return request({
            url: "industry",
            // params: params,
            method: 'GET'
        })
    },
    // 材质分类
    materials: (params = {}) => {
        // console.log("发送的数据", JSON.stringify(params))
        return request({
            url: "materials",
            // params: params,
            method: 'GET'
        })
    },
    // 小批量定制，保存
    customAdd: (params = {}) => {
        console.log("发送的数据", params)
        return request({
            url: "my_semi_custom/save",
            data: params,
            method: 'POST'
        })
    },
    // 微信授权
    wechat: (params = {
        REDIRECT_URI
    }) => {
        // const userToken = sessionStorage.getItem("TOKEN")
        // console.log("微信授权", sessionStorage.getItem("TOKEN"));
        // https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
        if (TOKEN_KEY) {} else {
            window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID +
                "&redirect_uri=" + params.REDIRECT_URI +
                "&&response_type=code&scope=snsapi_login,snsapi_userinfo&state=1,0#wechat_redirect"
        }
    },
    // 登录，授权，获取token
    login: (params) => {
        return request({
            url: "login",
            data: params,
            method: 'POST'
        })
    },
    // 个人中心
    // http://local.yitong.com/api/customer/info
    customerInfo: (params) => {
        return request({
            url: "customer/info",
            // data: params,
            method: 'GET'
        })
    },
    // 微信支付
    payWechat: (params) => {
        return request({
            url: "order/weixin_pay/" + params.order_number,
            data: params,
            method: 'post'
        })
    },
    // 获取指定商品属性接口
    goodsAttr: (params) => {
        // console.log("params", params);
        return request({
            url: "goods_attr/" + params.id,
            params: params,
            method: 'get'
        })
    }
}