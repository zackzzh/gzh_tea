new Vue({
    el: '#main_div',
    data() {
        return {
            comment_list: []
        }
    },
    mounted() {
        const comment_all = JSON.parse(sessionStorage.getItem("comment_all"));
        this.comment(comment_all)
    },
    methods: {
        /**
         * 评论列表
         * @param {*} data 
         */
        comment(data) {
            $myAPi.comment_list(data).then((res) => {
                if (res.data.length > 0) {
                    this.comment_list = res.data
                } else {
                    this.comment_list = []
                }
            })
        },
        onClickLeft(val) {
            $back();
        },
    }
});