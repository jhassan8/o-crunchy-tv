var Display =
{
	timer_player : 0,
	timer_volume : 0,
	timer_clock : 0,
	totalTime : 0,
	playingTime : 0,
  index2: 1,
	clock: 0,
	nextState : false,
	timer: 60,
	timer_timer: null,
}

Display.init = function()
{
	var success = true;
    return success;
}

Display.limitext = function(texto)
{
	if(texto.length > 350)
		if(texto.indexOf(' ', 350) != -1)
			return (texto.substring(0,texto.indexOf(' ', 350)))+'...';
		else
			return texto;
	else
		return texto;
}

Display.setTotalTime = function(total)
{
  this.totalTime = total;
}

Display.startClock = function(){
	alert(Display.timer);
	Display.timer--;
	widgetAPI.putInnerHTML(document.getElementById("next_num"), Display.timer);
	Display.timer_timer = setTimeout('Display.startClock();', 1000);
	if(Display.timer == 0){
		Main.nextEpisode();
		Display.hideNextEpisode();
	}
}

Display.showNextEpisode = function(){
	Display.nextState = true;
	document.getElementById("next").style.display="block";
	document.getElementById("next_image").src= Data.getEpisodesImage(Main.selected_episode+1);
	widgetAPI.putInnerHTML(document.getElementById("next_image_div"), Data.getEpisodeNumber(Main.selected_episode+1));
	Display.startClock();
	alert("Show");
}

Display.hideNextEpisode = function(){
	document.getElementById("next").style.display="none";
	Display.nextState = false;
	Display.timer = 60;
	clearTimeout(Display.timer_timer);
	alert("Hide");
}

Display.verifyTime = function(h,m,s,th,tm,ts){
	if(Display.nextState == true)
		return false;
	else if(Data.getEpisodesID(Main.selected_episode+1) == 0)
		return false;
	if(th==0 && tm<10){
		if(ts < 30){
			tm = tm-1;
			ts = (ts+60)-30;
		}
		else
			ts = ts-30;
		Display.timer = 30;
	}
	else
		tm = tm-1;
	if(h == th && m == tm && s == ts)
		return true;
	else
		return false;
}

Display.setTime = function(time)
{
	this.playingTime = time;
	var timePercent = (100 * time) / this.totalTime;
	var totalTimeHour = Math.floor(this.totalTime/3600000);
	var timeHour = Math.floor(time/3600000);
	var totalTimeMinute = Math.floor((this.totalTime%3600000)/60000);
	var timeMinute = Math.floor((time%3600000)/60000);
	var totalTimeSecond = Math.floor((this.totalTime%60000)/1000);
	var timeSecond = Math.floor((time%60000)/1000);
	if(Display.verifyTime(timeHour,timeMinute,timeSecond,totalTimeHour,totalTimeMinute,totalTimeSecond))
		Display.showNextEpisode();
	if(Main.stateSubTest)
	   Main.showSubs(timeHour,timeMinute,timeSecond);
	var timeHTML = '';
	if(timeHour <10)
		timeHTML += /*"0" +*/ timeHour + ":";
	else
		timeHTML += timeHour + ":";
	if(timeMinute <10)
		timeHTML += "0" + timeMinute + ":";
	else
		timeHTML += timeMinute + ":";
	if(timeSecond <10)
		timeHTML += "0" + timeSecond + " / ";
	else
		timeHTML += timeSecond + " / ";
	if(totalTimeHour <10)
		timeHTML += "0" + totalTimeHour + ":";
	else
		timeHTML += totalTimeHour + ":";
	if(totalTimeMinute <10)
		timeHTML += "0" + totalTimeMinute + ":";
	else
		timeHTML += totalTimeMinute + ":";
	if(totalTimeSecond <10)
		timeHTML += "0" + totalTimeSecond;
	else
		timeHTML += totalTimeSecond;
	if(Main.state_FB != 1){
		widgetAPI.putInnerHTML(document.getElementById("timeInfo"), timeHTML);
		document.getElementById("playerprogresbar").style.width = timePercent + "%";
	}
	return;
}

