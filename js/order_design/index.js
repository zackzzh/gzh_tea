new Vue({
    el: '#main_div',
    data() {
        return {
            item: {},
            total: '',
            formData: {
                quantity: '',
                remark: ''
            },
            checked: false, //是否开启积分
            integral: null, //输入积分
            now_integral: null, //当前积分
            customerInfo: {}, //用户信息
            freight_amount: 0, //运费
            integral_price: null, //积分价格
        }
    },
    mounted() {
        const orders_item = JSON.parse(sessionStorage.getItem("orders_item"))
        this.load(orders_item.order_number)
        this.userData()
        this.freight()
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        /**
         * 
         * @param {*} val 
         */
        integralChange() {
            console.log('this.customerInfo.integral', this.integral)
            console.log('this.customerInfo.integral', this.customerInfo.integral)
            if (this.integral <= Number(this.customerInfo.integral)) {
                this.integral_price = Number(this.integral * (this.customerInfo.integral_config.deduction_amount / this.customerInfo.integral_config.consumption_interal))
            } else {
                vant.Toast.fail({
                    message: '你的积分不足，请重新输入'
                })
                this.integral = null
            }
        },
        /**
         * 用户信息获取
         */
        userData() {
            $api.customerInfo().then(res => {
                this.customerInfo = res.data
            })
        },
        /**
         * 获取运费接口
         */
        freight() {
            $myAPi.freight().then(res => {
                this.freight_amount = res.data
            })
        },
        /**
         * 
         * @param {*} val 
         */
        load(data) {
            $myAPi.orderdetail(data).then((res) => {
                this.item = res.data
                this.total = Number(this.item.total_amount)
                this.formData.quantity = this.item.order_item[0].quantity
            })
        },

        /**
         * 设计订单确认生成普通订单
         */
        create() {
            var data = {
                order_number: this.item.order_number,
                remark: this.formData.remark,
                quantity: this.formData.quantity
            }
            $myAPi.design_generate_order(data).then((res) => {
                $toast(res);
                if (res.state == 1) {
                    if (this.checked) {
                        if (this.integral_price > 0) {
                            $api.payWechat({
                                order_number: res.data,
                                integral: this.integral
                            }).then(resWechat => {
                                if (resWechat.state == 1) {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": resWechat.data.appId, //公众号名称，由商户传入     
                                            "timeStamp": resWechat.data.timeStamp, //时间戳，自1970年以来的秒数     
                                            "nonceStr": resWechat.data.nonceStr, //随机串     
                                            "package": resWechat.data.package,
                                            "signType": "MD5", //微信签名方式：     
                                            "paySign": resWechat.data.paySign //微信签名 
                                        },
                                        function (d) {
                                            if (d.err_msg == "get_brand_wcpay_request:ok") {
                                                var value = {
                                                    index: 3
                                                }
                                                sessionStorage.setItem("orderindex", JSON.stringify(value))
                                                $go({
                                                    path: 'orders'
                                                })
                                            }
                                        });
                                }
                                if (resWechat.state == 100) {
                                    var value = {
                                        index: 3
                                    }
                                    sessionStorage.setItem("orderindex", JSON.stringify(value))
                                    $go({
                                        path: 'orders'
                                    })
                                }
                            })
                        } else {
                            $api.payWechat({
                                order_number: res.data,
                            }).then(resWechat => {
                                if (resWechat.state == 1) {
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": resWechat.data.appId, //公众号名称，由商户传入     
                                            "timeStamp": resWechat.data.timeStamp, //时间戳，自1970年以来的秒数     
                                            "nonceStr": resWechat.data.nonceStr, //随机串     
                                            "package": resWechat.data.package,
                                            "signType": "MD5", //微信签名方式：     
                                            "paySign": resWechat.data.paySign //微信签名 
                                        },
                                        function (d) {
                                            if (d.err_msg == "get_brand_wcpay_request:ok") {
                                                var value = {
                                                    index: 3
                                                }
                                                sessionStorage.setItem("orderindex", JSON.stringify(value))
                                                $go({
                                                    path: 'orders'
                                                })
                                            }
                                        });
                                }
                            })
                        }
                    } else {
                        $api.payWechat({
                            order_number: res.data,
                        }).then(resWechat => {
                            if (resWechat.state == 1) {
                                WeixinJSBridge.invoke(
                                    'getBrandWCPayRequest', {
                                        "appId": resWechat.data.appId, //公众号名称，由商户传入     
                                        "timeStamp": resWechat.data.timeStamp, //时间戳，自1970年以来的秒数     
                                        "nonceStr": resWechat.data.nonceStr, //随机串     
                                        "package": resWechat.data.package,
                                        "signType": "MD5", //微信签名方式：     
                                        "paySign": resWechat.data.paySign //微信签名 
                                    },
                                    function (d) {
                                        if (d.err_msg == "get_brand_wcpay_request:ok") {
                                            var value = {
                                                index: 3
                                            }
                                            sessionStorage.setItem("orderindex", JSON.stringify(value))
                                            $go({
                                                path: 'orders'
                                            })
                                        }
                                    });
                            }
                        })
                    }
                }

            })
        },
    }
});