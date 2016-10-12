// =====================真正的导航里的菜单

$(function()
{

	if($.cookie("UserName") != undefined)
	{
		$("<li><a href= 'html/cart.html' class='red'>"+ $.cookie("UserName") +"</a></li><li><a href='html/login.html' class='exit'>退出登录</a></li>").appendTo("#rightnav>ul");
		$(".exit").click(function()
		{
			window.location.href="html/login.html";
			$.removeCookie("UserName",{path:"/"})
		})
	}
	else 
	{
		$("<li><a href= 'html/login.html' class='red'>登录</a></li><li><a href='html/register.html'>注册</a></li>").appendTo("#rightnav>ul");
	}	



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


// ==================================================================第一个轮播图banner
	$.get("json/bannerbig.json",function(data)
	{
		//console.log(data);
		var data1 = data.bannerbig;
		//console.log(data1);
		$.each(data1,function(index,value)
		{
			//console.log(value);
			$("<li><a href='' style='background:url("+ value +") repeat center center'></a></li>").appendTo($("#banner-img"));
			$("<a>").appendTo($("#banner-nav"));
		})
		$("#banner-img li:first-child").clone().appendTo($("#banner-img"));
		var $li = $("#banner-img>li");
		var len = $li.length;
		var perWidth = $li.outerWidth();
		
		$("#banner-img").css("width",perWidth*len);
		$li.css("width",perWidth);
		$("#banner-nav a").eq(0).addClass("cur");
		var i= 0;
		var timer = setInterval(move,3000);
		function move()
		{
			i++;
			if(i == -1)
			{
				i = len - 2;
				$("#banner-img").css("margin-left",-perWidth*(len-1));
			}
			if(i == len-1)
			{
				$("#banner-nav a").eq(0).addClass("cur").siblings().removeClass();
			}
			if(i == len)
			{
				i = 1;
				$("#banner-img").css("margin-left",0);
			}
			$("#banner-img").stop().animate({"margin-left":-perWidth*i});
			$("#banner-nav a").eq(i).addClass("cur").siblings().removeClass();
		}
		$("#pre").click(function()
		{
			clearInterval(timer);
			move();
			timer = setInterval(move,3000);
		})
		$("#next").click(function()
		{
			clearInterval(timer);
			i = i-2;
			move();
			timer = setInterval(move,3000);
		})
		$("#banner-nav a").hover(function()
		{
			clearInterval(timer);
			i = $(this).index() - 1;
			move();

		},function()
		{
			timer = setInterval(move,3000);
		})
	
	














// ======================================================第二个轮播图ladyscroll
		var data2 = data.ladyscroll;
		//console.log(data2);
		$.each(data2,function(index,value)
		{
			//console.log(value);
			//console.log(index)
			$("<li><a href='' style='background:url("+ value +") no-repeat center center'></a></li>").appendTo($("#ladyscroll"));
			$("<a>"+ parseInt(index+1) + "</a>").appendTo($("#lady-nav"));
		})
		$("#ladyscroll li:first-child").clone().appendTo($("#ladyscroll"));
		var $li1 = $("#ladyscroll>li");
		//console.log($("#ladyscroll>li"))
		//console.log($li1)
		var len1 = $li1.length;
		//console.log(len1)
		var perHeight = $li1.outerHeight();
		//console.log($li1.outerHeight())
		
		$("#ladyscroll").css("width",perHeight*len1);
		$li1.css("height",perHeight);
		$("#lady-nav a").eq(0).addClass("cur");
		var s= 0;
		var timer = setInterval(move1,3000);
		function move1()
		{
			s++;
			if(s == -1)
			{
				s = len1 - 2;
				$("#ladyscroll").css("margin-top",-perHeight*(len1-1));
			}
			if(s == len1-1)
			{
				$("#lady-nav a").eq(0).addClass("cur").siblings().removeClass();
			}
			if(s == len1)
			{
				s = 1;
				$("#ladyscroll").css("margin-top",0);
			}
			$("#ladyscroll").stop().animate({"margin-top":-perHeight*s});
			$("#lady-nav a").eq(s).addClass("cur").siblings().removeClass();
		}
		$("#lady-nav a").hover(function()
		{
			clearInterval(timer);
			s = $(this).index() - 1;
			move1();

		},function()
		{
			timer = setInterval(move1,3000);
		})
	
	})

// 用json数据做样式，detail


















// productlist热销产品展示
	$.get("json/detail.json",function(data)
	{
		
		//console.log(data);
		var productlist = data.productlist;
		//console.log(productlist);
		$.each(productlist,function(index)
		{
			//console.log(index)
			$("<li><a href='#'><img src='" + productlist[index] + "' ></a></li>").appendTo("#productlist>ul");
		})



		// 女士专场ladylist2


		var ladylist = data.ladylist2;
		//console.log(ladylist)
		$.each(ladylist,function(obj,index)
		{
			//console.log(index.pvid)
			$("<li><a href='html/detail.html?pId="+ index.pvid +"'><img src='" + index.img + "'></a><p>"+ index.price +"</p><a href='detail.html'><p>"+ index.title +"</p><p class='red'>立即购买▶</p></a></li>").appendTo("#ladylist2>ul");
		})


		//ladyrright
		var ladyrright = data.ladyrright;
		//console.log(ladyrright);
		$.each(ladyrright,function(index)
		{
			$("<li><a href='#'><img src='" + ladyrright[index] + "' /></a></li>").appendTo("#ladyrright > ul");
			//console.log(ladyrright[index])
		})




		// 男士专场manlist2
		var manlist = data.manlist2;
		//console.log(manlist);
		$.each(manlist,function(obj,index)
		{
			$("<li><a href='html/detail.html?pId="+ index.pvid +"'><img src='" + index.img + "'></a><p><a href='detail.html'>" + index.title + "</a><span>" + index.price + "</span></p></li>").appendTo("#manlist2>ul");
		})

		var manrright = data.manrright;
		$.each(manrright,function(index)
		{
			$("<li><a href='#'><img src='" + manrright[index] + "' /></a></li>").appendTo("#manrright > ul");
		})



		// 可爱童装childlist2

		var childlist = data.childlist2;
		//console.log(childlist);
		$.each(childlist,function(obj,index)
		{
			$("<li><a href='html/detail.html?pId="+ index.pvid +"'><img src='"+ index.img +"'></a><p><span class='sl left'>原价<em>"+ index.price1 +"</em></span><span class='sr right'>热销价<strong>"+ index.price2 +"</strong></span></p></li>").appendTo("#childlist2>ul");
		})
		var childrright = data.childrright;
		$.each(childrright,function(index)
		{
			$("<li><a href='#'><img src='" + childrright[index] + "' /></a></li>").appendTo("#childrright > ul");
		})


		var yishion = data.yishion;
		$.each(yishion,function(index)
		{
			$("<a href='#'><img src='" + yishion[index] + "' /></a>").appendTo("#yishion");
		})






		// 配衬secondary2
		var secondary = data.secondary2;
		//console.log(secondary);
		$.each(secondary,function(obj,index)
		{
			$("<li><a href='html/detail.html?pId="+ index.pvid +"'><img src='"+ index.img +"'></a><p>"+ index.price +"</p><a href='detail.html'><p>"+ index.title +"</p><p class='red'>立即购买▶</p></a></li>").appendTo("#secondary2>ul");
		})

		var secondaryrright = data.secondaryrright;
		$.each(secondaryrright,function(index)
		{
			$("<li><a href='#'><img src='" + secondaryrright[index] + "' /></a></li>").appendTo("#secondaryrright > ul");
		})



		var newslist = data.newslist;
		$.each(newslist,function(index)
		{
			$("<li><a href='#'><img src='" + newslist[index] + "' /></a></li>").appendTo("#newslist");
		})

		var newslist1 = data.newslist1;
		$.each(newslist1,function(index)
		{
			$("<li><a href='#'><img src='" + newslist1[index] + "' /></a></li>").appendTo("#newslist1");
		})

	 })



	$(".seek").click(function()
	{
		$.get("json/detail.json",function(data)
		{
			var data5 = data.cookie1;
			var flag = true;
			if($(".w373").val() != "")
			{
				
				$.each(data5,function(obj,value)
				{
					if(flag)
					{
						console.log($(".w373").val(),value.title,value.pvid)
						console.log($(".w373").val() == value.title)
						if($(".w373").val() == value.title)
						{
							window.location.href="html/detail.html?pId="+value.pvid;
							flag = false;
						}
						else
						{
							window.location.href="html/seek.html";
							flag = true;
						}
					}
				})
			}
		})

	})



	

})
















	// =============================================================================================================================================================================================================搜索框联想
		window.onload= function()
		{
			var oTxt = document.getElementById('txt');
			oTxt.onkeyup = function() 
			{
				var val = this.value;
				var oScript = document.createElement('script');

				oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + val + "&cb=hhl"
				document.body.appendChild(oScript);
				document.body.removeChild(oScript);
			}
		}
			

		function hhl(data) 
		{
			var oList = document.getElementById('list-search');
			var html = ''
			if (data.s.length > 0)
			{
				for (var i = 0; i < data.s.length; i++)
			   {
					html += '<li><a href="https://www.baidu.com/s?wd=' + data.s[i] + '" target="_blank">' + data.s[i] + '</a></li>'
			    }
				oList.style.display = 'block';
				oList.innerHTML = html;
			}
			else
			{
				oList.style.display = 'none';
			}
		}
		









