Display.loadingstep2 = function()
{
  if (this.index2 < 10)
    document.getElementById("inicio_loading").src= Main.api_url+"Images/Inicio/loading_0" + this.index2 + ".png";
  else
    document.getElementById("inicio_loading").src= Main.api_url+"Images/Inicio/loading_" + this.index2 + ".png";
  this.index2 ++;
  if (this.index2 > 6)
    this.index2 = 1;
  if (Main.getLoad() == 1)
    setTimeout("Display.loadingstep2();", 200);
	else
		document.getElementById("inicio_loading").src= "";
}

Display.cleanItems = function(name)
{
	var c;
	if(name == 'video' || name == 's')
		c=7;
	else if(name == 'ep')
		c=4;
	for(var i=0; i<c; i++)
		document.getElementById(name+i).src= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
}

Display.showEpisodes = function(i)
{
	if(Main.selected_server == 'cr'){
		widgetAPI.putInnerHTML(document.getElementById("categoria"), Data.getSeasonsName(Main.selected_season));
		document.getElementById("episodes_div").style.display="none";
	}
	else if(Main.selected_server == 'af' || Main.selected_server == 'dr'){
		widgetAPI.putInnerHTML(document.getElementById("categoria"), Data.getSeriesName(Main.selected_serie));
		document.getElementById("episodes_div").style.display="block";
		if(Data.getEpisodeNumber(i-1) == '')
			document.getElementById("ep0_div").style.display="none";
		else
			document.getElementById("ep0_div").style.display="block";
		if(Data.getEpisodeNumber(i) == '')
			document.getElementById("ep1_div").style.display="none";
		else
			document.getElementById("ep1_div").style.display="block";
		if(Data.getEpisodeNumber(i+1) == '')
			document.getElementById("ep2_div").style.display="none";
		else
			document.getElementById("ep2_div").style.display="block";
		if(Data.getEpisodeNumber(i+2) == '')
			document.getElementById("ep3_div").style.display="none";
		else
			document.getElementById("ep3_div").style.display="block";
		widgetAPI.putInnerHTML(document.getElementById("ep0_div"), Data.getEpisodeNumber(i-1));
		widgetAPI.putInnerHTML(document.getElementById("ep1_div"), Data.getEpisodeNumber(i));
		widgetAPI.putInnerHTML(document.getElementById("ep2_div"), Data.getEpisodeNumber(i+1));
		widgetAPI.putInnerHTML(document.getElementById("ep3_div"), Data.getEpisodeNumber(i+2));

	}
	Display.hideLoading();
	Display.cleanItems('ep');
	var urlimg = Main.api_url+"Images/Inicio/null.png";
	document.getElementById("videos").style.display="none";
	document.getElementById("seasons").style.display="none";
	document.getElementById("episodes").style.display="block";
	widgetAPI.putInnerHTML(document.getElementById("nombre"), Data.getEpisodesName(i));
	widgetAPI.putInnerHTML(document.getElementById("descripcion"), Display.limitext(Data.getEpisodesDesc(i)));
	var cant = Data.getEpisodesCount();
	document.getElementById("ep0").src= Data.getEpisodesImage(i-1);
	document.getElementById("ep0").setAttribute("onerror", "this.src='" + Data.getEpisodesImage(i-1) + "';")
	document.getElementById("ep1").src= Data.getEpisodesImage(i);
	document.getElementById("ep1").setAttribute("onerror", "this.src='" + Data.getEpisodesImage(i) + "';")
	document.getElementById("ep2").src= Data.getEpisodesImage(i+1);
	document.getElementById("ep2").setAttribute("onerror", "this.src='" + Data.getEpisodesImage(i+1) + "';")
	document.getElementById("ep3").src= Data.getEpisodesImage(i+2);
	document.getElementById("ep3").setAttribute("onerror", "this.src='" + Data.getEpisodesImage(i+2) + "';")
	if(i==cant-1){
		document.getElementById("ep3").src= urlimg;
		document.getElementById("ep3").setAttribute("onerror", "this.src='" + urlimg + "';")
		document.getElementById("ep3").src= urlimg;
		document.getElementById("ep3").setAttribute("onerror", "this.src='" + urlimg + "';")
	}
	else if(i==cant-2)
		document.getElementById("ep3").src= urlimg;
		document.getElementById("ep3").setAttribute("onerror", "this.src='" + urlimg + "';")
	if(i == 0)
		document.getElementById("ep0").src= urlimg;
		document.getElementById("ep0").setAttribute("onerror", "this.src='" + urlimg + "';")
}

