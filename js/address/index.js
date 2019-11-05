new Vue({
    el: '#main_div',
    data() {
        return {
            chosenAddress: null,
            list: [],
            type: '', //判断其他页面跳转来，用于选择地址跳转
            path: '' //需要跳转路径
        }
    },
    created() {
        // 获取地址列表
        this.getAddress()
        /**
         * sAddress 订单跳转所对应的页面
         */
        const getPathData = JSON.parse(sessionStorage.getItem("sAddress"))
        if (getPathData && getPathData.type) {
            this.type = getPathData.type
        }
        if (getPathData && getPathData.path) {
            this.path = getPathData.path
        }
    },
    methods: {
        /**
         * 初始化获取地址
         */
        getAddress() {
            // 获取地址列表
            $api.address().then((res, req) => {
                this.list = res.data.map((item) => {
                    if (item.status === 1) {
                        this.chosenAddress = item.id
                    }
                    return item
                })
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 新增地址
         */
        onAdd() {
            // console.log('新增地址');
            $go({
                path: 'address_edit',
                query: {}
            })
        },
        /**
         * 编辑
         * @param {*} val 
         */
        onEdit(val) {
            // console.log('编辑地址:', val);
            $go({
                path: 'address_edit',
                query: {
                    val
                }
            })
        },
        /**
         * //删除地址
         * @param {*} val 
         */
        onRemove(val) {
            console.log('删除地址', val);
            $api.addressDel(val).then(res => {
                if (res.state == 1) {
                    this.getAddress()
                }
                $toast(res);
            })
        },
        /**
         * 默认地址修改
         * @param {*} val 
         */
        onChange(val) {
            // console.log('onChange', val);
            $api.addressState(val).then((res, req) => {
                $toast(res);
            })
        },
        /**下单选择地址后返回对呀的页面
         * 返回所选的地址
         * @param {*} item 
         */
        backAddress(item) {
            if (this.type.length > 0) {
                sessionStorage.setItem("address", JSON.stringify(item))
                if (this.path.length > 0) {
                    $go({
                        path: 'design'
                    })
                } else {
                    $go({
                        path: 'confirmOrder'
                    })
                }
            }
        }
    }
});