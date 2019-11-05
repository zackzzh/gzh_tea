new Vue({
    el: '#main_div',
    data() {
        return {
            radio: '1',
            invoices_list: [],
            radio_invoice: null,
            invoice_type: null,
            invoice_text: '',
        }
    },
    mounted() {
        //初始化数据
        this.load();
        const invoice_type = JSON.parse(sessionStorage.getItem("invoice_type"))
        this.invoice_type = invoice_type.type
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        onLogout(val) {
            console.log("onLogout", val);
        },
        load() {
            $myAPi.invoices().then((res) => {
                this.invoices_list = res.data
            })
        },
        invoinceHandle(val) {
            if (val === '2') {
                this.invoice_text = '不需要发票'
                this.invoices_list = [];
            } else {
                this.radio_invoice = '';
                this.invoice_text = '需要发票'
                this.load()
            }
        },
        radioClick(item) {
            this.radio_invoice = item.id
            if (item.invoice_type === '普发-个人') {
                this.invoice_text = '个人发票'
            } else {
                this.invoice_text = '公司发票'
            }
            console.log('item', item);
        },
        confirm() {
            var invoice_id = {
                id: this.radio_invoice,
                invoice_text: this.invoice_text
            }
            sessionStorage.setItem("invoice_id", JSON.stringify(invoice_id))
            if (this.invoice_type === 'design') {
                $go({
                    path: this.invoice_type
                })
            } else {
                $go({
                    path: this.invoice_type
                })
            }
        },
        onBound(val) {
            console.log("onBound", val);
        },
        //头部右侧按钮
        onClickRight() {
            $go({
                path: 'invoice_type'
            })
        }
    }
});