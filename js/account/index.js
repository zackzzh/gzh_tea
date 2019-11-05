new Vue({
    el: '#main_div',
    data() {
        return {
            headerTitle: "行业分类",
            sidebarActive: 0
        }
    },
    mounted() {
        // const pathRegex = /\w+$/;
   
        // console.log("pathName", pathName);
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        onLogout(val) {
            console.log("onLogout", val);
        },
        onBound(val){
            console.log("onBound", val);
        }
    }
});