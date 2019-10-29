var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginAPI = new Common.API.Plugin();

var Master =
{
	state: false,
}

Master.onLoad = function()
{
	alert("cargo");
	window.onShow = function(){
		pluginAPI.registKey(tvKey.KEY_PANEL_MENU);
		pluginAPI.registKey(tvKey.KEY_MENU);
		pluginAPI.registKey(tvKey.KEY_TOOLS);
	}
	Master.enableKeys();
    if(typeof Main != 'undefined'){
		Master.state = true;
		Main.init();
	}
	else{
		Master.state = false;
		document.getElementById("error").style.display="block";
		widgetAPI.sendReadyEvent();
	}
}

Master.onUnload = function()
{
	if(Master.state)
		Main.onUnload();
}

Master.enableKeys = function()
{
    document.getElementById("anchor1").focus();
}

Master.keyDown = function()
{
	if(Master.state){
		Main.keyDown(event);
	}
	else{
		switch(event.keyCode){
			case tvKey.KEY_RETURN:
			case tvKey.KEY_PANEL_RETURN:
				widgetAPI.blockNavigation(event);
				widgetAPI.sendExitEvent();
			break;
			case tvKey.KEY_EXIT:
				widgetAPI.sendExitEvent();
			break;
		}
	}
}
