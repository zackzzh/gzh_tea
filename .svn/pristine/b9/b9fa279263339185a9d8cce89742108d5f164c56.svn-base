new Vue({
    el: '#main_div',
    data() {
        return {
            commodity: [],
            checked: false,
            total: 0,
            ids: [],
        }
    },
    mounted() {
        //初始化判断授权
        if (!TOKEN_KEY) {
            $api.wechat()
        } else {
            this.load()
        }
    },
    methods: {
        onClickLeft(val) {
            $go({
                path: 'index'
            })
        },
        //初始化
        load() {
            $myAPi.carts().then((res) => {
                this.commodity = res.data
            })
        },
        onSearch(val) {
            console.log("onSearch", val);
        },
        onSubmit(val) {
            this.ids = [];
            this.commodity.forEach((data) => {
                if (data.checked) {
                    this.ids.push(data.cart_id)
                }
            })
            if (this.ids.length == 0) {
                vant.Toast.fail('请先勾选商品');
                return;
            }
            var query = {
                type: 'more',
                goods_id: this.ids,
                order_type: 0
            }
            sessionStorage.setItem("confirmOrder", JSON.stringify(query))
            $go({
                path: "confirmOrder",
            })
        },
        //删除商品
        del(item, index) {
            console.log("item", item);
            vant.Dialog.confirm({
                title: '删除',
                message: '确认删除商品?'
            }).then(() => {
                $myAPi.cartdelete(item.cart_id).then((res) => {
                    console.log('res', res)
                    vant.Toast.success(res.msg);
                    this.commodity.splice(index, 1)
                    var number = 0;
                    var sum = 0;
                    var peisum = 0;
                    this.commodity.forEach((data) => {
                        if (data.checked) {
                            sum += data.price * data.quantity
                            number += Number(data.checked)
                            data.parts.forEach((peijian) => {
                                peisum += peijian.sku_price * peijian.quantity
                            })
                        }
                    })
                    this.total = sum + peisum
                    if (number === this.commodity.length && number !== 0) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                })
                // on confirm
            }).catch(() => {
                // on cancel
            });
        },
        //商品单选
        changeBox(data) {
            console.log('data', data)
            data.checked = !data.checked;
            var number = 0;
            var sum = 0;
            var peisum = 0;
            this.commodity.forEach((data) => {
                if (data.checked) {
                    sum += data.price * data.quantity
                    number += Number(data.checked)
                    data.parts.forEach((peijian) => {
                        peisum += peijian.sku_price * peijian.quantity
                    })
                }
            })
            this.total = sum + peisum
            if (number === this.commodity.length && number !== 0) {
                this.checked = true;
            } else {
                this.checked = false;
            }
        },
        //商品全选
        onAlChecked(val) {
            this.checked = !this.checked;
            this.ids = [];
            if (this.checked) {
                var sum = 0;
                var peisum = 0;
                this.commodity.forEach((data) => {
                    sum += data.price * data.quantity
                    data.checked = true;
                    data.parts.forEach((peijian) => {
                        peisum += peijian.sku_price * peijian.quantity
                    })
                })
                this.total = sum + peisum
            } else {
                this.commodity.forEach((data) => {
                    data.checked = false;
                })
                this.ids = [];
                this.total = 0
            }
        },
    }
});