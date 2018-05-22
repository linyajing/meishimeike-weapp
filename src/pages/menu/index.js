import {defaultBannerListReponse, defaultMenuListReponse} from '../../mock/list';
Page({
    data: {
        id: ''
    },
    onLoad (option) {
        this.setData({
            id: option.id
        });
    },
    onShow() {
    },
    onReady() {
        console.log('ready菜单');
        // 此函数只能在ready中获取
        var pages = getCurrentPages();
        // 获取当前页面实例 current === this => true
        var current = pages[pages.length -1];
        console.log(current === this);
    },
    onHide() {
        console.log('hide菜单页');
    },
    onUnload () {
        console.log('unload菜单页');
    },
    onPullDownRefresh () {
        console.log('列表页下拉刷新');
    },
    onReachBottom () {
        console.log('列表页上拉触底');
    },
    onRequestList () {
        wx.request({
            url:`https://we.meishichina.com/wechat/we.php?ac=advert&op=getTimeLineList&page=${this.data.page}`,
            success: (res) => {
                let data = res.data.data;
                this.setData({
                    menuList: this.data.menuList.concat(data)
                });
            },
            error: (e) => {
                let data = defaultMenuListReponse.data;
                this.setData({
                    menuList: data
                });
            }
        });
        this.setData({
            page: this.data.page + 1
        });
    },
    onRequsetBanner () {
        wx.request({
            url: 'https://we.meishichina.com/wechat/we.php?ac=advert&op=getAppletSlideAdList',
            success: (res) => {
                let data = res.data.data;
                let list = data.map(val => {
                    return val.pic
                });
                this.setData({
                    bannerList: list
                });
            },
            error: () => {
                this.setData({
                    bannerList: defaultBannerListReponse.data
                });
            }
        });
    },
    navJump (event) {
        const navTo = {
            '1': 'menu',
            '2': 'collect',
            '3': 'menu'
        };
        let dataSet = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/${navTo[dataSet.temp]}/index?id=${dataSet.id}`
        });
    }
});