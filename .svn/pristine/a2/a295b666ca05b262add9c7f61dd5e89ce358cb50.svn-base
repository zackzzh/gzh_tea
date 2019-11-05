// 定义一个名为 button-counter 的新组件 材质行业
Vue.component('my-cell', {
    namespaced: true,
    props: ["data", "showChild", "count", "type"],
    data() {
        return {
            showmaterial: false,
            materialcolumns: [{
                    name: '选项'
                },
                {
                    name: '选项'
                }
            ],
            isShow: true,
            baseData: '',
            cellData: [],
            radio: 0
        }
    },
    methods: {
        onClick(val) {
            // console.log("点击", val, this.baseData, this.isShow);
            // this.showmaterial = true;
            // this.materialcolumns = val.child
            if (this.baseData === val.id) {
                this.isShow = !this.isShow
            } else {
                this.isShow = true
            }
            this.baseData = val.id
        },
        onRadio(val) {
            // console.log("onRadio",val);
            this.$emit("click", val);
        }
    },
    // <div v-for="(item,index) in data" :key="0+index">
    //         <van-radio-group v-model="radio">
    //             <van-cell-group>
    //                 <van-cell class="box_type_classify_cell" :title="item.name" @click="onClick(item)">
    //                     <span v-if="item.child && type =='more'" class="box_type_cell_right_icon iconfont icon-jiantou2" slot="right-icon"></span>
    //                     <van-radio v-else slot="right-icon" :name="item.id" @click="$emit('click',item)"></van-radio>
    //                 </van-cell>
    //             </van-cell-group>
    //         </van-radio-group>

    //      <div style="margin-left: .533333rem;" v-if="item.id === baseData && isShow && type=='more'">
    //         <my-cell v-if="item.child" :data="item.child" @click="onRadio" :type="'more'"></my-cell>
    //     </div></div></div>
    template: ` <div>
        <div v-for="(item,index) in data" :key="0+index">

            <van-radio-group v-model="radio">
                <van-cell-group>
                    <van-cell class="box_type_classify_cell" :title="item.name" @click="onClick(item)">
                        <van-radio slot="right-icon" :name="item.id" @click="$emit('click',item)"></van-radio>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
       </div></div>`
})