Display.showSeasons = function(i)
{
	widgetAPI.putInnerHTML(document.getElementById("categoria"), Data.getSeriesName(Main.selected_serie));
	Display.hideLoading();
	Display.cleanItems('s');
	document.getElementById("videos").style.display="none";
	document.getElementById("seasons").style.display="block";
	var cantitem = Data.getSeasonsCount();
    var urlimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
	widgetAPI.putInnerHTML(document.getElementById("nombre"), Data.getSeasonsName(i));
	widgetAPI.putInnerHTML(document.getElementById("descripcion"), Display.limitext(Data.getSeasonsDesc(i)));
	if (i == cantitem-1){
		document.getElementById("s7").src= urlimg;
		document.getElementById("s6").src= urlimg;
		document.getElementById("s5").src= urlimg;
		document.getElementById("s4").src= urlimg;
		document.getElementById("s3").src= urlimg;
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s0").src= Data.getSeasonsImage(i-2);
		document.getElementById("s-1").src= Data.getSeasonsImage(i-3);
	}
	else if (i == cantitem-2){
		document.getElementById("s7").src= urlimg;
		document.getElementById("s6").src= urlimg;
		document.getElementById("s5").src= urlimg;
		document.getElementById("s4").src= urlimg;
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s0").src= Data.getSeasonsImage(i-2);
		document.getElementById("s-1").src= Data.getSeasonsImage(i-3);
	}
	else if (i == cantitem-3){
		document.getElementById("s7").src= urlimg;
		document.getElementById("s6").src= urlimg;
		document.getElementById("s5").src= urlimg;
		document.getElementById("s4").src= Data.getSeasonsImage(i+2);
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s0").src= Data.getSeasonsImage(i-2);
		document.getElementById("s-1").src= Data.getSeasonsImage(i-3);
	}
	else if (i == cantitem-4){
		document.getElementById("s7").src= urlimg;
		document.getElementById("s6").src= urlimg;
		document.getElementById("s5").src= Data.getSeasonsImage(i+3);
		document.getElementById("s4").src= Data.getSeasonsImage(i+2);
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s0").src= Data.getSeasonsImage(i-2);
		document.getElementById("s-1").src= Data.getSeasonsImage(i-3);
	}
	else if (i == 0){
		document.getElementById("s-1").src= urlimg;
		document.getElementById("s0").src= urlimg;
		document.getElementById("s1").src= urlimg;
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s4").src= Data.getSeasonsImage(i+2);
		document.getElementById("s5").src= Data.getSeasonsImage(i+3);
		document.getElementById("s6").src= Data.getSeasonsImage(i+4);
		document.getElementById("s7").src= Data.getSeasonsImage(i+5);
	}
	else if (i == 1){
		document.getElementById("s-1").src= urlimg;
		document.getElementById("s0").src= urlimg;
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s4").src= Data.getSeasonsImage(i+2);
		document.getElementById("s5").src= Data.getSeasonsImage(i+3);
		document.getElementById("s6").src= Data.getSeasonsImage(i+4);
		document.getElementById("s7").src= Data.getSeasonsImage(i+5);
	}
	else if (i == 2){
		document.getElementById("s-1").src= urlimg;
		document.getElementById("s0").src= Data.getSeasonsImage(i-2);
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s4").src= Data.getSeasonsImage(i+2);
		document.getElementById("s5").src= Data.getSeasonsImage(i+3);
		document.getElementById("s6").src= Data.getSeasonsImage(i+4);
		document.getElementById("s7").src= Data.getSeasonsImage(i+5);
	}
	else{
		document.getElementById("s-1").src= Data.getSeasonsImage(i-3);
		document.getElementById("s0").src= Data.getSeasonsImage(i-2);
		document.getElementById("s1").src= Data.getSeasonsImage(i-1);
		document.getElementById("s2").src= Data.getSeasonsImage(i);
		document.getElementById("s3").src= Data.getSeasonsImage(i+1);
		document.getElementById("s4").src= Data.getSeasonsImage(i+2);
		document.getElementById("s5").src= Data.getSeasonsImage(i+3);
		document.getElementById("s6").src= Data.getSeasonsImage(i+4);
		document.getElementById("s7").src= Data.getSeasonsImage(i+5);
	}
}

