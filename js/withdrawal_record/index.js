new Vue({
    el: '#main_div',
    data() {
        return {
            my_money: '',
            data: []
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        /**
         * 
         * @param {*} val 
         */
        load() {
            $myAPi.withdrawals().then((res) => {
                this.my_money = res.data.total
                this.data = res.data.list
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