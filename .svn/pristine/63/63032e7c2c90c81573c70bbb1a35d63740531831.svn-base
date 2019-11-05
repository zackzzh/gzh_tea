(function ready() {
    var val = {
        url: window.location.href
    }
    $myAPi.config(val).then((res) => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.appId, // 必填，公众号的唯一标识
            timestamp: res.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.signature, // 必填，签名
            jsApiList: ["checkJsApi", "updateAppMessageShareData", "chooseWXPay", "onMenuShareAppMessage", "previewImage"] // 必填，需要使用的JS接口列表
        });
        wx.ready(function () { //需在用户可能点击分享按钮前就先调用
            wx.checkJsApi({
                jsApiList: ['updateAppMessageShareData', "chooseWXPay", "onMenuShareAppMessage", "previewImage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function (res) {
                    // 以键值对的形式返回，可用的api值true，不可用为false
                    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                }
            });
            
        });
    })
})()

function $toast(res, path = '') {
    if (res.state == 1) {
        vant.Toast({
            type: 'success',
            message: res.msg,
            onOpened: () => {
                if (path.length > 0) {
                    $go({
                        path: path
                    })
                }
            }
        });
    } else {
        vant.Toast({
            type: 'fail',
            message: res.msg,
            onOpened: () => {}
        });
    }
}