Display.setNewVideo = function(i)
{
	if(Main.selected_server == 'cr'){
		if(Main.selected_category == 0)
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Animes');
		else if(Main.selected_category == 1)
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Dramas');
	}
	else if(Main.selected_server == 'af'){
		if(Main.typeDifix == 'pelicula')
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Peliculas (' + Data.getSeriesCount() + ')');
		else if(Main.typeDifix == 'ova')
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Ovas (' + Data.getSeriesCount() + ')');
		else if(Main.typeDifix == 'anime')
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Series (' + Data.getSeriesCount() + ')');
	}
	else if(Main.selected_server == 'dr'){
		if(Main.typeDifix == 'doramas')
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Doramas (' + Data.getSeriesCount() + ')');
		else if(Main.typeDifix == 'especiales')
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Especiales (' + Data.getSeriesCount() + ')');
		else if(Main.typeDifix == 'peliculas')
			widgetAPI.putInnerHTML(document.getElementById("categoria"), 'Peliculas (' + Data.getSeriesCount() + ')');
	}
	Display.hideLoading();
	Display.cleanItems('video');
	document.getElementById("videos").style.display="block";
	document.getElementById("seasons").style.display="none";
	document.getElementById("episodes").style.display="none";
	var cantitem = Data.getSeriesCount();
    var urlimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
	widgetAPI.putInnerHTML(document.getElementById("nombre"), Data.getSeriesName(i));
	widgetAPI.putInnerHTML(document.getElementById("descripcion"), Display.limitext(Data.getSeriesDesc(i)));
	if (i == 0){
		document.getElementById("video-1").src= urlimg;
		document.getElementById("video0").src= urlimg;
		document.getElementById("video1").src= urlimg;
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video4").src= Data.getSeriesImage(i+2);
		document.getElementById("video5").src= Data.getSeriesImage(i+3);
		document.getElementById("video6").src= Data.getSeriesImage(i+4);
		document.getElementById("video7").src= Data.getSeriesImage(i+5);
	}
	else if (i == 1){
		document.getElementById("video-1").src= urlimg;
		document.getElementById("video0").src= urlimg;
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video4").src= Data.getSeriesImage(i+2);
		document.getElementById("video5").src= Data.getSeriesImage(i+3);
		document.getElementById("video6").src= Data.getSeriesImage(i+4);
		document.getElementById("video7").src= Data.getSeriesImage(i+5);
	}
	else if (i == 2){
		document.getElementById("video-1").src= urlimg;
		document.getElementById("video0").src= Data.getSeriesImage(i-2);
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video4").src= Data.getSeriesImage(i+2);
		document.getElementById("video5").src= Data.getSeriesImage(i+3);
		document.getElementById("video6").src= Data.getSeriesImage(i+4);
		document.getElementById("video7").src= Data.getSeriesImage(i+5);
	}
	else if (i == cantitem-1){
		document.getElementById("video7").src= urlimg;
		document.getElementById("video6").src= urlimg;
		document.getElementById("video5").src= urlimg;
		document.getElementById("video4").src= urlimg;
		document.getElementById("video3").src= urlimg;
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video0").src= Data.getSeriesImage(i-2);
		document.getElementById("video-1").src= Data.getSeriesImage(i-3);
	}
	else if (i == cantitem-2){
		document.getElementById("video7").src= urlimg;
		document.getElementById("video6").src= urlimg;
		document.getElementById("video5").src= urlimg;
		document.getElementById("video4").src= urlimg;
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video0").src= Data.getSeriesImage(i-2);
		document.getElementById("video-1").src= Data.getSeriesImage(i-3);
	}
	else if (i == cantitem-3){
		document.getElementById("video7").src= urlimg;
		document.getElementById("video6").src= urlimg;
		document.getElementById("video5").src= urlimg;
		document.getElementById("video4").src= Data.getSeriesImage(i+2);
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video0").src= Data.getSeriesImage(i-2);
		document.getElementById("video-1").src= Data.getSeriesImage(i-3);
	}
	else if (i == cantitem-4){
		document.getElementById("video7").src= urlimg;
		document.getElementById("video6").src= urlimg;
		document.getElementById("video5").src= Data.getSeriesImage(i+3);
		document.getElementById("video4").src= Data.getSeriesImage(i+2);
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video0").src= Data.getSeriesImage(i-2);
		document.getElementById("video-1").src= Data.getSeriesImage(i-3);
	}
	else{
		document.getElementById("video-1").src= Data.getSeriesImage(i-3);
		document.getElementById("video0").src= Data.getSeriesImage(i-2);
		document.getElementById("video1").src= Data.getSeriesImage(i-1);
		document.getElementById("video2").src= Data.getSeriesImage(i);
		document.getElementById("video3").src= Data.getSeriesImage(i+1);
		document.getElementById("video4").src= Data.getSeriesImage(i+2);
		document.getElementById("video5").src= Data.getSeriesImage(i+3);
		document.getElementById("video6").src= Data.getSeriesImage(i+4);
		document.getElementById("video7").src= Data.getSeriesImage(i+5);
	}
}

