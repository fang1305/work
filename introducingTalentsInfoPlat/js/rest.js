(function(window, config, jQuery) {
	apiAjax = function(url, obj, method, callbackSuccess,callbackError) {
		var name = url;
		var url = config.apiHost + config.restRoute[name];
		var obj = obj;
		var type = method;
		var callbackSuccess = callbackSuccess;
		var callbackError = callbackError;
		console.log(type);
//		console.log(url);
//		console.log(obj);
//		console.log(method);
		$.ajax({
			url: url,
			type: type,
			data: obj,
			dataType: "JSON",
			success: function(ret) {
				var ret =  ret; 
                var type = typeof ret; 
				if(type =="object"){
					callbackSuccess(ret);
				}else{
					callbackSuccess(JSON.parse(ret));
				}
			},
			error: function(err) {
				callbackError(err);
			}
		})
	}
	window.apiAjax = apiAjax;
}(window, config, jQuery))