new Vue({
    el: '#main_div',
    data() {
        return {
            data: {},
            step: 0, //控制步骤显示影藏
            //step0
            loadImg: [],
            //step1
            devisedetail: {},
            //step2
            formData: {
                packaging_goods: '', //产品名称
                product_name: '', //所装产品
                capacity: '', //净含量
                style_name: '', //设计风格
                customer_name: '', //如何称呼您
                phone: '', //手机号码
                upload_file: '', //上传附件
                remark: '', //设计描述
            },
            isShowStyle: false,
            checked: false,
            styleName: '',
            styleColumns: [],
            image: './img/design/upload.png',
            //step3
            list: [],
            address: {},
            order_type: 1,
            goods_id: null,
            total: 0,
            remark: '', //订单备注
            invoice_id: '', //发票信息
            invoice_text: '需要发票', //
            //step4
            cradio: '0', //合同签约：
            pradio: '1', //选择支付方式
            orderdetail: {}, //预览订单
            materialList: [], //材质
            industryList: [], //行业
            productList: [], //材质行业筛选的产品
            filGoods: {}, //筛选产品的id组对象
            material_ids: [], //材质多选id租
            news_id: '' //生成设计产品新的id
        }
    },
    created() {
        //初始化数据
        this.load()
        //初始化设计风格
        this.loadstyles()
        //判断是否有地址数据
        const getAddress = JSON.parse(sessionStorage.getItem("address"))
        //判断是否有地址数据
        const designData = JSON.parse(sessionStorage.getItem("designData"))
        //判断是否有发票数据
        const invoice_id = JSON.parse(sessionStorage.getItem("invoice_id"))
        //判断本地电子签章
        const electronic_seal = JSON.parse(sessionStorage.getItem("electronic_seal"))
        console.log('electronic_seal', electronic_seal)
        if (electronic_seal) {
            if (electronic_seal.electronic_seal) {
                this.cradio = '1'
            } else {
                this.cradio = '0'
            }
        }
        if (designData) {
            this.news_id = designData.goods_id
            var query = {
                goods_id: designData.goods_id,
                order_type: designData.order_type,
                quantity: 1,
            }
            $myAPi.generate(query).then((res) => {
                if (res.state == 1) {
                    this.list = res.data.goods_list
                    this.address = res.data.address
                    this.total = res.data.total_amount
                    this.step = 3
                }
            })
        }
        if (invoice_id) {
            this.invoice_id = invoice_id.id
            this.invoice_text = invoice_id.invoice_text
            this.step = 3;
            var query = {
                goods_id: designData.goods_id,
                order_type: designData.order_type,
                quantity: 1,
            }
            $myAPi.generate(query).then((res) => {
                if (res.state == 1) {
                    this.list = res.data.goods_list
                    this.address = res.data.address
                    this.total = res.data.total_amount
                    this.step = 3
                }
            })
        }
        if (getAddress) {
            this.step = 3;
            this.address = getAddress
        }
    },
    methods: {
        onClickMaterial(val) {
            this.filGoods.material_quality_id = this.material_ids.join(",");
            $myAPi.products(this.filGoods).then((res) => {
                this.productList = res.data.product_list
            })
        },
        // 加载，初始化数据
        load() {
            $myAPi.devise_index().then((res) => {
                this.productList = res.data.product_list
                this.industryList = this.setType(res.data.industry_list, "industry")
                this.materialList = this.setType(res.data.material_quality_list, "material")
            })

        },

        //step0
        onClickLeft(val) {
            switch (Number(this.step)) {
                case 0:
                    sessionStorage.removeItem("address")
                    sessionStorage.removeItem("invoice_id")
                    sessionStorage.removeItem("electronic_seal")
                    sessionStorage.removeItem("designData")
                    $back();
                    break;
                case 1:
                    this.step = 0
                    break;
                case 2:
                    this.step = 1
                    break;
                case 3:
                    this.step = 2
                    break;
                case 4:
                    this.step = 3
                    break;

            }
        },
        // 设置item，类型
        setType(val, type) {
            for (let index = 0; index < val.length; index++) {
                val[index].type = type
                if (val[index].child) {
                    this.setType(val[index].child, type)
                }
            }
            return val
        },
        // 单选回调事件
        /**
         * // material_quality_id			int				[可选项]商品材质
            // industry_id				int				[可选项]商品行业ID
         * @param {*} val 
         */
        onRadio(val) {
            if (val.type === "industry") {
                this.filGoods.industry_id = val.id
            }
            $myAPi.products(this.filGoods).then((res) => {
                this.productList = res.data.product_list
            })

        },
        onClickBtn(val) {
            this.step = 1;
            $myAPi.devisedetail(val.id).then((res) => {
                this.devisedetail = res.data
            })
            console.log('val', val);
            this.goods_id = val.id
            // console.log("onClickBtn", val.id);
        },


        /**
         * step2
         * @param {*} val 
         */
        //设计风格--------------------
        //设计风格选择
        onSelectStyle(val) {
            console.log("onSelectStyle", val);
            this.isShowStyle = false
        },
        //设计风格赋值
        onCellStyle(val) {
            console.log("onCellStyle", val);
            this.isShowStyle = true
        },
        //获取设计风格数据
        loadstyles() {
            $myAPi.styles({}).then((res) => {
                this.styleColumns = res.data
            })
        },
        //设计风格确认
        onConfirm(value) {
            this.styleName = value.style_name
            this.formData.style_name = value.id;
            this.isShowStyle = false;
        },
        afterRead(file) {
            this.formData.upload_file = this.loadImg[0].content
        },
        //step3
        //地址
        toAddress() {
            var item = {
                type: 'selectAddress',
                path: 'design'
            }
            console.log('sAddress')
            sessionStorage.setItem("sAddress", JSON.stringify(item))
            $go({
                path: 'address',
            })
        },
        //发票
        needInvoice(val) {
            var item = {
                type: 'design'
            }
            sessionStorage.setItem("invoice_type", JSON.stringify(item))
            $go({
                path: 'invoice'
            })
        },

        //step4
        //支付
        pay() {
            $api.payWechat({
                order_number: this.orderdetail.order_number
            }).then(resWechat => {
                // console.log('payWechat', resWechat);
                if (resWechat.state == 1) {
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                            "appId": resWechat.data.appId, //公众号名称，由商户传入     
                            "timeStamp": resWechat.data.timeStamp, //时间戳，自1970年以来的秒数     
                            "nonceStr": resWechat.data.nonceStr, //随机串     
                            "package": resWechat.data.package,
                            "signType": "MD5", //微信签名方式：     
                            "paySign": resWechat.data.paySign //微信签名 
                        },
                        function (d) {
                            if (d.err_msg == "get_brand_wcpay_request:ok") {
                                sessionStorage.removeItem("address")
                                sessionStorage.removeItem("invoice_id")
                                sessionStorage.removeItem("electronic_seal")
                                sessionStorage.removeItem("designData")
                                vant.Toast.success('支付成功');
                                $go({
                                    path: 'index'
                                })
                                // 使用以上方式判断前端返回,微信团队郑重提示：
                                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                            }
                        });
                } else if (resWechat.state == 99) {
                    $toast(res, 'index')
                }
            })
            console.log("pay");
        },

        //合同签约
        // clickcradio(val) {
        //     console.log('val', val)
        //     var params = {
        //         is_online: Number(this.cradio)
        //     }
        //     $myAPi.order_signing('1909091738472491', params).then((res) => {
        //         if (this.cradio === '1') {
        //             var item = {
        //                 order_number: this.orderdetail.order_number
        //             }
        //             sessionStorage.setItem("order_number", JSON.stringify(item))
        //             $go({
        //                 path: 'electronic_seal'
        //             })
        //         }
        //     })

        // },
        //改变步骤条
        next(index) {
            console.log('formData', this.formData);
            switch (index) {
                case 0:
                    this.step = 0
                    break;
                case 2:
                    this.step = 2
                    break;
                case 3:
                    if (this.checked) {
                        if (!TOKEN_KEY) {
                            $api.wechat()
                        } else {
                            this.formData.goods_id = this.goods_id
                            $myAPi.save(this.formData).then((res) => {

                                console.log('res', res);
                                if (res.state == 1) {
                                    this.news_id = res.data
                                    var query = {
                                        goods_id: res.data,
                                        order_type: this.order_type,
                                        quantity: 1,
                                    }
                                    var designData = {
                                        goods_id: res.data,
                                        order_type: this.order_type,
                                    }
                                    sessionStorage.setItem("designData", JSON.stringify(designData))
                                    $myAPi.generate(query).then((res) => {
                                        $toast(res)
                                        if (res.state == 1) {
                                            this.list = res.data.goods_list
                                            this.address = res.data.address
                                            this.total = res.data.total_amount
                                            this.step = 3
                                        }
                                    })
                                }
                                $toast(res)
                            })
                        }
                    } else {
                        vant.Toast({
                            type: 'fail',
                            message: '请勾选协议'
                        });
                    }
                    break;
                case 4:
                    if (!TOKEN_KEY) {
                        $api.wechat()
                    } else {
                        var val = {
                            goods_id: this.news_id,
                            order_type: this.order_type,
                            address_id: this.address.id,
                            remark: this.remark,
                            invoice_id: this.invoice_id
                        }
                        $myAPi.create(val).then((res) => {
                            $toast(res)
                            if (res.state == 1) {
                                //没接支付前期做法
                                var value = {
                                    index: -1
                                }
                                sessionStorage.setItem("orderindex", JSON.stringify(value))
                                sessionStorage.removeItem("address")
                                sessionStorage.removeItem("invoice_id")
                                $myAPi.orderdetail(res.data).then((res) => {
                                    this.orderdetail = res.data
                                })
                                this.step = 4

                            }
                            // $toast(res, 'orders')
                        })
                    }
                    break;
            }
        },
    }
});