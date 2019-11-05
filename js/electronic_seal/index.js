new Vue({
    el: '#main_div',
    data() {
        return {
            radio: '1',
            //个人
            personData: {
                username: '', //用户名|代理人名称
                id_card: '', //用户|代理人身份证
                phone: '', //用户|代理电话
                email: '', //邮箱
            },
            //企业
            conpanyData: {
                company_name: '', //公司名称
                credit_code: '', //信用代码
                legal_person: '', //法人
                username: '', //用户名|代理人名称
                id_card: '', //用户|代理人身份证
                phone: '', //用户|代理电话
            },
            order_number: null //订单编号
        }
    },
    mounted() {
        /**
         * 获取订单编号
         */
        const order_number = JSON.parse(sessionStorage.getItem("order_number"))
        this.order_number = order_number.order_number
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        changeRadio(val) {
            this.radio = val;
        },
        //保存值
        save() {
            var val = {}
            switch (Number(this.radio)) {
                case 1:
                    val.type = '个人'
                    val.order_number = this.order_number
                    val.username = this.personData.username
                    val.id_card = this.personData.id_card
                    val.phone = this.personData.phone
                    val.email = this.personData.email
                    break;
                default:
                    val.type = '企业'
                    val.order_number = this.order_number
                    val.company_name = this.conpanyData.company_name
                    val.credit_code = this.conpanyData.credit_code
                    val.legal_person = this.conpanyData.legal_person
                    val.username = this.conpanyData.username
                    val.id_card = this.conpanyData.id_card
                    val.phone = this.conpanyData.phone
                    break;
            }
            $myAPi.order_update(val).then((res) => {
                if (res.state === 1) {
                    var item = {
                        electronic_seal: true
                    }
                    sessionStorage.setItem("electronic_seal", JSON.stringify(item))
                }
                $toast(res, 'design')
            })
        }
    }
});