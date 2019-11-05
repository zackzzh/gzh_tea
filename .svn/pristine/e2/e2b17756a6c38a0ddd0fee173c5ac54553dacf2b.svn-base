new Vue({
    el: '#main_div',
    data() {
        return {
            customerInfo: {},
            rateVal: 0,
            message: "",
            order_item: {}
        }
    },
    created() {
        // 用户信息
        this.customerInfo = JSON.parse(sessionStorage.getItem('customerInfo'))
        order_item = JSON.parse(sessionStorage.getItem("order_item"))
        this.order_item = order_item
    },
    methods: {
        /**
         * 提交评价
         */
        onClick() {
            console.log(this.rateVal);
            if (this.rateVal == 0 || this.message.length == 0) {
                if (this.rateVal == 0) {
                    vant.Toast({
                        type: 'fail',
                        message: '给个好评吧谢谢'
                    })
                    return
                }
                if (this.message.length == 0) {
                    vant.Toast({
                        type: 'fail',
                        message: '请输入您要评价的内容'
                    })
                    return
                }
            } else {
                var params = {
                    goods_id: this.order_item.goods_id,
                    content: this.message,
                    score: this.rateVal
                }
                $myAPi.comment(this.order_item.order_number, params).then((res) => {
                    $toast(res)
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
            }
            console.log("onClick")
        }
    }
});