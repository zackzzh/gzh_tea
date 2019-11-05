new Vue({
    el: '#main_div',
    data() {
        return {
            form: {},
            areaList, //地区列表
            searchResult: [],
            checked: false,
            addressInfo: {},
            showPopup: false,
            isEdit: false
        }
    },
    created() {
        const value = JSON.parse(sessionStorage.getItem("pathData")).val;
        if (value) {
            this.isEdit = true
            this.addressInfo = Object.assign({
                location: value.province + value.city + value.area
            }, value)
            this.checked = value.status
        }
    },
    methods: {
        onClickLeft() {
            $back();
        },
        onSubmit() {
            // let addressSubmit;
            if (this.isEdit) {
                addressSubmit = $api.addressUpdata(this.addressInfo).then(res => {
                    // console.log("addressUpdata", res);
                    vant.Toast.success(res.msg);
                    $go({ path: "address" })
                })
            } else {
                addressSubmit = $api.addressSave(this.addressInfo).then(res => {
                    // console.log("addressUpdata", res);
                    vant.Toast.success(res.msg);
                    $go({ path: "address" })
                })
            }
        },
        onLocation() {
            // 地区选择弹窗，关闭
            this.showPopup = true;
        },
        onCancel() {
            // 地区选择弹窗，关闭
            this.showPopup = false;
        },
        onConfirm(val) {
            // 地区选择弹窗，确认
            // console.log("onConfirm", val)
            this.showPopup = false;
            this.addressInfo.province = val[0].name
            this.addressInfo.city = val[1].name
            this.addressInfo.area = val[2].name
            this.addressInfo.location = val[0].name + val[1].name + val[2].name
        },
        //onClick
        onClick() {
            // 地址默认
            // console.log('地址默认:');
            this.checked = !this.checked
            if (this.checked) {
                this.addressInfo.status = 1
            } else {
                this.addressInfo.status = 0
            }
        }
    }
});