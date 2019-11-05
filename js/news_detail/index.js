new Vue({
    el: '#main_div',
    data() {
        return {
            item: {

            }
        }
    },
    mounted() {
        // console.log("pathName", pathName);
        const news_id = JSON.parse(sessionStorage.getItem("news_id"))
        this.load(news_id.id)
    },
    methods: {
        /**
         * 新闻详情初始化
         */
        load(id) {
            $myAPi.article_detail(id).then((res) => {
                this.item = res.data
            })
        },
        onClickLeft(val) {
            $back();
        },
    }
});