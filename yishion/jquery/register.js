// 注册界面===================================================================注册界面
$(function($)
{
	var flag1 = ""
	// 用户名验证==================用户名验证
	$("#username").blur(function()
	{
		if($.cookie("username") != undefined)
		{
			if($(this).val() == $.cookie("username"))
			{
				$(this).siblings("strong").html("*用户名已经存在，请重新注册。");
			}
			else
			{
						var re1=/^[0-9a-zA-Z]\w{3,15}/;
				if(re1.test($(this).val()))
				{
					$(this).siblings("strong").html("*可以注册");
					return flag1 = true;
				}
				else
				{
					$(this).siblings("strong").html(" *用户名长度不能少于 3 个字符。")
					return flag1 = false;
				}
			}
		}
		else
		{
				var re1=/^[0-9a-zA-Z]\w{3,15}/;
			if(re1.test($(this).val()))
			{
				$(this).siblings("strong").html("*可以注册");
				return flag1 = true;
			}
			else
			{
				$(this).siblings("strong").html(" *用户名长度不能少于 3 个字符。")
				return flag1 = false;
			}
		}
	})
	$("#username").focus(function()
	{
		$(this).siblings("strong").html("*");
	})
	var flag2 = "";
	// 邮箱验证================邮箱验证
	$("#email").blur(function()
	{
		var re2=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(re2.test($(this).val()))
		{
			$(this).siblings("strong").html("可以注册");
			return flag2 = true;
		}
		else
		{
			$(this).siblings("strong").html("*邮件地址不合法");
			return flag2 = false;
		}
	})
	$("#email").focus(function()
	{
		$(this).siblings("strong").html("*");
	})
	var flag4 = "";
	// 密码验证================密码验证
	$("#password1").blur(function()
	{
		var re2=/(.+){6,16}/;
		if(re2.test($(this).val()))
		{
			 //密码为八位及以上并且字母数字特殊字符三项都包括
			var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
			//密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
     		var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
     		if(strongRegex.test($(this).val()))
     		{
     			$(".strength").find("i").eq(0).css("border-bottom","3px solid #f00");
     			$(".strength").find("i").eq(1).css("border-bottom","3px solid orange");
     			$(".strength").find("i").eq(2).css("border-bottom","3px solid #0f0");
     		}
     		else if (mediumRegex.test($(this).val())) 
     		{
     			$(".strength").find("i").eq(0).css("border-bottom","3px solid #f00");
     			$(".strength").find("i").eq(1).css("border-bottom","3px solid orange");
     		}
     		else
     		{
     			$(".strength").find("i").eq(0).css("border-bottom","3px solid #f00");
     		}
			$(this).siblings("strong").html("可以注册");
			return flag4 = true;
		}
		else
		{
			$(this).siblings("strong").html("*登录密码不能少于 6 个字符。")
		}
	})
	$("#password1").focus(function()
	{
		$(this).siblings("strong").html("*");
	})
	var flag3 = "";
	// 密码确认================密码确认
	$("#password2").blur(function()
	{
		if($(this).val() == $("#password1").val()&&flag4)
		{
		
			$(this).siblings("strong").html("可以注册");
			return flag3 = true;
		}
		else
		{
			$(this).siblings("strong").html("*请确认密码是否一致。");
			return flag3 = false;
		}
	})
	$("#password2").focus(function()
	{
		$(this).siblings("strong").html("*");
	})






	$(".commit").submit(function()
	{
		if(flag1&&flag2&&flag3)
		{
			// 存cookie
			$.cookie("username",$("#username").val(),{expires:7,path:"/"});
			$.cookie("email",$("#email").val(),{expires:7,path:"/"});
			$.cookie("password",$("#password2").val(),{expires:7,path:"/"});	
		}
		return false;
	})

})
