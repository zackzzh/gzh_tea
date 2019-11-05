new Vue({
    el: '#main_div',
    data() {
        return {
            rateVal: 4.5,
            headerActive: true,
            images: [
                './img/details/banner.png',
                './img/details/banner.png'
            ]
        }
    },
    mounted() {
        // console.log("pathName", pathName);
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        onHeader(val){
            // console.log("onHeader", val);
            this.headerActive = val
        },
        onSearch(val) {
            console.log("onSearch", val);
        },
        onChange(val) {
            switch (val) {
                case 0:
                    $go({ path: 'index' })
                    break;
                case 1:
                    // $go('home')
                    break;
                case 2:
                    $go({ path: 'shopping' })
                    break;
                case 3:
                    $go({ path: 'mine' })
                    break;
            }
        },
        onClick(val) {
            // console.log('onClick', val);
            $go({ path: "shopping" })
        },
        onClickBtn(val){
            console.log('onClickBtn', val);
        }
    }
});