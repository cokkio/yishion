$(function($)
{




	// =======================================================================================================================================================================================================================真正的导航

	$("#nav-tab>li").each(function()
	{
		$(this).mouseenter(function(event)
		{
			$(this).css({"background":"#fff"});
			$(this).find("a:first").css("color","#c80a28")
			$(this).find($(".hot-data")).css("display","block");
			//console.log($(this))
		}).mouseleave(function()
		{
			$(this).css({"background":"#c80a28"});
			$(this).find("a:first").css("color","#fff")
			$(this).find($(".hot-data")).css("display","none");
		})
	})





	
	$(".tab11>li>a").click(function()
	{
		$(".tab11").find("ul").css("display","none");
		$(".tab11").find("span").html("+");
		$(this).find("span").html("-")
		$(this).parent().find("ul").css("display","block");
	})
	

	$.get("../json/detail.json",function(data)
	{
		var data = data.cookie1;
		console.log(data);
		var str ="";
		var n=0;
		for(attr in data)
		{
			n++;
		}
		console.log(n)
		var perpageNum = 9;
		var countNum = n;
		var pageNum = Math.ceil(countNum/perpageNum);
		console.log(pageNum)
		function changepage(n)
		{

			for(var i= n*perpageNum+1;i<=Math.min(perpageNum*(n+1),countNum);i++)
			{
				console.log(data[i])
				str += "<li><a href='detail.html?pvid="+ data[i].pvid +"'><img src='../"+ data[i].img +"'><p>"+ data[i].title +"</p></a><span>市场价格：<i>￥671元</i><em>促销价：￥<b>"+ data[i].price +"</b>元</em></span></li>";
			}
			$("#prodlist").html(str);
			str = "";
		}
		changepage(0);
		var i = 0;
		$(".per-page").click(function()
		{
					
			console.log(i)
			if(i == 0)
			{
				alert("已经是第一页了！")
			}
			else
			{
				i--;
				changepage(i);
			}
			
		})
		$(".next-page").click(function()
		{
			
			console.log(i)
			console.log(pageNum)
			if(i == pageNum-1)
			{
				alert("已经是最后一页了！")
			}
			else
			{
				i++;
				changepage(i);
			}
			
		})
	
	})
		





})