Display.showLoading = function()
{
	document.getElementById("loading").style.display="block";
}

Display.hideLoading = function()
{
	document.getElementById("loading").style.display="none";
}

Display.showPlayer = function()
{
	document.getElementById("player").style.display="block";
	clearTimeout(Display.timer_player);
	Display.timer_player = setTimeout('Display.hidePlayer();', 4000);
}

Display.hidePlayer = function()
{
	document.getElementById("player").style.display="none";
}

Display.stopPlayer = function()
{
	document.getElementById("playerprogresbar").style.width = "0%";
	widgetAPI.putInnerHTML(document.getElementById("playertitle"), "");
	widgetAPI.putInnerHTML(document.getElementById("timeInfo"), "00:00:00 / 00:00:00");
	document.getElementById("player").style.display="none";
}

Display.changeMenu = function(menu)
{
	if(Main.selected_server == 'cr')
		widgetAPI.putInnerHTML(document.getElementById("item0"), "Popular");
	else if(Main.selected_server == 'af')
		widgetAPI.putInnerHTML(document.getElementById("item0"), "Alphabetical");
	else if(Main.selected_server == 'df')
		widgetAPI.putInnerHTML(document.getElementById("item0"), "Alphabetical");
	document.getElementById("episodes_div").style.display="none";
	Main.estado = 0;
	Display.cleanItems('video');
	Display.cleanItems('s');
	Display.cleanItems('ep');
	widgetAPI.putInnerHTML(document.getElementById("nombre"), '');
	widgetAPI.putInnerHTML(document.getElementById("descripcion"), '');
	for(var i=0; i<4; i++){
		if(i==menu){
			document.getElementById("item"+i).style.opacity = '1';
			document.getElementById("item"+i).style.backgroundImage= "url("+Main.api_url+"Images/Select.png)";
		}
		else{
			if(Main.selected_server == 'cr')
				document.getElementById("item"+i).style.opacity = '0.2';
			else if(Main.selected_server == 'af')
				document.getElementById("item"+i).style.opacity = '0';
			else if(Main.selected_server == 'df')
				document.getElementById("item"+i).style.opacity = '0';
			document.getElementById("item"+i).style.backgroundImage= "url(none)";
		}
	}
}

Display.showVolume = function()
{
	widgetAPI.putInnerHTML(document.getElementById("volumenumber"), Audio.getVolume());
	document.getElementById("volumebar2").style.height = Audio.getVolume() + "%";
	document.getElementById("volume").style.display="block";
	clearTimeout(Display.timer_volume);
	Display.timer_volume = setTimeout('Display.hideVolume();', 3000);
}

Display.hideVolume = function()
{
	document.getElementById("volume").style.display="none";
}

Display.showMenu = function(server, i)
{
	Main.estadoMenu = 1;
	document.getElementById("menu_menu").style.display="block";
}

Display.hideMenu = function()
{
	Main.estadoMenu = 0;
	document.getElementById("menu_menu").style.display="none";
}

