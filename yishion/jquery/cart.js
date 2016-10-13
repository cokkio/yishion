$(function($)
{
	if($.cookie("UserName") != undefined)
	{
		$("<li><a href= 'html/cart.html' class='red'>"+ $.cookie("UserName") +"</a></li><li><a href='login.html' class='exit'>退出登录</a></li>").appendTo("#rightnav>ul");
		
		$(".exit").click(function()
		{
			window.location.href="html/login.html";
			$.removeCookie("UserName",{path:"/"})
		})
	}
	else 
	{
		$("<li><a href= 'login.html' class='red'>登录</a></li><li><a href='register.html'>注册</a></li>").appendTo("#rightnav>ul");
		
	}	


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



	
	
	//================================================================================================================================================在购物车界面
	var str = "";
	var sum = 0;
	var prodCount=0;
	var nn = 0;
	if($.cookie("cart") != undefined)
	{
		$.get("../json/detail.json",function(data)
		{
		 	var data = data.cookie1;
		 	//console.log(data)
			//把字符串转换成对象的形式取出来
			var cookieObj = JSON.parse($.cookie("cart"));
			//console.log(cookieObj);	
			$.each(cookieObj,function(key,value)
			{
				//console.log(key,value);
				//console.log(data[key]);
				//console.log(value)
				//console.log(data[key].img)
				str += "<tr class='cell'><td colspan='5'><img src='../"+ data[key].img +"' /><span>"+ data[key].title +"</span></td><td>￥<span class='perprice'>"+ data[key].price +"</span>元</td><td><a href='##' class='plus'></a><em class='count'>"+ value +"</em><a href='##' class='cut'></a></td><td class='cred'>￥<b class='oneprice'>"+ data[key].price*value +"</b>元</td><td><a href='##' class='prodmove' data-id='"+ data[key].pvid +"'>删除</a></td></tr>";
				sum += data[key].price*value;
				prodCount += value;
				//console.log(prodCount)
				//console.log(sum);
				$("#total-price").html(sum);
				$(".prodmoney").html(sum);
			})
			//console.log(prodCount);
			//产品数量
			$("#price-box>span").html(prodCount);
			$("#chanpin").append(str);
			var num1 = 0;
			//console.log(num1);
			var money = 0;
			var money1 = 0;
			var Count1 = 0;
			var Count2 = 0;
			$(".plus").click(function()
			{
				num1 = $(this).siblings(".count").html();
				num1++;
				console.log(num1);
				$(this).siblings(".count").html(num1);
				$(this).parent().siblings().find("b").html(num1*$(this).parent().siblings().find(".perprice").html());
				//console.log($(this).parent().siblings().find(".perprice").html());
				//console.log(num1*money)
	//===================================================================================================================================================计算总金额
				$(".cell").each(function()
				{
					//console.log($(this).find(".oneprice").html());
					money +=parseInt( $(this).find(".oneprice").html());
					//console.log(money)
					//console.log($(this).find(".count").html());
					Count1 +=parseInt( $(this).find(".count").html());
					//console.log(Count1)
				})
		
				money1 = money;
				money = 0;
				Count2 = Count1;
				Count1 = 0;
				//console.log(money1)
				$("#total-price").html(money1);
				$("#price-box>span").html(Count2);
				$(".prodmoney").html(money1);
			});
			$(".cut").click(function()
			{
				num1 = $(this).siblings(".count").html();
				if(num1 == 0)
				{
					num1 == 0;
				}
				else
				{
					num1--;
					console.log(num1)
					$(this).siblings(".count").html(num1);
					$(this).parent().siblings().find("b").html(num1*$(this).parent().siblings().find(".perprice").html());
					$(".cell").each(function()
					{
						//console.log($(this).find(".oneprice").html());
						money +=parseInt( $(this).find(".oneprice").html());
						//console.log(money)
						Count1 +=parseInt( $(this).find(".count").html());
					})
					
					money1 = money;
					money = 0;
					//console.log(money1);
					Count2 = Count1;
					Count1 = 0;
					$("#total-price").html(money1);
					$("#price-box>span").html(Count2);
					$(".prodmoney").html(money1);
				}		
			})
			//删除商品
			$(".prodmove").click(function()
			{
				var index = $(this).attr("data-id");
				delete cookieObj[index];
				//console.log(cookieObj)
				var objStr = JSON.stringify(cookieObj);
				$.cookie("cart",objStr,{expires:7,path:"/"});
				//console.log($.cookie("cart"));
				var ToObj = JSON.parse(objStr);
				//console.log($.cookie("cart"));
				$(this).parent().parent(".cell").remove();
				var TotalPrice = 0;
				var count_num = 0;
				$.each(ToObj,function(key,value)
				{
					console.log(key,value);
					console.log(data[key])
					count_num +=value;
					console.log(count_num)
					TotalPrice +=value*data[key].price;
				})
				$("#total-price").html(TotalPrice);
				$("#price-box>span").html(count_num);
				$(".prodmoney").html(TotalPrice);
			})
			
	
		})
	
	}



	$(".settle-btn").click(function()
	{
		$("#settlebox").css("display","block");
		$("#settle").css("display","block");
		
	})


	if($.cookie("UserName") != undefined)
	{
		 $("<span class='produser'>用户："+ $.cookie("UserName") +"</span>").appendTo(".product-user");
		 $(".w200").click(function()
		{
			var relCheck = false;
			$("#settle").find("input").each(function()
			{
				if($("#settle").find("input:checked").val() == "on")
				{
					relCheck = true;
				}
			});
			if (!relCheck) 
			{
				alert("请您选择付款方式。")
			}
			else
			{
				alert("您的订单已提交。");
			}	
				
		})
	}
	else
	{
		$("<span class='produser'>您还未登录 <a href='login.html'>请登录,</a><a href='register.html'>或注册</a></span>").appendTo(".product-user");

	}


	$("#settle>h3>span").click(function()
	{
		$("#settlebox").css("display","none");
		$("#settle").css("display","none");
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






	







