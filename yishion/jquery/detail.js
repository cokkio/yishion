$(function($)
{

	// 详情页关于会员的信息
	$("#vipshow").mouseenter(function(event)
	{
		$("#vip").css("display","block");
	}).mouseleave(function()
	{
		$("#vip").css("display","none");
	})
	//详情页关于手机下单更优惠扫码
	$("#more").find(".phone").mouseenter(function(event)
	{
		$(".phone1").css("display","block")
	}).mouseleave(function()
	{
		$(".phone1").css("display","none")
	})

	// ============================================================================================================================================换图片，换名字，换价格
	var num = 0;
	$.get("../json/detail.json",function(data)
	{
		var data = data.cookie1;
		var str = location.search.split("=")[1];
		//console.log(str);
		$.each(data,function(obj,index)
		{
			//console.log(obj,index)
			//console.log(index.pvid)

			if(str == index.pvid)
			{
				$("<img id='data_id' data-id='"+ index.pvid +"' src='../"+ index.img +"' />").appendTo("#bigimg");
				$("<img src='../"+ index.img +"' />").appendTo("#glass-show");
				$("<h4>"+ index.title +"</h4>").prependTo(".news");
				$("<em>"+ index.price +"</em>").appendTo(".sell");
				$("<span>"+ index.price +"</span>").appendTo("#purchase b");


				//================================================================================================================================================================================================== 点击加入购物车的时候
				var count = 0;
				var onePrice = 0;
				var productTitle = "";
				var areas = "";
				if($.cookie("cart"))
				{
					var obj = JSON.parse($.cookie("cart"))
				}
				else
				{
					var obj = {};
				}
				$("#addcart").each(function()
				{
					var num = obj[$("#data_id").attr("data-id")]||0;
					$(this).click(function()
					{
						//单件商品数量
						count = $("#purchase").find("em").html();
						//单一商品总价格
						onePrice = $("#purchase").find("span").html();
						//商品名称
						productTitle = $(".news > h4").html();
						$("#price-box > span").html(count);
						//console.log(count,onePrice,productTitle);




						var prodId = $("#data_id").attr("data-id");
						//商品pvid和数量
						obj[prodId] = parseInt(count)+parseInt(num);
						var objTostr = JSON.stringify(obj);
						$.cookie("cart",objTostr,{expires:7,path:"/"});
						var cookie_obj = JSON.parse($.cookie("cart"));
						console.log(cookie_obj);
						var Num=0;
						$.each(cookie_obj,function(key,value)
						{
							console.log(key,value);
							Num+=value;
							console.log(Num)
							$("#price-box>span").html(Num);
						})

					})
				})
			}
		})
		
		//================================================================================================================================================================================================== 点击加入购物车的时候

		var num = 0;
		$(".add").click(function()
		{

			num++;
			$("#purchase").find("em").html(num);
			$("#purchase").find("i").html(100-num);
			$("#purchase").find("span").html("￥"+$(".sell>em").html()*num+"元");
			//console.log(num)
			//console.log($(".sell>em").html())

		})
		$(".reduce").click(function()
		{
			if(num == 0)
			{
				num = 0;
			}
			else
			{
				num--;
			}
			//console.log(num)
			$("#purchase").find("em").html(num);
			$("#purchase").find("i").html(100-num);
			$("#purchase").find("span").html("￥"+$(".sell>em").html()*num+"元");
		})



	})
	






























	// ============================================================================================================================================放大镜
	$(".glass-main").mouseover(function()
	{
		$("#imgshow").show();
		$("#glass-show").show();
	})
	$(".glass-main").mousemove(function(ev)
	{
		var showLeft = ev.pageX - $(this).offset().left - $("#imgshow").outerWidth()/2;
		var showTop = ev.pageY - $(this).offset().top - $("#imgshow").outerHeight()/2;
		if(showLeft <= 0)
		{
			showLeft = 0;
		}
		//console.log( $(this).outerWidth(),$("#imgshow").outerWidth());
		if(showLeft >= $(this).outerWidth() - $("#imgshow").outerWidth())
		{
			showLeft = $(this).outerWidth() - $("#imgshow").outerWidth();
		}
		if(showTop<=0)
		{
			showTop = 0;
		}
		if(showTop >= $(this).outerHeight() - $("#imgshow").outerHeight())
		{
			showTop = $(this).outerHeight() - $("#imgshow").outerHeight();
		}
		$("#imgshow").css({"left":showLeft,"top":showTop})
		var percentX = showLeft/($(this).outerWidth()-$("#imgshow").outerWidth());
		var percentY = showTop/($(this).outerHeight()-$("#imgshow").outerHeight());
		var glassLeft = percentX*($("#glass-show").outerWidth() - $("#glass-show > img").outerWidth());
		var glassTop = percentY*($("#glass-show").outerHeight() - $("#glass-show > img").outerHeight());
		$("#glass-show > img").css({"left":glassLeft,"top":glassTop})	
	})
	$(".glass-main").mouseout(function()
	{
		$("#imgshow").hide();
		$("#glass-show").hide();
	})






	// ==========================================================================================放大镜结束

	// ================================================================选项卡
	$("#tab1").find("li").click(function()
	{
		//console.log($(this).index());
		$("li").removeClass("cur")
		$(this).addClass("cur");
		$("#box"+$(this).index()).siblings().css("display","none");
		//console.log($("#box"+$(this).index()).siblings())
		$("#box"+$(this).index()).css("display","block");
		//console.log("#box"+$(this).index())

	})
	//============================================= 选项卡中的商品评论
	var num = 0;
	var str = "";
	var perpageNum = 5;
	var n = 0;
	var pageNum = 0;
	var arr = [];
	function changepage(n)
	{

		if(!!$("#assess textarea").val()){
			arr.push($("textarea").val());
		}
		for(var i= n*perpageNum;i<Math.min(perpageNum*(n+1),arr.length);i++)
		{
			str += "<li>"+ arr[i] +"</li>";
		}
		
		$("#user-assess > ul").html(str);
		str = "";
		$("#assess textarea").val("");

	}
	$("#btn-submit").click(function()
	{
		var re=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(re.test($(".e-mail").val()) == false)
		{
			alert("邮箱地址不正确，请重新输入。")
		}
		else
		{
			if($("textarea").val() != "")
			{
				num++;
				changepage(0);
				$(".q1").remove();
				pageNum = Math.ceil(num/perpageNum);
			//console.log(pageNum);
			}
			$(".m15 > em").html(num);
			$(".count").html(num);
		}
		
	})

	$("#perpage").click(function()
	{
		if(n == 0)
		{
			alert("已经是第一页了！")
		}
		else
		{
			n--;
			changepage(n);
			//console.log(n)
		}
		
	})
	$("#nextpage").click(function()
	{
		//console.log(pageNum);
		if(n == pageNum-1)
		{
			alert("已经是最后一页了！")
			
		}
		else
		{
			n++;
			changepage(n);
			//console.log(n)
		}
		
	})

	$(".grade").find("input").click(function()
	{
		
		//console.log($(this).parent("em").index(".grade > em"));
		$(".grade-stars > img").remove()
		$("<img src='../images/detail/stars" + (5 - $(this).parent("em").index(".grade > em")) + ".gif' />").appendTo(".grade-stars")
		//console.log(5 - $(this).parent("em").index(".grade > em"))
	})





})