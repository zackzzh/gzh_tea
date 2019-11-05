new Vue({
    el: '#main_div',
    data() {
        return {
            isShowFont: false, //字体比例：
            isShowStyle: false, //字体样式：
            goodsInfo: '',
            data: {},
            formData: {
                goods_id: null, //[必填]商品ID int
                quantity: null, //[必填]商品数量 int
                container_surface_id: null, //[必填]容量表面ID int
                container_font_style_id: null, //[必填]容量字体样式 int
                container_font_proportion_id: null, //[必填]容量字体比例ID
                packing_surface_id: null, //[必填]包装表面ID int
                packing_technology_describe: '', //包装工艺	
                packing_id: '' //包装id
            },
            show: false, //图片预览
            pack_item: {}, //初始化包装
            isPack: false,
            actionsPack: [],
            packSurface: {},
            isContainer: false, //容器表面处理：
            actionsContainer: [],
            actionsFont: [],
            actionsStyle: [],
            overprints: [],
            surfacesValue: [], //初始化表面选择值
            font_proportionsValue: [], //初始化字体选择值
            font_stylesValue: [], //初始化风格选择值
            container_index: null, //保存每个容器的下标
            sku_value: [], //初始化sku数据
            itemValue: {}, //初始化数据,
            formDataNew: {
                container_list: [],
                colorId: [],
                technology_describe: [] //容器不同工艺的客户需求描述
            },
            colorId: '', //颜色选择
            formPackData: {
                pack_selected: false, //包装选择
            },
            news_content: [],
            total_price: 0, //最终价格
            comment_list: [], //评价列表
            min_buy_num: 0, //加印数量
        }
    },
    created() {

        /**
         * 小批量商品的id
         */
        const goodsId = JSON.parse(sessionStorage.getItem("custom_detail"));
        var data = {
            goods_id: goodsId.id,
            type: 2
        }
        this.comment(data)
        $myAPi.semi_customs_detail(goodsId).then(res => {
            this.min_buy_num = res.data.min_buy_num

            // 商品信息
            this.goodsInfo = Object.assign({
                goods_id: res.data.id
            }, res.data)
            // 包装表面
            // if (res.data.packing && res.data.packing.items && res.data.packing.items.length > 0) {
            //     this.actionsPack = res.data.packing.surfaces.map(item => {
            //         const items = Object.assign({}, item, {
            //             packing_surface_name: item.name,
            //             packing_surface_id: item.id
            //         })
            //         return items
            //     })
            //     this.packSurface = {}
            //     this.formData.packing_surface_id = ''
            //     //初始化包装
            //     // this.pack_item = res.data.packing.items.find((data) => {
            //     //     return data.surface_id === this.formData.packing_surface_id
            //     // })
            // }
            // // 内容表面

            if (res.data.container.length > 0) {
                res.data.container.forEach((data, index) => {
                    if (data.sku.length > 0) {
                        this.news_content.push(data);
                    }
                })
            }
            this.news_content.forEach((data, index) => {
                if (data.attr.surfaces.length > 0) {
                    data.attr.surfaces.forEach((res, attrindex) => {
                        if (attrindex == 0) {
                            this.surfacesValue[index] = {}
                        }
                    })
                }
                if (data.attr.font_proportions.length > 0) {
                    data.attr.font_proportions.forEach((res, attrindex) => {
                        if (attrindex == 0) {
                            this.font_proportionsValue[index] = {}
                        }
                    })
                }
                if (data.attr.font_styles.length > 0) {
                    data.attr.font_styles.forEach((res, attrindex) => {
                        if (attrindex == 0) {
                            this.font_stylesValue[index] = {}
                        }
                    })
                }
                if (data.sku.length > 0) {
                    this.sku_value[index] = {};
                    // this.formDataNew.colorId[index] = null;
                    // var arr = data.sku.find((res, skuindex) => {
                    //     return this.surfacesValue[index].id == res.surface_id && this.font_stylesValue[index].id == res.font_style_id && this.font_proportionsValue[index].id == res.font_proportion_id
                    // })
                    // this.sku_value[index] = arr;
                    // 加印,价格区间
                    // const overprintsMap = this.sku_value[index].overprints
                    // if (overprintsMap) {
                    //     this.news_content[index].overprints = overprintsMap.map((item, index) => {
                    //         if (index === overprintsMap.length - 1) {
                    //             item.minQuantity = null
                    //             item.maxQuantity = item.quantity
                    //         } else {
                    //             item.minQuantity = overprintsMap[index].quantity
                    //             item.maxQuantity = overprintsMap[index + 1].quantity
                    //         }
                    //         return item
                    //     })
                    // }
                }
            })
            this.total(this.min_buy_num, this.news_content, this.goodsInfo)
        })
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
                goods_id: this.goodsInfo.id,
                type: 2
            }))
            $go({
                path: 'comment_all'
            })
        },
        //默认图片预览】
        previewImage(item) {
            console.log('item', item);
            wx.previewImage({
                current: API_BASE_URL + item.cover_image, // 当前显示图片的http链接
                urls: [API_BASE_URL + item.cover_image] // 需要预览的图片http链接列表
            });
        },
        //容器颜色
        handleColors(item, index) {
            this.formDataNew.colorId.splice(index, 1, item.id);
            this.sku_value[index].cover_image = item.cover_image;
        },
        //商品颜色选择
        handleColors1(item, index) {
            this.colorId = item.id
            this.news_content = [];
            $myAPi.semi_customs_container(this.goodsInfo.id, item.id).then((res) => {
                if (res.data.length > 0) {
                    res.data.forEach((data, index) => {
                        if (data.sku.length > 0) {
                            this.news_content.push(data);
                        }
                    })
                    this.news_content.forEach((data, index) => {
                        if (data.attr.surfaces.length > 0) {
                            data.attr.surfaces.forEach((res, attrindex) => {
                                if (attrindex == 0) {
                                    this.surfacesValue[index] = {}
                                }
                            })
                        }
                        if (data.attr.font_proportions.length > 0) {
                            data.attr.font_proportions.forEach((res, attrindex) => {
                                if (attrindex == 0) {
                                    this.font_proportionsValue[index] = {}
                                }
                            })
                        }
                        if (data.attr.font_styles.length > 0) {
                            data.attr.font_styles.forEach((res, attrindex) => {
                                if (attrindex == 0) {
                                    this.font_stylesValue[index] = {}
                                }
                            })
                        }
                        if (data.sku.length > 0) {
                            this.sku_value[index] = {};
                        }
                    })
                    this.total(this.min_buy_num, this.news_content, this.goodsInfo)
                } else {
                    $myAPi.semi_customs_detail(this.goodsInfo).then(res => {
                        if (res.data.container.length > 0) {
                            res.data.container.forEach((data, index) => {
                                if (data.sku.length > 0) {
                                    this.news_content.push(data);
                                }
                            })
                            this.news_content.forEach((data, index) => {
                                if (data.attr.surfaces.length > 0) {
                                    data.attr.surfaces.forEach((res, attrindex) => {
                                        if (attrindex == 0) {
                                            this.surfacesValue[index] = {}
                                        }
                                    })
                                }
                                if (data.attr.font_proportions.length > 0) {
                                    data.attr.font_proportions.forEach((res, attrindex) => {
                                        if (attrindex == 0) {
                                            this.font_proportionsValue[index] = {}
                                        }
                                    })
                                }
                                if (data.attr.font_styles.length > 0) {
                                    data.attr.font_styles.forEach((res, attrindex) => {
                                        if (attrindex == 0) {
                                            this.font_stylesValue[index] = {}
                                        }
                                    })
                                }
                                if (data.sku.length > 0) {
                                    this.sku_value[index] = {};
                                }
                            })
                            this.total(this.min_buy_num, this.news_content, this.goodsInfo)
                        }
                    })
                }
            })
        },
        //工艺描述
        technology_describe(index) {
            this.formDataNew.container_list[index] = {
                container_id: this.news_content[index].container_id,
                container_surface_id: this.sku_value[index].surface_id,
                container_font_style_id: this.sku_value[index].font_style_id,
                container_font_proportion_id: this.sku_value[index].font_proportion_id,
                technology_describe: this.formDataNew.technology_describe[index],
                color_id: this.formDataNew.colorId[index]
            }
        },
        //包装单选
        // packselected() {
        //     this.formPackData.pack_selected = !this.formPackData.pack_selected
        //     if (Object.keys(this.pack_item).length > 0) {
        //         if (this.formPackData.pack_selected) {} else {
        //             this.formData.packing_surface_id = ''
        //             this.formData.packing_technology_describe = ''
        //             this.formData.packing_id = ''
        //         }
        //         console.log('pack_item', this.pack_item)
        //     } else {
        //         vant.Toast({
        //             type: 'fail',
        //             message: '请选择定制包装的材质'
        //         })
        //     }
        //     this.total(this.formData.quantity, this.news_content, this.goodsInfo, this.pack_item)
        // },
        //容器单选
        selected(item, index) {
            this.container_index = index
            item.selected = !item.selected
            if (Object.keys(this.font_proportionsValue[this.container_index]).length > 0 && Object.keys(this.font_stylesValue[this.container_index]).length > 0 && Object.keys(this.surfacesValue[this.container_index]).length > 0) {
                this.total(this.goodsInfo.min_buy_num, this.news_content, this.goodsInfo)
            } else {
                vant.Toast({
                    type: 'fail',
                    message: '请选择定制容器的材质'
                })
            }
        },
        //每次选择获取属性
        getAttr() {
            var params = {
                surface_id: this.surfacesValue[this.container_index].id,
                font_proportion_id: this.font_proportionsValue[this.container_index].id,
                font_style_id: this.font_stylesValue[this.container_index].id,
                container_id: this.news_content[this.container_index].container_id
            }
            $myAPi.containeAttr(params).then((res) => {
                this.news_content[this.container_index].attr = res.data
                res.data.surfaces.forEach((data, attrindex) => {
                    if (res.data.selected_id.surface_id == data.id) {
                        this.surfacesValue[this.container_index] = data
                    }
                })
                res.data.font_proportions.forEach((data, attrindex) => {
                    if (res.data.selected_id.font_proportion_id == data.id) {
                        this.font_proportionsValue[this.container_index] = data
                    }
                })
                res.data.font_styles.forEach((data, attrindex) => {
                    if (res.data.selected_id.font_style_id == data.id) {
                        this.font_stylesValue[this.container_index] = data
                    }
                })
                var arr = this.news_content[this.container_index].sku.find((res, skuindex) => {
                    return this.surfacesValue[this.container_index].id == res.surface_id && this.font_stylesValue[this.container_index].id == res.font_style_id && this.font_proportionsValue[this.container_index].id == res.font_proportion_id
                })
                this.sku_value[this.container_index] = arr;
                // this.formDataNew.colorId[this.container_index] = {};
                console.log('this.sku_value[this.container_index]', this.sku_value[this.container_index])
                const overprintsMap = this.sku_value[this.container_index].overprints
                if (overprintsMap) {
                    this.news_content[this.container_index].overprints = overprintsMap.map((item, index) => {
                        if (index === overprintsMap.length - 1) {
                            item.minQuantity = null
                            item.maxQuantity = item.quantity
                        } else {
                            item.minQuantity = overprintsMap[index].quantity
                            item.maxQuantity = overprintsMap[index + 1].quantity
                        }
                        return item
                    })
                }
                this.total(this.goodsInfo.min_buy_num, this.news_content, this.goodsInfo)
            })
        },
        onClickLeft(val) {
            $go({
                path: 'custom'
            });
        },
        //表面处理：--------------------
        //字体比例：--------------------
        //字体比例：选择
        onSelectFont(val) {
            this.font_proportionsValue[this.container_index] = val
            this.isShowFont = false
            if (Object.keys(this.font_proportionsValue[this.container_index]).length > 0 && Object.keys(this.font_stylesValue[this.container_index]).length > 0 && Object.keys(this.surfacesValue[this.container_index]).length > 0) {
                this.getAttr();
            }

        },
        //字体比例：赋值
        onCellFont(val, index) {
            this.container_index = index
            this.isShowFont = true
            this.actionsFont = val
        },
        //字体样式：--------------------
        //字体样式：选择
        onSelectStyle(val) {
            this.isShowStyle = false
            this.font_stylesValue[this.container_index] = val
            if (Object.keys(this.font_proportionsValue[this.container_index]).length > 0 && Object.keys(this.font_stylesValue[this.container_index]).length > 0 && Object.keys(this.surfacesValue[this.container_index]).length > 0) {
                this.getAttr();
            }

        },
        //字体样式：赋值
        onCellStyle(val, index) {
            this.container_index = index
            this.actionsStyle = val
            this.isShowStyle = true
        },

        onPackSurface(val) {
            this.isPack = true
        },
        // 包装,表面处理：选择
        // onPackSelect(val) {
        //     this.isPack = false;
        //     this.packSurface = val
        //     this.pack_item = this.goodsInfo.packing.items.find((data) => {
        //         return data.surface_id === val.packing_surface_id
        //     })
        //     this.total(this.formData.quantity, this.news_content, this.goodsInfo, this.pack_item)
        // },
        // 容器，表面处理：赋值
        onContainerSurface(val, index) {
            this.container_index = index
            this.actionsContainer = val
            this.isContainer = true
        },
        //容器，表面处理
        onContainerSelect(val) {
            this.surfacesValue[this.container_index] = val
            if (Object.keys(this.font_proportionsValue[this.container_index]).length > 0 && Object.keys(this.font_stylesValue[this.container_index]).length > 0 && Object.keys(this.surfacesValue[this.container_index]).length > 0) {
                this.getAttr();
            }
            this.isContainer = false

        },
        // changeProductNum() {
        //     if (this.goodsInfo.min_buy_num>=this.min_buy_num) {
        //         this.formData.quantity = this.goodsInfo.min_buy_num;
        //         this.total(this.formData.quantity , this.news_content, this.goodsInfo)
        //     } else {
        //         this.formData.quantity = this.min_buy_num;
        //         this.total(this.formData.quantity, this.news_content, this.goodsInfo)
        //     }
        // },
        // // 数量,输入框内容改变
        // onInput(val) {
        //     if (val > this.goodsInfo.min_buy_num) {
        //         this.formData.quantity = val;
        //         this.total(val, this.news_content, this.goodsInfo)
        //     } else {
        //         this.formData.quantity = val;
        //         this.total(this.formData.quantity, this.news_content, this.goodsInfo)
        //     }
        // },
        // 数量,输入框内容改变
        changeProductNum() {
            if (this.goodsInfo.min_buy_num < this.min_buy_num) {
                vant.Toast.fail({
                    message: "最低起订量是" + this.min_buy_num + "套",
                })
                this.formData.quantity = this.min_buy_num;
                this.total(this.formData.quantity, this.news_content, this.goodsInfo)
            } else {
                this.formData.quantity = this.goodsInfo.min_buy_num;
                this.total(this.formData.quantity, this.news_content, this.goodsInfo)
            }
        },
        /**
         * 增加按钮
         */
        plus() {
            this.goodsInfo.min_buy_num += this.min_buy_num
            this.formData.quantity = this.goodsInfo.min_buy_num;
            this.total(this.formData.quantity, this.news_content, this.goodsInfo)
        },
        /**
         * 减少按钮
         */
        minus() {
            if (this.goodsInfo.min_buy_num === this.min_buy_num) {
                vant.Toast.fail({
                    message: "最低起订量是" + this.min_buy_num + "套",
                })
                this.goodsInfo.min_buy_num = this.min_buy_num
            } else {
                this.goodsInfo.min_buy_num -= this.min_buy_num
            }
            this.formData.quantity = this.goodsInfo.min_buy_num;
            this.total(this.formData.quantity, this.news_content, this.goodsInfo)
        },
        //计算价格
        total(val, container, goodsInfo) {
            console.log('val', val)
            var container_sum = 0
            var pack_sum = 0;
            var basic_sum = 0;
            this.formDataNew.container_list = [];
            container.forEach((data, index) => {
                if (data.selected) {
                    this.formDataNew.container_list[index] = {
                        container_id: this.news_content[index].container_id,
                        container_surface_id: this.sku_value[index].surface_id,
                        container_font_style_id: this.sku_value[index].font_style_id,
                        container_font_proportion_id: this.sku_value[index].font_proportion_id,
                        technology_describe: this.formDataNew.technology_describe[index],
                        color_id: this.formDataNew.colorId[index]
                    }
                    if (data.overprints.length == 1) {
                        if (val < data.overprints[0].maxQuantity) {
                            container_sum += val * this.sku_value[index].price
                        } else {
                            container_sum += val * data.overprints[0].price
                        }
                    } else {
                        if (val < data.overprints[0].minQuantity) {
                            container_sum += val * this.sku_value[index].price
                        } else {
                            var selectVal = data.overprints.find((data) => {
                                if (val >= data.minQuantity && val < data.maxQuantity) {
                                    return data
                                } else {
                                    return data.minQuantity == null
                                }
                            })
                            container_sum += val * selectVal.price
                        }
                    }
                }
            })
            // if (this.formPackData.pack_selected) {
            //     if (Object.keys(this.pack_item).length > 0) {
            //         this.formData.packing_surface_id = pack_item.surface_id
            //         this.formData.packing_id = pack_item.packing_id
            //         pack_sum = pack_item.price * val
            //     } else {
            //         pack_sum = 0
            //     }
            // }
            basic_sum = goodsInfo.price * val
            this.total_price = Number(container_sum) + Number(basic_sum)
            this.total_price = this.total_price.toFixed(2)
        },
        //保存信息
        onPay() {
            if (!TOKEN_KEY) {
                $api.wechat()
            } else {
                if (this.goodsInfo.min_buy_num >= this.min_buy_num) {
                    var arr = []
                    this.formDataNew.container_list.forEach((data) => {
                        arr.push(data)
                    })
                    var data = {
                        color_id: this.colorId,
                        goods_id: this.goodsInfo.id,
                        quantity: this.goodsInfo.min_buy_num,
                        // packing_id: this.formData.packing_id,
                        // packing_surface_id: this.formData.packing_surface_id,
                        // packing_technology_describe: this.formData.packing_technology_describe,
                        container_list: arr
                    }
                    $api.customAdd(data).then((res) => {
                        if (res.state == 1) {
                            sessionStorage.setItem("confirmOrder", JSON.stringify({
                                goods_id: res.data,
                                order_type: '2',
                                color_id: this.colorId,
                            }))
                        }
                        $toast(res, 'confirmOrder')
                    })
                } else {
                    vant.Toast.fail({
                        message: "最低起订量是" + this.goodsInfo.min_buy_num + "套",
                    })
                }
            }
        }
    }
});