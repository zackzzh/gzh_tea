new Vue({
    el: '#main_div',
    data() {
        return {
            headerTitle: "行业分类",
            sidebarActive: 0,
            leftList: [],
            listData: {},
            bannerImg: '',
            listChild: [],
            classifyTitle: ''
        }
    },
    mounted() {
        const getPathData = sessionStorage.getItem("nextPath")
        const options = JSON.parse(getPathData)
        console.log("options", options);
        this.classifyTitle = options.type
        if (options.type === "industry") {
            this.headerTitle = "行业分类"
            this.industry();
        } else if (options.type === "material") {
            this.headerTitle = "材质分类"
            this.materials()
        }
    },
    methods: {
        onClickLeft(val) {
            $back();
        },
        // onSearch(val) {
        //     console.log("onSearch", val);
        // },
        // 行业分类
        industry(val) {
            $api.industry().then(res => {
                console.log("行业分类", res);
                this.listData = res.data.industry_list
                this.bannerImg = API_BASE_URL + res.data.banner.image
                this.listChild = [res.data.industry_list[0]]
            })
        },
        onClick(val) {
            console.log("onClick", val);
            // this.listChild = this.filterChild(val)
            for (let index = 0; index < this.listData.length; index++) {
                const element = this.listData[index];
                console.log("filterChild", element);
                if (element.id === val.id && this.classifyTitle === "industry") {
                    console.log("industry");
                    this.listChild = [element]
                    return
                } else if (element.id === val.id && this.classifyTitle === "material") {
                    console.log("material:", element);
                    this.listChild = element.child
                    return
                }
            }
        },
        materials(val) {
            $api.materials().then(res => {
                console.log("材质分类", res.data);
                this.listData = res.data.materials
                this.bannerImg = API_BASE_URL + res.data.banner
                this.listChild = this.listData[0].child
            })
        },
        onGrid(val) {
            const value = Object.assign({
                type: this.classifyTitle
            }, val)
            sessionStorage.setItem("custom", JSON.stringify(value))
            $go({
                path: "custom",
            })
        }
    }
});