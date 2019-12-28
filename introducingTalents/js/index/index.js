var vm = new Vue({
	el: '#app',
	data: {
		indexText: "首页",
		lang: "cn",
		languageText: "English",
		navBar: "",             //导航栏
		banner: "",             //banner
		teacherBanner: "",
		newsList: "",           //bannner右侧新闻
		dynamicBar: "",
		dynamic: "",            //引智动态文章列表
		resource: "",           //资源共享文章列表
		training: "",           //人才培训
		training1: "",
		training2: "",
		trainingShow: true,
		policy: "",             //政策
		resource: "",
		trainingBar: "",
		resourceBar: "",
		trainbg: "",
		dynamicBarAct: 0,
		resourceBarAct: 0,
		trainingBarAct: 0,
		teacherBarAct: 0,
        typeid: 3,
        keyword:'',
		searchBannerObj:{
			type:"",
			lang: "cn",
		},
		searchObj:{
			arctype_id:"",
			typeid:"",
			lang: "cn",
			limit:"",
		},
		experts:"",            // 首页专家人才
		relatedLinks: ""       //相关链接
	},  
	created() {
        if(sessionStorage.lang == 'en'){
            this.lang = 'en';
		    this.languageText = "中文";
		    this.indexText = "Index";
		    this.typeid = 47;
		}else{
			this.typeid = 3;
			sessionStorage.lang == 'cn';
		}
		this.requireData();
    },
	methods: {
		requireData(){
			// 导航栏
			this.getList('navBar','home/arctypeList');
			this.getList('dynamicBar','home/arctypeList');
			this.getList('trainingBar','home/arctypeList');
			this.getList('resourceBar','home/arctypeList');  
			// 活动图
            this.getBanner('banner','home/advertList');
            this.getBanner('teacherBanner','home/advertList');
            this.getBanner('trainbg','home/advertList');
            // 首页文章列表
            this.getList('newsList','home/articleHomeList'); 
            this.getList('dynamic','home/articleHomeList'); 
            this.getList('resource','home/articleHomeList'); 
            this.getList('training','home/articleHomeList'); 
            this.getList('policy','home/articleHomeList'); 
            // 首页专家人才列表
            this.getExperts('experts','experts/expertsHomeList'); 
            // 相关链接
            this.getList('relatedLinks','home/linksList');
        },
        getBanner(type,url,typeid){ 
        	let that = this; 
        	if(type=="banner"){
            	that.lang=="en"?that.searchBannerObj.type = 2 : that.searchBannerObj.type = 1; 
            }
        	if(type=="teacherBanner"){
            	that.lang=="en"?that.searchBannerObj.type = 66 : that.searchBannerObj.type = 65; 
            	typeid?that.searchBannerObj.type=typeid:'';
            }
        	if(type=="trainbg"){
            	that.lang=="en"?that.searchBannerObj.type = 68 : that.searchBannerObj.type = 67; 
            }
        	that.searchBannerObj.lang = that.lang;
        	$.ajax({
				url: config.apiHost+url,
				type: 'GET',  
                async: true,  
                data:that.searchBannerObj,
				dataType: 'json',  
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret);
					// 发送成功
					if(ret.status == 'ok'){ 
//						console.log(ret);
						if(type=="banner"){
							setTimeout(() => { 
								var mySwiper = new Swiper('.swiper-container', {
									autoplay: true,
									scrollbar: {
										el: '.swiper-scrollbar',
										hide: true,
									},
								});
	                        }, 300);   
							that[type] = ret.data; 
						}
						else{
							that[type] = ret.data[0];
						}  
						console.log(that.trainbg);
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
        getList(type,url,typeid){ 
            let that = this;
            if(type=="newsList"){
            	that.searchObj.arctype_id = "";
            	that.searchObj.typeid = "";
        		that.searchObj.limit = 7;
            }
            if(type=="dynamic"){
            	that.searchObj.arctype_id = "";
            	that.lang=="en"?that.searchObj.typeid = 47 : that.searchObj.typeid = 3;
            	typeid?that.searchObj.typeid=typeid:'';
        		that.searchObj.limit = 12;
            }
            if(type=="resource"){
            	that.searchObj.arctype_id = "";
            	that.lang=="en"?that.searchObj.typeid = 56 : that.searchObj.typeid = 55;
            	typeid?that.searchObj.typeid=typeid:'';
        		that.searchObj.limit = 12;
            }
            if(type=="training"){
            	that.searchObj.arctype_id = "";
            	that.lang=="en"?that.searchObj.typeid = 20 : that.searchObj.typeid = 19;
        		that.searchObj.limit = 20;
            }
            if(type=="policy"){
        		that.searchObj.arctype_id = ""; 
            	that.lang=="en"?that.searchObj.typeid = 36 : that.searchObj.typeid = 35;
        		that.searchObj.limit = 12;
            } 
            if(type=="relatedLinks" || type=="navBar"){
            	that.searchObj.arctype_id = "";
            	that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            if(type=="dynamicBar"){
            	that.lang=="en"?that.searchObj.arctype_id = 2 : that.searchObj.arctype_id = 1;
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            if(type=="trainingBar"){
            	that.lang=="en"?that.searchObj.arctype_id = 18 : that.searchObj.arctype_id = 17;
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
            if(type=="resourceBar"){
            	that.lang=="en"?that.searchObj.arctype_id = 54 : that.searchObj.arctype_id = 53;
        		that.searchObj.typeid = "";
        		that.searchObj.limit = "";
            } 
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
//						console.log(ret);
						if(type=="dynamicBar" || type=="trainingBar" || type=="resourceBar"){
							that[type] = ret.data[0].childList;
//							console.log(ret.data[0].childList);
//							console.log(that[type]);
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
		getExperts(type,url){ 
            let that = this;  
			$.ajax({
				url: config.apiHost+url,
				type: 'POST', //GET
                async: true, //或false,是否异步
                data:{
                	lang: that.lang,
                	limit:6
                },
				dataType: 'json', //返回的数据格式：json/xml/html/script/jsonp/text
				success: function (ret){
					typeof ret == "object"?'':ret=JSON.parse(ret); 
					// 发送成功
					if(ret.status == 'ok'){
						var list = ret.data;
//						console.log(ret);
						that[type] = list; 
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
		articleList: function(typeid, parentid,level) { 
			if( parentid==9 && level==0 || parentid == 10 && level==0 ){  
			    var url = "http://ku.hbafea.com";
			}else if( typeid==11 || typeid == 50){           //专家人才
			    var url = "http://ku.hbafea.com/html/index/expertTalents.html";
			}else if( typeid==13 || typeid == 51){           //项目技术
			    var url = "http://ku.hbafea.com/html/index/technology.html";
			}else if( typeid==15 || typeid == 52){           //合作机构
			    var url = "http://ku.hbafea.com/html/index/cooperativeAgency.html";
            }else if( typeid == 19 || typeid == 20){
                var url = "html/index/exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
            }else if( typeid == 33 || typeid == 34 || typeid == 29 || typeid == 30 || typeid == 35 || typeid == 36 || typeid == 31 || typeid == 32){ // 人才培训
                var url = "html/index/newsLine.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==21 || typeid == 22){           //国际交流培训
			    var url = "html/index/exchangeTrainingList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==23 || typeid == 24){           //名师讲堂
			    var url = "html/index/teacherLectureList.html?typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "html/index/newsList.html?typeid=" + typeid + "&parentid=" + parentid;
			}
			window.open(url);
        },
        searchFun() {
            if(this.lang == 'en'){
    			var url = "html/index/search.html?keywords=" + this.keyword+'&typeid=47&parentid=1';
            }else{
    			var url = "html/index/search.html?keywords=" + this.keyword+'&typeid=3&parentid=1';
            }
			window.open(url);
        },
		articleDetail(aid, typeid, parentid) { 
			if( typeid==27 || typeid == 28){           //专家风采
			    var url = "html/index/expertsElegantDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			}else if( typeid==19 || typeid == 20 ||  typeid==21 || typeid == 22 || typeid==31 || typeid == 32){           //卓越人才计划、国际交流培训、创业扶持
			    var url = "html/index/planDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			}else{
				var url = "html/index/newsDetail.html?aid=" + aid + "&typeid=" + typeid + "&parentid=" + parentid;
			} 
			window.open(url);
		},
		language: function() {
			let that = this;
			that.dynamicBarAct = 0;
			that.resourceBarAct = 0;
			that.trainingBarAct = 0;
			that.teacherBarAct = 0;
			that.trainingShow = true;
			if(that.lang == 'cn'){
                that.lang = 'en'; 
                that.languageText = "中文";
				that.indexText = "Index";
				that.typeid = 47;
                sessionStorage.lang = "en";
                // 重新请求数据
                that.requireData();
            }else{
                that.lang = 'cn'; 
				that.languageText = "English";
				that.indexText = "首页";
				sessionStorage.lang = "cn";
				that.typeid = 3;   
                // 重新请求数据
                that.requireData();
            }  
		},
		dynamicBarSelect: function(typeid, index) { 
			this.dynamicBarAct = index;
			this.typeid = typeid;
			this.getList('dynamic','home/articleHomeList',typeid);
		},
		trainingBarSelect: function(typeid, index) {
			this.trainingBarAct = index;
			if(typeid == 23 || typeid == 24) {
				var training = {
					typeid: typeid,
					lang: this.lang,
					limit: 22,
				};
				apiAjax("articleHomeList", training, "GET", trainingCallBack1);
			} else {
				var training = {
					typeid: typeid,
					lang: this.lang,
					limit: 22,
				};
				apiAjax("articleHomeList", training, "GET", trainingCallBack);
			}
		},
		teacherBannerSelect: function(obj) {
			this.teacherBarAct = 0;
			var typeid = "";
			if(this.lang == "cn") {
				typeid = 65;
			} else {
				typeid = 66;
			}
			this.getBanner('teacherBanner','home/advertList',typeid);
		},
		dynamicBannerSelect: function(obj) {
			this.teacherBarAct = 1;
			var typeid = "";
			if(this.lang == "cn") {
				typeid = 69;
			} else {
				typeid = 70;
			}
			this.getBanner('teacherBanner','home/advertList',typeid);
		},
		resourceBarSelect: function(typeid, index) {
			this.resourceBarAct = index; 
			this.getList('resource','home/articleHomeList',typeid); 
		},

	},
	filters: {
		getDate: function(str) {
			var oDate = new Date(str * 1000),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSec = oDate.getSeconds(),
			oTime = oYear + '-' + oMonth + '-' + oDay; //最后拼接时间
			//console.log(oTime);	
			return oTime;
		}
	},
});
$(function() {
	$(".gtop").on("click", function() {
		window.scrollTo(0, 0);
	}) 
}) 

function trainingCallBack(ret) {
	console.log(ret.data);
	vm.training = ret.data;
	vm.trainingShow = true;
}

function trainingCallBack1(ret) {
	console.log(ret.data);
	vm.training = "";
	if(ret.data) {
		var training1 = new Array();
		var training2 = new Array();
		for(var i = 0; i < ret.data.length; i++) {
			if(i < 2) {
				training1.push(ret.data[i]);
			} else if(i < 6) {
				training2.push(ret.data[i]);
			} else {

			}
		}
		vm.training1 = training1;
		vm.training2 = training2;
	}
	vm.trainingShow = false; 
} 

var bodyH = $("body").height();
var headerH = $(".header").height();
var navBarH = $(".navBar").height();
var footerH = $(".footer").height();
var bottomH = $(".bottom").height();
var mainH = bodyH - headerH - navBarH - footerH - bottomH - 155;
$(".main").css({
	"min-height": mainH
});