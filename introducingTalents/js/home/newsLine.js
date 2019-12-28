var vm = new Vue({
	el: '#app',
	data: {
		title: "",
		indexText: "首页",
		lang: "cn",
		languageText: "English", 
		searchBox: false,
		position: "引智头条", 
		keyword:'',
		typeBtn: '申请活动',
		newsList:"",  
		navBar: "",
		smallNav: "", 
		parentid: "",
		typeid: "",
		searchObj: {
			arctype_id:"",
			lang: 'cn',
			limit: 12,
			typeid: "",
			page: 1,
			keywords: "",
		}
	},
	created() {   
		if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {} else { 
			if(parseUrl().typeid==19 || parseUrl().typeid==20 || parseUrl().typeid==21 || parseUrl().typeid==22) {
				location.href = "../index/exchangeTrainingList.html?typeid="+ parseUrl().typeid + "&parentid="+ parseUrl().parentid;
			} else {
				location.href = "../index/newsLine.html?typeid="+ parseUrl().typeid + "&parentid="+ parseUrl().parentid;
			}
		}
        if(sessionStorage.lang == 'en'){
            this.languageText = "中文";
	 		this.indexText = "Index"; 
	 		this.lang = "en";
		}else{
			sessionStorage.lang == 'cn';
		} 
		if(parseUrl()){
            this.parentid = parseUrl().parentid?parseUrl().parentid:''; 
            this.typeid = parseUrl().typeid?parseUrl().typeid:''; 
        } 
        if (parseUrl().typeid == 19 || parseUrl().typeid == 20 || parseUrl().typeid == 21 || parseUrl().typeid == 22) {
            this.typeBtn = '申请计划';
        }
		this.requireData();
    },
	methods: {  
		requireData(){
			// 导航栏
//			this.getList('navBar','home/arctypeList'); 
			this.getList('smallNav','home/arctypeList'); 
			// 文章列表
			this.getList('newsList','home/articleList'); 
        },
		getList(type,url,typeid){ 
            let that = this; 
            if(type=="navBar"){  
           		that.searchObj.arctype_id = "";
           	} 
           	if(type=="smallNav"){ 
           		that.searchObj.arctype_id = parseUrl().parentid?parseUrl().parentid:''; 
           	}    
            that.searchObj.typeid = parseUrl().typeid?parseUrl().typeid:''; 
            that.searchObj.lang = that.lang; 
			$.ajax({
				url: config.apiHost+url,
				type: 'GET',  
                async: true,  
                data:that.searchObj,
				dataType: 'json', 
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret);
					// 发送成功 
					if(ret.status == 'ok'){
						var list = ret.data;
						//console.log(ret);
                        if(type=="smallNav"){
                        	that[type] = list[0].childList;
							for(var i = 0; i< that.smallNav.length; i++){
								if(that.typeid == that.smallNav[i].id){ 
									that.position = that.smallNav[i].typename;
									return false;
								}
							}
                        }else if(type=="newsList"){
//                      	var count = ret.data.count; 
//                      	console.log(ret);
							that[type]  = ret.data.list; 
							if(ret.data.seo_title){
								document.title = ret.data.seo_title;
							}
							if(ret.data.seo_description){ 
								$("meta[name='description']").attr('content',ret.data.seo_description); 
							}
							if(ret.data.seo_keywords){
								$('meta[name="keywords"]').attr('content',ret.data.seo_keywords);
							}
                        }else{ 
                        	that[type] = list;
                        } 
					}
					else{
						that[type] = "";
					}
				},
				error: function (xhr, textStatus){
					// 发送失败
					console.log('错误')
					console.log(xhr)
					console.log(textStatus)
				},
			})
		},
		// 中英文切换
        changeLang(){
            this.lang == "en"?sessionStorage.lang = "cn":sessionStorage.lang = "en";  
			location.href = "../../index.html";
        }, 
		articleList(typeid, parentid,level) {
			if( parentid==9 && level==0 || parentid == 10 && level==0 ){  
			    var url = "http://ku.hbafea.com";
			}else if( typeid==11 || typeid == 50){           //专家人才
			    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
			}else if( typeid==13 || typeid == 51){           //项目技术
			    var url = "http://ku.hbafea.com/html/index/technology.html";
			}else if( typeid==15 || typeid == 52){           //合作机构
			    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
			}else if( typeid == 19 || typeid == 20 ||  typeid==21 || typeid == 22 || typeid == 33 || typeid == 34 || typeid == 29 || typeid == 30 || typeid == 35 || typeid == 36 || typeid == 31 || typeid == 32){ 
				// 卓越人才计划、国际交流培训、温馨手拉手、创业扶持、行业许可、引智政策
		        var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==23 || typeid == 24){           //名师讲堂
			    var url = "teacherLectureList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}   
		 	location.href = url;
		},
		articleDetail: function(aid, typeid, parentid) { 
			var url = "planDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			location.href = url;  
		},
		searchBoxShow(){
			this.searchBox = true;
		},
		searchFun() {
            if(this.lang == 'en'){
    			var url = "search.html?keywords=" + this.keyword+"&typeid="+ this.typeid+"&parentid="+ this.parentid;
            }else{
    			var url = "search.html?keywords=" + this.keyword+"&typeid="+ this.typeid+"&parentid="+ this.parentid;
            }
			location.href = url;
        },
	},
	filters: {
		getDate: function(str) {
			var oDate = new Date(str*1000),
				oYear = oDate.getFullYear(),
				oMonth = oDate.getMonth() + 1,
				oDay = oDate.getDate(),
				oHour = oDate.getHours(),
				oMin = oDate.getMinutes(),
				oSec = oDate.getSeconds(),
				oTime = oYear + '-' + oMonth + '-' + oDay; //最后拼接时间 
			return oTime;
		},
		getDesp: function(cont) { 
			if(cont){
				cont.length > 26?cont = cont.slice(0,26) + '...':'';
			} 
			return cont;
		}
	},
}); 
$(function() { 
	var typeid = $.getUrlParam('typeid');
	var parentid = $.getUrlParam('parentid');
	vm.typeid = typeid;
	vm.parentid = parentid; 
	var param = {
		lang: vm.lang,
	}
	apiAjax("home", param, "GET", home); 
}) 

