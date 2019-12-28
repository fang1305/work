(function(window) {
    config = {
 
        apiHost: 'http://www.hbafea.com/admin/home/',
        //  apiHost: '',
        restRoute: {
             //分类
             home: "home/arctypeList", 
             //banner
             banner: "home/advertList",
             //文章列表
             articleHomeList: "home/articleHomeList",
             //文章列表
             articleList: "home/articleList",
             //文章详情
             articleDetail: "home/articleDetail",
             //友情链接
             relatedLinks: "home/linksList"
        },
    }
    return config;
}(window)) 

$.getUrlParam = function(name) {
	var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}
function parseUrl(){
    var url=location.href;
    var i=url.indexOf('?');
    if(i==-1)return;
    var querystr=url.substr(i+1);
    var arr1=querystr.split('&');
    var arr2=new Object();
    for  (i in arr1){
        var ta=arr1[i].split('=');
        arr2[ta[0]] = decodeURI(ta[1]);
    }
    return arr2;
}
// 手机号校验
function phoneTest(tel) {
    var TEL_REGEXP = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (TEL_REGEXP.test(tel)) {
        return true;
    }
    return false;
}