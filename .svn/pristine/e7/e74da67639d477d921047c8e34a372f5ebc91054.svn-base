new Vue({
    el: '#main_div',
    data() {
        return {
            customTitle: "小批量定制",
            searckVal: '',
            filterNum: 0,
            isPopup: false,
            industry_id: null,
            type: null,
            sales: false,
            price: false,
            goodsList: [],
            data: {},
            listData: [],
            secondData: [],
            threeData: [],
            secondIndex: null,
            thirdIndex: null,
            firstIndex: 0,
            material_quality_id: null,
            material_quality_filter_id: null,
            min_price: null,
            max_price: null
        }
    },
    created() {
        /**
         * custom 判断进来的页面类型
         * industry 行业
         * material材质
         * custom小批量
         * 默认是搜索
         */
        const pathData = JSON.parse(sessionStorage.getItem("custom"))
        switch (pathData.type) {
            case 'industry':
                var val = {
                    industry_id: pathData.id,
                    goods_type: 0
                }
                this.industry_id = pathData.id
                this.getList(val)
                break;
            case 'material':
                var val = {
                    material_quality_id: pathData.id,
                    goods_type: 0
                }
                this.material_quality_id = pathData.id
                this.getList(val)
                break;
            case 'custom':
                var val = {
                    goods_type: 1
                }
                this.semi_customs(val);
                break;
            default:
                var val = {
                    goods_type: 0,
                    goods_name: pathData.good_name
                }
                this.customTitle = pathData.good_name
                this.searckVal = pathData.good_name
                this.getList(val)
                break;
        }
        if (pathData.name) {
            this.customTitle = pathData.name
        }
        this.type = pathData.type
        console.log(pathData);
    },
    methods: {
        // 筛选重置
        reset() {
            this.secondIndex = null;
            this.thirdIndex = null;
            this.firstIndex = 0;
            this.material_quality_filter_id = null;
            this.min_price = null;
            this.max_price = null;
        },
        // 筛选确认
        confirm() {
            this.isPopup = false;
            var data = {
                industry_id: this.industry_id,
                material_quality_id: this.material_quality_filter_id,
                goods_type: 0,
                min_price: this.min_price,
                max_price: this.max_price,
                goods_name: this.searckVal,
            }
            if (this.type == 'custom') {
                this.semi_customs(data);
            } else {
                this.getList(data)
            }
        },
        // 第一层筛选
        first(item, index) {
            this.secondData = []
            this.threeData = []
            this.firstIndex = index
            this.material_quality_filter_id = item.id
            this.secondData = this.listData[index].child
        },
        //第二层筛选
        second(item, index) {
            this.secondIndex = index
            this.material_quality_filter_id = item.id
            this.threeData = this.listData[this.firstIndex].child[index].child
        },
        //第三层筛选
        third(item, index) {
            this.thirdIndex = index
            this.material_quality_filter_id = item.id
        },
        // 小批量定制初始化
        semi_customs(val) {
            this.goodsList = [];
            $myAPi.semi_customs(val).then(res => {
                this.data = res.data;
                this.goodsList = res.data.goods_list.map(item => {
                    item.cover_image = API_BASE_URL + item.cover_image
                    return item
                })
            })
        },
        //现有产品初始化
        getList(val) {
            this.goodsList = []
            $api.goodsList(val).then(res => {
                this.data = res.data;
                this.goodsList = res.data.goods_list.map(item => {
                    item.cover_image = API_BASE_URL + item.cover_image
                    return item
                })
            })
        },
        //获取材质属性
        materials(val) {
            $api.materials().then(res => {
                this.listData = res.data.materials
                this.secondData = res.data.materials[0].child
                this.threeData = res.data.materials[0].child[0].child
            })
        },
        onClickLeft(val) {
            $go({
                path: 'index'
            });
        },
        //搜索
        onSearch(val) {
            this.searckVal = val;
            switch (this.type) {
                case 'industry':
                    var data = {
                        industry_id: this.industry_id,
                        material_quality_id: this.material_quality_id,
                        goods_type: 0,
                        goods_name: val
                    }
                    this.getList(data)
                    break;
                case 'material':
                    var data = {
                        material_quality_id: this.material_quality_id,
                        goods_type: 0,
                        goods_name: val
                    }
                    this.getList(data)
                    break;
                case 'custom':
                    var data = {
                        goods_type: 1,
                        goods_name: val
                    }
                    this.semi_customs(data)
                    break;
                default:
                    var data = {
                        goods_type: 0,
                        goods_name: val
                    }
                    this.getList(data)
                    break;
            }
        },
        onItem(val) {},
        onSeachLeft(val) {},
        //筛选
        onFilter(val, filter) {
            // var  = ''
            var order_by = ''
            var order_type = ''
            switch (val) {
                case 0:
                    order_by = ''
                    order_type = ''
                    break;
                case 1:
                    if (filter) {
                        this.sales = false;
                        order_type = 0
                    } else {
                        this.sales = true;
                        order_type = 1
                    }
                    order_by = 'sales'
                    break;
                case 2:
                    if (filter) {
                        this.price = false;
                        order_type = 0
                    } else {
                        this.price = true;
                        order_type = 1
                    }
                    order_by = 'price'
                    break;
                case 3:
                    order_by = ''
                    order_type = ''
                    this.isPopup = true;
                    this.materials()
                    break;
            }
            this.filterNum = val
            switch (this.type) {
                case 'industry':
                    var data = {
                        industry_id: this.industry_id,
                        material_quality_id: this.material_quality_id,
                        goods_type: 0,
                        goods_name: this.searckVal,
                        order_by: order_by,
                        order_type: order_type,
                    }
                    this.getList(data)
                    break;
                case 'material':
                    var data = {
                        material_quality_id: this.material_quality_id,
                        goods_type: 0,
                        goods_name: this.searckVal,
                        order_by: order_by,
                        order_type: order_type,
                    }
                    this.getList(data)
                    break;
                case 'custom':
                    var data = {
                        material_quality_id: this.material_quality_id,
                        goods_type: 1,
                        goods_name: this.searckVal,
                        order_by: order_by,
                        order_type: order_type,
                    }
                    this.semi_customs(data)
                    break;
                default:
                    var data = {
                        material_quality_id: this.material_quality_id,
                        goods_type: 0,
                        goods_name: this.searckVal,
                        order_by: order_by,
                        order_type: order_type,
                    }
                    this.getList(data)
                    break;
            }
        },
        onClose() {
            this.isPopup = false;
        },
        //跳转详情
        onClick(val) {
            // 跳转商品详情
            if (this.type == "industry" || this.type == "material" || this.type == 'search') {
                sessionStorage.setItem('info', JSON.stringify(val))
                $go({
                    path: "info",
                })
            } else {
                sessionStorage.setItem('custom_detail', JSON.stringify(val))
                $go({
                    path: "custom_detail",
                    query: val
                })
            }
        }
    }
});