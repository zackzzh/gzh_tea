new Vue({
    el: '#main_div',
    data() {
        return {
            my_money: '',
            formData: {
                amount: '',
                bank_card: '',
                username: '',
            }
        }
    },
    mounted() {
        this.userData()
    },
    methods: {
        /**
         * 
         * @param {*} val 
         */
        userData() {
            $api.customerInfo().then(res => {
                this.my_money = res.data.balance
            })
        },
        //跳转提现记录
        toRecord() {
            $go({
                path: 'withdrawal_record'
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 跳转新闻详情
         */
        save() {
            $myAPi.withdrawal_apply(this.formData).then((res) => {
                if (res.state == 1) {
                    this.userData()
                    this.formData = {
                        amount: '',
                        bank_card: '',
                        username: '',
                    }
                }
                $toast(res)
            })
        }
    }
});