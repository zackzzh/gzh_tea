new Vue({
    el: '#main_div',
    data() {
        return {
            materials: []
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
            $api.materials().then(res => {
                console.log("材质分类", res.data);
                this.materials = res.data.materials
            })
        },
        onClickLeft(val) {
            $back();
        },
        onGrid(val) {
            const value = Object.assign({
                type: 'material'
            }, val)
            sessionStorage.setItem("custom", JSON.stringify(value))
            $go({
                path: "custom",
            })
        }
    }
});