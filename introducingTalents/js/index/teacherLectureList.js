var vm = new Vue({
	el: '#app',
	data: {
		title: "",
		indexText: "首页",
		lang: "cn",
		languageText: "English",
		yourposition: "您的位置",
		newsList:"",  
		navBar: "",
		smallNav: "",
		position: "", 
		parentid: "",
        keyword: "",
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
		if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
			location.href = "../home/planDetail.html?typeid="+ parseUrl().typeid + "&parentid="+ parseUrl().parentid;
		} else {}
        if(sessionStorage.lang == 'en'){
            this.languageText = "中文";
	 		this.indexText = "Index";
	 		this.yourposition = "Your position";
	 		this.lang = "en";
		}else{
			sessionStorage.lang == 'cn';
		} 
//					console.log(parseUrl());
        if(parseUrl()){
            this.parentid = parseUrl().parentid?parseUrl().parentid:''; 
            this.typeid = parseUrl().typeid?parseUrl().typeid:''; 
        } 
		this.requireData();
    },
	methods: {  
		requireData(){
			// 导航栏
			this.getList('navBar','home/arctypeList'); 
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
//			                        console.log(ret);
                        if(type=="smallNav"){
                        	that[type] = list[0].childList;
							for(var i = 0; i< that.smallNav.length; i++){
								if(that.typeid == that.smallNav[i].id){ 
									that.position = that.smallNav[i].typename;
									return false;
								}
							}
                        }else if(type=="newsList"){
                        	var count = ret.data.count; 
							that.searchObj.page == 1 && count > 0?that.createPagination(count):'';
							that[type]  = ret.data.list; 
							if(ret.data.seo_title){
								document.title = ret.data.seo_title;
							}
							if(ret.data.seo_description){ 
								$("meta[name='description']").attr('content',ret.data.seo_description);
//												console.log($("meta[name='description']").attr('content')); 
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
		articleList(typeid, parentid,level) {
			var typeid = typeid;
			var parentid = parentid;
			if( parentid==9 && level==0 || parentid == 10 && level==0 ){  
			    var url = "http://ku.hbafea.com";
			}else if( typeid==11 || typeid == 50){           //专家人才
			    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
			}else if( typeid==13 || typeid == 51){           //项目技术
			    var url = "http://ku.hbafea.com/html/index/technology.html";
			}else if( typeid==15 || typeid == 52){           //合作机构
			    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
            }else if( typeid == 19 || typeid == 20){
                var url = "exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
            }else if( typeid == 33 || typeid == 34 || typeid == 29 || typeid == 30 || typeid == 35 || typeid == 36 || typeid == 31 || typeid == 32){
                var url = "newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
            }else if( typeid==21 || typeid == 22){           //国际交流培训
			    var url = "exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==23 || typeid == 24){           //名师讲堂
			    var url = "teacherLectureList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}   
		 	location.href = url;
		 	//window.open(url);
		},
		articleDetail(aid){ 
		 	var url = "newsDetail.html?aid="+ aid+ "&typeid="+ this.typeid + "&parentid="+ this.parentid;
		 	window.open(url);
		},
		// 中英文切换
        changeLang(){
            this.lang == "en"?sessionStorage.lang = "cn":sessionStorage.lang = "en";  
			location.href = "../../index.html";
        },
        searchFun() {
            var url = "search.html?keywords=" + this.keyword + '&typeid=' + parseUrl().typeid + '&parentid=' + parseUrl().parentid;
            window.open(url);
        },
        createPagination(num) {
			let that = this; 
			var container = $('#pagination');
			var sources = function() {
				var result = [];
				for(var i = 1; i <= num; i++) {
					result.push(i);
				}
				return result;
			}();
			var options = {
				dataSource: sources,
				pageSize:12,
				className: 'paginationjs-theme-blue',
				callback: function(response, pagination) {
					//window.console && console.log(response, pagination);
					var dataHtml = '<ul>';
					$.each(response, function(index, item) {
						dataHtml += '<li>' + item + '</li>';
					});
					dataHtml += '</ul>';
                    container.prev().html(dataHtml); 
                    if(that.searchObj.page!=pagination.pageNumber){
                        that.searchObj.page = pagination.pageNumber;
                        that.getList('newsList','home/articleList'); 
                    } 
				}
			};
			container.addHook('beforeInit', function() {
//							window.console && console.log('beforeInit...');
			});
			container.pagination(options);
			container.addHook('beforePageOnClick', function(e) {
				window.console && console.log('beforePageOnClick...');
			});
			return container;
		}
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
			//console.log(oTime);
			return oTime;
		},
		getDesp: function(cont) { 
			if(cont){
				cont.length > 35?cont = cont.slice(0,35) + '...':'';
			}
			return cont;
		}
	},
});
$(function() {      
	$(".gtop").on("click", function() {
		window.scrollTo(0, 0);
	})
})  
var bodyH = $("body").height();
var headerH = $(".header").height();
var navBarH = $(".navBar").height();
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH - navBarH -footerH - bottomH - 85;  
$(".main").css({"min-height":mainH});