new Vue({
    el: '#main_div',
    data() {
        return {
            sidebarActive: 0,
            data: {},
            unique_key: '',
            shareData: {
                id: '',
                unique_key: '',
            },
            Request: {},
            comment_list: [], //评价列表
        }
    },
    created() {
        // var path = window.location.search.split('?')[1]
        this.Request = this.GetRequest();
        if (this.Request.id) {
            var query = {
                data: this.Request.unique_key
            }
            sessionStorage.setItem("share_unique_key", JSON.stringify(query))
            this.load(this.Request.id)
            var data = {
                goods_id: this.Request.id,
                type: 0
            }
            this.comment(data)
        } else {
            const getPathData = sessionStorage.getItem("info")
            this.unique_key = sessionStorage.getItem("unique_key")
            var options = JSON.parse(getPathData)
            this.load(options.id)
            var data = {
                goods_id: options.id,
                type: 0
            }
            this.comment(data)
        }
    },
    methods: {
        /**
         * 评论列表
         * @param {*} data 
         */
        comment(data) {
            $myAPi.comment_list(data).then((res) => {
                if (res.data.length > 0) {
                    this.comment_list.push(res.data[0])
                } else {
                    this.comment_list = []
                }
            })
        },
        /**
         * 查看全部评论
         */
        comment_all() {
            sessionStorage.setItem("comment_all", JSON.stringify({
                goods_id: this.data.id,
                type: 0
            }))
            $go({
                path: 'comment_all'
            })
        },
        /**
         * 分享朋友
         * @param {f} data 
         */
        share(data) {
            wx.ready(() => {
                wx.updateAppMessageShareData({
                    title: data.goods_name, // 分享标题
                    desc: data.industry_name + data.industry_child_name, // 分享描述
                    link: 'http://teaweb.gz-jiayou.com/info.html' + '?unique_key=' + this.unique_key + '&id=' + data.id, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: API_BASE_URL + data.cover_image, // 分享图标
                    success: function (res) {
                        // alert(res.errMsg)
                        // 设置成功
                    }
                })
            })
        },
        /**
         * 获取网页传的？#后面的数据
         */
        GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },

        //获取数据
        load(id) {
            $myAPi.goods(id).then((res) => {
                console.log('goods', res)
                Object.assign(res.data, {
                    unique_key: this.unique_key
                })
                this.data = res.data
                this.share(this.data)
                // setTimeout(() => {

                // }, 1000);
            })
        },
        onClickLeft(val) {
            $back();
        },
        /**
         * 底部导航
         * @param {*} val 
         */
        onChange(val) {
            switch (val) {
                case 0:
                    $go({
                        path: 'index'
                    })
                    break;
                case 1:
                    break;
                case 2:
                    $go({
                        path: 'shopping'
                    })
                    break;
                case 3:
                    $go({
                        path: 'mine'
                    })
                    break;
            }
        },
        /**
         * 跳转产品sku详情
         * @param {*} val 
         */
        onClick(val) {
            var query = {
                data: this.data
            }
            sessionStorage.setItem("info_sku", JSON.stringify(query))
            $go({
                path: "info_sku",
            })
        },
    }
});