import {defaultBannerListReponse, defaultMenuListReponse} from '../../mock/list';
Page({
    data: {
        menuList: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        page: 1,
        mainNav: [
            {title: '菜谱分类'},
            {title: '食材大全'},
            {title: '专题'},
            {title: '菜单'},
            {title: '一周热门'},
            {title: '人气菜肴'},
            {title: '家常菜'},
            {title: '健康养生'}
        ]
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