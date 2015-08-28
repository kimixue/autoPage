(function($){
	var defaults = {
		'valArr':['item1','item2','item3','item4','item5','item6','item7','item8'],
		'item':2,				//每一页显示的条数
		'listBox':'#j-list-box',  //存放列表数据盒子
		'currentPageId':'#j-c-page', //当前页id
		'totalPageId':'#j-t-page',  //全部页面
		'upPage':'#j-up-page',  //上一页
		'downPage':'#j-down-page',//下一页
		'page':1
	};
	var win = $(window),opts={},arr=[],res=[],hash={},page,pages;

	var AP = $.fn.autoPaging = function(options){
		opts = $.extend({},defaults,options||{}); 
		LIST_BOX = $(opts.listBox);
		CUR_PAGE_ID = $(opts.currentPageId);
		TOTAL_PAGE_ID = $(opts.totalPageId);
		UP_PAGE = $(opts.upPage);
		DOWN_PAGE = $(opts.downPage);

		return this.each(function(){
			var $this = $(this);
			AP.init();
		});
	};
	AP.init = function(){
		AP.creatUl();
		UP_PAGE.on('click',function(){
			AP.upPage();
		});
		DOWN_PAGE.on('click',function(){
			AP.downPage();
		});
	};
	AP.group = function(){
		for(var j=0;j<opts.valArr.length;j++){
			var id = "ul"+parseInt(j/5);
		    arr.push(id);
		};

		for(var i=0, elem; (elem = arr[i]) != null; i++)  {
		    if (!hash[elem]){
		        res.push(elem);
		        hash[elem] = true;
		    };
		};
		page=parseInt(opts.page);//获取当前的页数
        pages=parseInt(res.length);//获取当前的总页数
	};
	AP.creatUl = function(){
		AP.group();
		CUR_PAGE_ID.html(page);
		TOTAL_PAGE_ID.html(pages);
		for(var i=0;i<res.length;i++){
			$('<ul class="m-table-bd" id="j-page'+i+'"></ul>').appendTo(opts.listBox);
			LIST_BOX.find('ul').eq(0).show().siblings('ul').hide();
		};

		for(var j=0;j<opts.valArr.length;j++){
			var id = "j-page"+parseInt(j/5);
			$('<li>'+opts.valArr[j]+'</li>').appendTo("#"+id);
		};
	};
	AP.upPage = function(){
		var num = CUR_PAGE_ID.html();
		if(num>1){
			num--;
			CUR_PAGE_ID.html(num);
			$('#j-page' + (num-1)).show().siblings('ul').hide();
		}
	};
	AP.downPage = function(){
		var num = CUR_PAGE_ID.html();
		if(num < pages){
			num = ++num;
			CUR_PAGE_ID.html(num);
			$('#j-page' + (num-1)).show().siblings('ul').hide();
		}
	};
})(jQuery);