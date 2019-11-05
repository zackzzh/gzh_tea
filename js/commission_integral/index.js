new Vue({
    el: '#main_div',
    data() {
        return {
            my_money: '',
            data: [],
            type: '',
        }
    },
    mounted() {
        var type = JSON.parse(sessionStorage.getItem("commission_integral"))
        this.type = type.type
        if (this.type == 'integral') {
            this.integral_list()
        } else {
            this.commission_list()
        }
    },
    methods: {
        /**
         * 积分获取
         * @param {*} val 
         */
        integral_list() {
            $myAPi.integral_list().then((res) => {
                this.my_money = res.data.integral
                this.data = res.data.integral_list
            })
        },
        /**
         * 佣金获取
         * @param {*} val 
         */
        commission_list() {
            $myAPi.commission_list().then((res) => {
                this.my_money = res.data.balance
                this.data = res.data.commission_list
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 跳转新闻详情
         */
        handleDetail(item) {}
    }
});