Display.changeMenuMenu = function(server, menu)
{
	var t= '';
	if(server==0){
		if(menu==0)
			t='Servidor: Crunchyroll';
		else if(menu==1)
			t='Animes';
		else if(menu==2)
			t='Dramas';
		else if(menu==3)
			t=Display.changeQualityCR();
		document.getElementById("m0").style.backgroundImage= "url("+Main.api_url+"Images/listcr.png)";
		document.getElementById("m3").style.backgroundImage= "url("+Main.api_url+"Images/listconf.png)";
	}
	else if(server==1){
		if(menu==0)
			t='Servidor: AnimeFLV';
		else if(menu==1)
			t='Series';
		else if(menu==2)
			t='Ovas';
		else if(menu==3)
			t='Peliculas';
		document.getElementById("m0").style.backgroundImage= "url("+Main.api_url+"Images/listaf.png)";
		document.getElementById("m3").style.backgroundImage= "url("+Main.api_url+"Images/listlist.png)";
	}
	else if(server==2){
		if(menu==0)
			t='Servidor: Doramas(Test)';
		else if(menu==1)
			t='Doramas';
		else if(menu==2)
			t='Especiales';
		else if(menu==3)
			t='Peliculas';
		document.getElementById("m0").style.backgroundImage= "url("+Main.api_url+"Images/listdr.png)";
		document.getElementById("m3").style.backgroundImage= "url("+Main.api_url+"Images/listlist.png)";
	}
	for(var i=0; i<4; i++){
		if(i==menu){
			document.getElementById("m"+i).style.opacity = '1';
		}
		else{
			document.getElementById("m"+i).style.opacity = '0.2';
		}
	}
	widgetAPI.putInnerHTML(document.getElementById("mm_text"), t);
}

Display.showFB = function(i, type)
{
	Player.setIcon(type);
	Display.showPlayer();
	if(type == Player.FORWARD){
		var time = parseFloat(this.playingTime)+parseFloat(1000*i);
		var timePercent = (100 * time) / this.totalTime;
		if(timePercent >= 100){
			timePercent = 100;
			time = this.totalTime;
		}
	}
	else if(type == Player.REWIND){
		var time = parseFloat(this.playingTime)-parseFloat(1000*i);
		var timePercent = (100 * time) / this.totalTime;
		if(timePercent <= 0){
			timePercent = 0;
			time = 0;
		}
	}
	var totalTimeHour = Math.floor(this.totalTime/3600000);
	var timeHour = Math.floor(time/3600000);
	var totalTimeMinute = Math.floor((this.totalTime%3600000)/60000);
	var timeMinute = Math.floor((time%3600000)/60000);
	var totalTimeSecond = Math.floor((this.totalTime%60000)/1000);
	var timeSecond = Math.floor((time%60000)/1000);
	var timeHTML = '';
	if(timeHour <10)
		timeHTML += /*"0" +*/ timeHour + ":";
	else
		timeHTML += timeHour + ":";
	if(timeMinute <10)
		timeHTML += "0" + timeMinute + ":";
	else
		timeHTML += timeMinute + ":";
	if(timeSecond <10)
		timeHTML += "0" + timeSecond + " / ";
	else
		timeHTML += timeSecond + " / ";
	if(totalTimeHour <10)
		timeHTML += "0" + totalTimeHour + ":";
	else
		timeHTML += totalTimeHour + ":";
	if(totalTimeMinute <10)
		timeHTML += "0" + totalTimeMinute + ":";
	else
		timeHTML += totalTimeMinute + ":";
	if(totalTimeSecond <10)
		timeHTML += "0" + totalTimeSecond;
	else
		timeHTML += totalTimeSecond;
	document.getElementById("playerprogresbar").style.width = timePercent + "%";
	widgetAPI.putInnerHTML(document.getElementById("timeInfo"), timeHTML);
}

Display.changeQualityCR = function()
{
	widgetAPI.putInnerHTML(document.getElementById("mm_text"), 'Calidad: ' + Server.quality.charAt(0).toUpperCase() + Server.quality.slice(1));
	return 'Calidad: ' + Server.quality.charAt(0).toUpperCase() + Server.quality.slice(1);
}

Display.changeQualityDifix = function()
{
	widgetAPI.putInnerHTML(document.getElementById("mm_text"), 'Calidad: ' + Server.quality.charAt(0).toUpperCase() + Server.qualityDifix.slice(1));
	return 'Calidad: ' + Server.qualityDifix.charAt(0).toUpperCase() + Server.qualityDifix.slice(1);
}
