import {collectDetailResponse, collectMenuListReponse} from '../../mock/collect';
Page({
    data: {
        collectId: '',
        collectDetail: {},
        collectMenuList: [],
        page: 1,
        isEnd: false
    },
    onLoad (option) {
        console.log(111, option);
        this.setData({
            collectId: option.id 
        })
        this.onRequsetCollectDetail();
        this.onRequestMenuList();
    },
    onShow() {
        console.log('show列表页');
        this.setData({
            text: 'onShow'
        });
    },
    onReady() {
        console.log('onready');
        // 此函数只能在ready中获取
        var pages = getCurrentPages();
        // 获取当前页面实例 current === this => true
        var current = pages[pages.length -1];
        console.log(current === this);
    },
    onHide() {
        console.log('hide集合');
    },
    onUnload () {
        console.log('unload集合');
    },
    onPullDownRefresh () {
        console.log('列表页下拉刷新');
    },
    onReachBottom () {
        console.log('列表页上拉触底');
        this.onRequestMenuList();
    },
    onRequsetCollectDetail () {
        let {collectId} = this.data;
        wx.request({
            url:`https://we.meishichina.com/wechat/we.php?ac=collect&op=getCollectDetail&id=${collectId}`,
            success: (res) => {
                let data = res.data.data;
                this.setData({
                    collectDetail: data
                });
            },
            error: (e) => {
                let data = collectDetail.data;
                this.setData({
                    collectDetail: data
                });
            }
        });
    },
    onRequestMenuList () {
        let {collectId, page} = this.data;
        wx.request({
            url:`https://we.meishichina.com/wechat/we.php?ac=collect&op=getCollectInRecipeList&id=${collectId}&page=${page}`,
            success: (res) => {
                let { data }= res.data;
                if (data.length) {
                    this.setData({
                        collectMenuList: this.data.collectMenuList.concat(data)
                    });
                } else {
                    this.setData({
                        isEnd: true
                    });
                }
            },
            error: (e) => {
                let data = defaultMenuListReponse.data;
                this.setData({
                    collectMenuList: data
                });
            }
        });
        this.setData({
            page: this.data.page + 1
        });
    },
    navJump (event) {
        let dataSet = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/menu/index?id=${dataSet.id}`
        });
    }
});