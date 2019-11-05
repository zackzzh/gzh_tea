new Vue({
    el: '#main_div',
    data() {
        return {
            news_list: []
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
            $myAPi.articles({}).then((res) => {
                this.news_list = res.data.article_list
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 跳转新闻详情
         */
        handleDetail(item) {
            var val = {
                id: item.id
            }
            sessionStorage.setItem("news_id", JSON.stringify(val))
            $go({
                path: 'news_detail'
            })
        }
    }
});