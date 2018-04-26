import {defaultMenuListReponse} from '../../mock/list';
Page({
    data: {
        defaultBannerList: [
            'https://i3.meishichina.com/attachment/magic/2018/04/23/20180423152445147611413.jpg',
            'https://i3.meishichina.com/attachment/magic/2018/04/20/20180420152419510395113.jpg',
            'https://i3.meishichina.com/attachment/magic/2018/04/18/20180418152401928096313.jpg',
            'https://i3.meishichina.com/attachment/magic/2018/04/11/20180411152341520317913.jpg',
            'https://i3.meishichina.com/attachment/magic/2018/04/10/20180410152332811133613.jpg',
        ],
        menuList: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        page: 1
    },
    onLoad () {
        let self = this;
        wx.request({
            url: 'https://we.meishichina.com/wechat/we.php?ac=advert&op=getAppletSlideAdList',
            success: function(res) {
                let data = res.data.data;
                let list = data.map(val => {
                    return val.pic
                });
                self.setData({
                    bannerList: list
                });
            },
            error: function () {
                self.setData({
                    bannerList: this.defaultBannerList
                });
            }
        });
        wx.request({
            url:`https://we.meishichina.com/wechat/we.php?ac=advert&op=getTimeLineList&page=${this.page}`,
            success: function(res) {
                let data = res.data.data;
                console.log(data);
                self.setData({
                    menuList: data
                });
            },
            error: function (e) {
                let data = defaultMenuListReponse.data;
                self.setData({
                    menuList: data
                });
            }
        });
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
    }
});