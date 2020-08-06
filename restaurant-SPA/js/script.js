$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $(".navbar-toggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  })
});

(function(){

	var bq={};

	var homeHtml="Snippets/Home.html";
	var menuCatJson="js/categories.json"
	var menuCat="Snippets/menu.html";
	var categorytitle="Snippets/category.html";
	var categorySnippet="Snippets/categorySnippet.html";
	var menuCatSnip="Snippets/menuSnippet.html";



	function insertHtml(selector,html){
		document.querySelector(selector).innerHTML=html;
	}

	function showLoading(selector){
		var html ="<div class='text-center'><img src='images/loading2.gif'></div>";
		insertHtml(selector,html);
	}

	function insertProperty(string,propName,propValue){
		var propToReplace = "{{" + propName+"}}";
		string=string.replace(new RegExp(propToReplace,"g"),propValue);
		return string;

	}

	var switchMenuToActive=function(){
		var classes=document.querySelector("#navHomeButton").className;
		classes=classes.replace(new RegExp("active","g"),"");
		document.querySelector("#navHomeButton").className=classes;

		classes = document.querySelector("#navMenuButton").className;
		if (classes.indexOf("active")==-1){
			classes += " active";
   		 document.querySelector("#navMenuButton").className = classes;
		}
	}

	document.addEventListener("DOMContentLoaded",function(){

		showLoading("#main-content");
		$ajaxutil.sendGetRequest(homeHtml,
			function(req){
				// var html =req.responseText; if responseHandle(request);

				 document.querySelector("#main-content")
     		 	.innerHTML = req;
			},false)

	}

		)


	bq.loadCategory= function() {
		showLoading("#main-content");
		$ajaxutil.sendGetRequest(menuCatJson,
			buildCategories
		);
	}

	bq.loadMenu=function(category){
		showLoading("#main-content");
		$ajaxutil.sendGetRequest("js/"+category+".json"
			,buildMenu);

	}

	function buildMenu(menu){
		$ajaxutil.sendGetRequest(categorytitle,
			function(menuTitle){

				$ajaxutil.sendGetRequest(categorySnippet,
					function(menuBody){
          switchMenuToActive();

						var HTML = buildMenuView(menu,menuTitle,menuBody);
						insertHtml("#main-content",HTML);
					},false);
			}
			,false);
	}
	function buildMenuView(menu,menuTitle,menuBody){

		menuTitle=insertProperty(menuTitle,"name",menu.category.name);
		menuTitle=insertProperty(menuTitle,"special_instructions",menu.category.special_instructions);

		var finalHtml="<section class='row'>";
		finalHtml+=menuTitle;

		var menutitle=menu.menu_item;
		var catshort = menu.category.short_name;

		for(var i=0;i<menutitle.length;i++){
			var html = menuBody;
			html = insertProperty(html,"short_name",menutitle[i].short_name);
			html = insertProperty(html,"catShortName",catshort);
			html = insertProperty(html,"price",menutitle[i].price);
			html = insertProperty(html,"name",menutitle[i].name);
			html = insertProperty(html,"description",menutitle[i].description);
		if (i % 2) {
     		 html +=
        	"<div class='clearfix visible-lg-block visible-md-block'></div>";
   		 }
   		finalHtml+=html;
		}
		finalHtml+= "</section>";
		return finalHtml;

	}

	function buildCategories(cat){
		$ajaxutil.sendGetRequest(
			menuCat,
			function(catTitle){
				$ajaxutil.sendGetRequest(menuCatSnip
				,function(catBody){
          switchMenuToActive();

					var Html =buildCategoriesView(cat,catTitle,catBody);
					insertHtml("#main-content",Html);
				},false)
			},
			false);
	}
	function buildCategoriesView(cat,catTitle,catBody){

		var finalHtml = catTitle;
		finalHtml += "<section class='row'>";
		for(var i=0;i<cat.length;i++){
			var html=catBody;
			var name=cat[i].name;
			var short_name=cat[i].short_name;
			html=insertProperty(html,"name",name);
			html=insertProperty(html,"short_name",short_name);
			finalHtml+=html;
		}
		finalHtml+="</section>";
		return finalHtml;
	}

window.$bq=bq;

})();
