// 加载JQ，低版本，兼容ie8https://code.jquery.com/jquery-1.12.4.min.js
document.write('<script src="' + dotsSum + 'jquery/jquery-3.4.1.min.js"></script>')
// 访问后端
document.write('<script src="' + dotsSum + 'api/axios.min.js"></script>')
document.write('<script src="' + dotsSum + 'api/index.js"></script>')
document.write('<script src="' + dotsSum + 'api/api.js"></script>')
document.write('<script src="' + dotsSum + 'api/myApi.js"></script>')
document.write('<script src="' + dotsSum + 'config/jweixin-1.4.0.js"></script>')

document.write('<script src="' + dotsSum + 'config/wx_config.js"></script>')
// 加载bootstrap bootstrap\bootstrap.min.js
// document.write('<script src="' + dotsSum + 'bootstrap/bootstrap.min.js"></script>')
// 路由
document.write('<script src="' + dotsSum + 'config/routers.js"></script>')

function shangQiao() {
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?3322fda90c7a2b64380a34c2a68bc09f"
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}
shangQiao()
