(function(){
	var ajaxutil ={};
		var request =new window.XMLHttpRequest();

	ajaxutil.sendGetRequest=function(url,responseHandler,isjson){
		request.onreadystatechange=function() {
			responses(responseHandler,isjson);
		}
		request.open('GET',url,true);
		request.send(null);
	}

	function responses(responseHandler,isjson){
		if ((request.readyState==4)&&(request.status==200)){

			if (isjson==undefined){
				isjson=true;
			}
			if (isjson){
				responseHandler(JSON.parse(request.responseText));

			}else{
		responseHandler(request.responseText);
			}
		}
	};

window.$ajaxutil=ajaxutil;

	})();
