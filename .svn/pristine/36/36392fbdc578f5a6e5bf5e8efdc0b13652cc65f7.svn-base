new Vue({
    el: '#main_div',
    data() {
        return {
            item: {},
            total: '',
            invoice_text: '',
            show: false, //设计订单生成普通订单弹窗
            formData: {
                quantity: '',
                remark: ''
            },
            product_price: 0
        }
    },
    mounted() {
        const orders_item = JSON.parse(sessionStorage.getItem("orders_item"))
        console.log('orders_item', orders_item)
        this.load(orders_item.order_number)
    },
    methods: {
        /**
         * 
         * @param {*} val 
         */
        load(data) {
            $myAPi.orderdetail(data).then((res) => {
                res.data.order_item.forEach((data) => {
                    this.product_price += Number(data.price) * Number(data.quantity)
                })
                this.item = res.data
                this.total = Number(this.product_price) + Number(this.item.freight_amount)
            })
        },
        onClickLeft(val) {
            $back();
        },
        //设计订单设计完成满意操作
        design(item, index) {
            var title = ''
            var message = ''
            if (index == 0) {
                title = '不满意'
                message = '不满意这件设计'
            } else {
                title = '满意'
                message = '满意这件设计'
            }
            vant.Dialog.confirm({
                title: title,
                message: message
            }).then(() => {
                var data = {
                    order_number: item.order_number,
                    status: Number(index)
                }
                $myAPi.change_design_state(data).then((res) => {
                    $toast(res);
                    if (res.state == 1) {
                        var value = {
                            index: 2
                        }
                        sessionStorage.setItem("orderindex", JSON.stringify(value))
                        $go({
                            path: 'orders'
                        })
                    }
                })
            }).catch(() => {});
        },
        /**
         * 待支付
         * @param {*} item 
         */
        pay(item) {
            var _this = this;
            $api.payWechat({
                order_number: item.order_number
            }).then(resWechat => {
                // console.log('payWechat', resWechat);
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
                                    index: 0
                                }
                                sessionStorage.setItem("orderindex", JSON.stringify(value))
                                $go({
                                    path: 'orders'
                                })
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        });
                } else if (resWechat.state == 99) {
                    $toast(res)
                }
            })
        },
        create(item) {
            this.show = true;
        },
        /**
         * 设计订单确认生成普通订单
         */
        confirm() {
            var data = {
                order_number: this.item.order_number,
                remark: this.formData.remark,
                quantity: this.formData.quantity
            }
            $myAPi.design_generate_order(data).then((res) => {
                $toast(res);
                if (res.state == 1) {
                    var value = {
                        index: 3
                    }
                    sessionStorage.setItem("orderindex", JSON.stringify(value))
                    $go({
                        path: 'orders'
                    })
                }
            })
        },
        /**
         * 确认收货
         * @param {*} item 
         */
        confirm_goods(item) {
            vant.Dialog.confirm({
                title: '确认收货',
                message: '确认收到这件商品'
            }).then(() => {
                $myAPi.confirm_receipt(item.order_number).then((res) => {
                    $toast(res);
                    if (res.state == 1) {
                        var value = {
                            index: 2
                        }
                        sessionStorage.setItem("orderindex", JSON.stringify(value))
                        $go({
                            path: 'orders'
                        })
                    }
                })
            }).catch(() => {});
        },
        //默认图片预览】
        previewImage(item) {
            wx.previewImage({
                current: API_BASE_URL + item.cover_image, // 当前显示图片的http链接
                urls: [API_BASE_URL + item.cover_image] // 需要预览的图片http链接列表
            });
        },
        /**
         * 申请退货
         * @param {*} item 
         */
        reback(item) {
            vant.Dialog.confirm({
                title: '申请退货',
                message: '确认要申请退货吗'
            }).then(() => {
                $myAPi.confirm_receipt(item.order_number).then((res) => {
                    $toast(res);
                    if (res.state == 1) {
                        var val = {
                            order_status: 2
                        }
                        this.load(val)
                    }
                })
            }).catch(() => {});
        },
    }
});