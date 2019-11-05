new Vue({
    el: '#main_div',
    data() {
        return {
            industy: []
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
            $api.industry().then(res => {
                console.log("行业分类", res);
                this.industy = res.data.industry_list
            })
        },
        onClickLeft(val) {
            $back();
        },
        onGrid(val) {
            const value = Object.assign({
                type: 'industry'
            }, val)
            sessionStorage.setItem("custom", JSON.stringify(value))
            $go({
                path: "custom",
            })
        }
    }
});