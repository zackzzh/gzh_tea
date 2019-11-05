new Vue({
    el: '#main_div',
    data() {
        return {
            radio: '1',
            forData: {
                invoice_type: '', //发票类型
                payable: '', //抬头
                duty_paragraph: '', //企业税号
                address: '', //企业地址
                contact_number: '', //联系电话
                opening_bank: '', //开户银行
                opening_account: '', //开户账号
            }
        }
    },
    mounted() {},
    methods: {
        onClickLeft(val) {
            $back();
        },
        //改变发票类型
        changeRadio(val) {
            this.radio = val;
        },
        //保存值
        save() {
            var val = {}
            switch (Number(this.radio)) {
                case 1:
                    val.invoice_type = '普发-个人'
                    val.payable = this.forData.payable
                    break;
                case 2:
                    val.invoice_type = '普法-企业'
                    val.payable = this.forData.payable
                    val.duty_paragraph = this.forData.duty_paragraph
                    break;
                default:
                    val.invoice_type = '专用发票'
                    val.payable = this.forData.payable
                    val.duty_paragraph = this.forData.duty_paragraph
                    val.address = this.forData.address
                    val.contact_number = this.forData.contact_number
                    val.opening_bank = this.forData.opening_bank
                    val.opening_account = this.forData.opening_account
                    break;
            }
            $myAPi.invoice_save(val).then((res) => {
                $toast(res, 'invoice')
            })
        }
    }
});