function home(ret) {
	if(ret.data) {
//		console.log(ret);
		vm.navBar = ret.data;
		var list = ""; 
		if(vm.lang == "en") {
			list += '<li class="indexPage"><a href="index.html">Index</a></li>';
		} else {
			list += '<li class="indexPage"><a href="index.html">首页</a></li>';
		}
		for(var i = 0; i < ret.data.length; i++) {
			list += '<li>' +
				'<a>' + ret.data[i].typename + '</a>' +
				'<ul class="dl-submenu">' +
				'<li class="dl-back"><a href="#">返回上一级</a></li> ';
			for(var j = 0; j < ret.data[i].childList.length; j++) {
				list += '<li onclick="articleList(' + ret.data[i].childList[j].id + ',' + ret.data[i].id + ')"><a>' + ret.data[i].childList[j].typename + '</a></li>';
			}
			list += '</ul>' +
				'</li>';
		}
		$(".dl-menu").html(list);
		$('#dl-menu').dlmenu();
	}
}

function articleList(typeid, parentid) {
	if( parentid==9 && level==0 || parentid == 10 && level==0 ){  
	    var url = "http://ku.hbafea.com";
	}else if( typeid==11 || typeid == 50){           //专家人才
	    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
	}else if( typeid==13 || typeid == 51){           //项目技术
	    var url = "http://ku.hbafea.com/html/index/technology.html";
	}else if( typeid==15 || typeid == 52){           //合作机构
	    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
	}else if( typeid == 19 || typeid == 20 || typeid == 33 || typeid == 34 || typeid == 29 || typeid == 30 || typeid == 35 || typeid == 36 || typeid == 31 || typeid == 32){ 
		// 卓越人才计划、温馨手拉手、创业扶持、行业许可、引智政策
        var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
	}else if( typeid==21 || typeid == 22){           //国际交流培训
	    var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
	}else if( typeid==23 || typeid == 24){           //名师讲堂
	    var url = "teacherLectureList.html?typeid=" + typeid + "&parentid=" + parentid;
	}else{
		var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
	}   
 	location.href = url;
}
 
var bodyH = $("body").height();
var headerH = $(".header").height(); 
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH -footerH - bottomH - 280; 
$(".main").css({"min-height":mainH});