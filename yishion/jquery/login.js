$(function($)
{
	$(".commit").submit(function()
	{
		var userName = $("#user-name").val();
		var passWord = $("#pass-word").val();
		console.log($.cookie().username);
		console.log($.cookie().email);
		console.log($.cookie().password);

		if(userName == $.cookie().username && passWord == $.cookie().password)
		{
			$.cookie("UserName",$.cookie("username"),{expires:7,path:"/"});
			var Checked = $("#check-box").prop("checked");
			window.location.href = "../index.html";
		}
		return false;
	})

	var Checked =$.cookie().choice;
	if(Checked == "checked")
	{
		$("#check-box").prop("checked",true);
		console.log($.cookie().username)
		$("#user-name").val($.cookie("username"));
	}
	$("#check-box").click(function()
	{
		$.cookie("choice","checked",{expires:7,path:"/"});
	
	})

	
})