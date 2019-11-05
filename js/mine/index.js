new Vue({
    el: '#main_div',
    data() {
        return {
            headerTitle: "行业分类",
            sidebarActive: 0,
            active: 3,
            itemArr: [{
                    url: "./img/mine/item01.png",
                    title: "待付款",
                    index: 0,
                    type: "unpaid_num"
                }, {
                    url: "./img/mine/item02.png",
                    title: "生产中",
                    index: 5,
                    type: "producing_num"
                },
                {
                    url: "./img/mine/item03.png",
                    title: "已发货",
                    index: 2,
                    type: "shipped_num"
                }, {
                    url: "./img/mine/item04.png",
                    title: "待评价",
                    index: 3,
                    type: "unevaluated_num"
                }
            ],
            appArr: [{
                url: "./img/mine/app01.png",
                title: "佣金：",
                total: "¥0.00",
                path: 'commission_integral',
                type: 'commission'
            }, {
                url: "./img/mine/app02.png",
                title: "全部订单",
                path: 'orders'
            }, {
                url: "./img/mine/app03.png",
                title: "账号管理",
                path: "account"
            }, {
                url: "./img/mine/app04.png",
                title: "积分：",
                path: 'commission_integral',
                total: "0",
                type: 'integral'
            }, {
                url: "./img/mine/app05.png",
                title: "提现",
                path: 'withdrawal'
            }, {
                url: "./img/mine/app06.png",
                title: "地址管理",
                path: "address"
            }],
            customerInfo: {}
        }
    },
    created() {
        // console.log("location", window.location.search)
        //个人中心
        if (TOKEN_KEY) {
            //初始化数据
            $api.customerInfo().then(res => {
                console.log("customerInfo", res.data);
                this.customerInfo = res.data
                sessionStorage.setItem("customerInfo", JSON.stringify(res.data))
            })
        } else {
            $api.wechat()
        }
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        //跳转至订单
        onClick(vak) {
            // console.log("onClick", val);
            if (TOKEN_KEY) {
                var value = {
                    index: vak.index
                }
                sessionStorage.setItem("orderindex", JSON.stringify(value))
                $go({
                    path: 'orders',
                })
            } else {
                $api.wechat()
            }
        },
        //底部导航
        onChange(val) {
            switch (val) {
                case 0:
                    $go({
                        path: 'index'
                    })
                    break;
                case 1:
                    window.location.href = 'https://h5.youzan.com/v2/feature/EaOk1vhSgY'
                    break;
                case 2:
                    $go({
                        path: 'shopping'
                    })
                    break;
                case 3:
                    $go({
                        path: 'mine'
                    })
                    break;
            }
        },
        //个人中心菜单
        onApp(val) {
            console.log('onApp', val);
            console.log('TOKEN_KEY', TOKEN_KEY);
            if (TOKEN_KEY) {
                if (val.path == 'orders') {
                    var value = {
                        index: -1
                    }
                    sessionStorage.setItem("orderindex", JSON.stringify(value))
                    $go({
                        path: 'orders',
                    })
                } else if (val.path == 'commission_integral') {
                    $go({
                        path: 'commission_integral'
                    })
                    var value = {
                        type: val.type
                    }
                    sessionStorage.setItem("commission_integral", JSON.stringify(value))
                } else {
                    $go({
                        path: val.path
                    })
                }
            } else {
                // 微信授权
                $api.wechat()
            }
        }

    }
});