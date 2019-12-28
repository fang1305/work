(function(window) {
    config = {
        
        apiHost: 'http://hbafea.com/admin/home/',
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
function parseUrl(){
    var url=location.href;
    var i=url.indexOf('?');
    if(i==-1)return;
    var querystr=url.substr(i+1);
    var arr1=querystr.split('&');
    var arr2=new Object();
    for  (i in arr1){
        var ta=arr1[i].split('=');
        arr2[ta[0]]=ta[1];
    }
    return arr2;
}
function getTimeInit(time){
    // var time = new Date().getTime();
    var date = new Date(time);
    var month = date.getMonth()<9?'0'+(date.getMonth()+1):(date.getMonth()+1);
    var day = date.getDate<10?'0'+date.getDate():date.getDate();
    return month+'-'+day; 
}
function getDateInit(time){
    // var time = new Date().getTime();
    var date = new Date(time*1000);
    var year = date.getFullYear();
    var month = date.getMonth()<9?'0'+(date.getMonth()+1):(date.getMonth()+1);
    var day = date.getDate<10?'0'+date.getDate():date.getDate();
    return year+'-'+month+'-'+day; 
}