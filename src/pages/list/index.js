import {defaultBannerListReponse, defaultMenuListReponse} from '../../mock/list';
Page({
    data: {
        menuList: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        page: 1
    },
    onLoad () {
        this.onRequsetBanner();
        this.onRequestList();
    },
    onShow() {
        console.log('show列表页');
        this.setData({
            text: 'onShow'
        });
    },
    onReady() {
        console.log('ready列表页');
        // 此函数只能在ready中获取
        var pages = getCurrentPages();
        // 获取当前页面实例 current === this => true
        var current = pages[pages.length -1];
        console.log(current === this);
        this.setData({
            text: 'onReady'
        });
    },
    onHide() {
        console.log('hide列表页');
    },
    onUnload () {
        console.log('unload列表页');
    },
    onPullDownRefresh () {
        // 停止下拉刷新，可以让页面下拉面板快速隐藏
        wx.stopPullDownRefresh();
        console.log('列表页下拉刷新');
    },
    onReachBottom () {
        console.log('列表页上拉触底');
        this.onRequestList();
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
    }
});