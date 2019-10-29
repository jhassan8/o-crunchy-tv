var Main =
{
	api_url : 'https://difix.herokuapp.com/dataBack/DifixAnime/',
	selected_category : 0,
	selected_menu : 0,
	selected_menu_count : 3,
	selected_serie : 0,
	selected_season : 0,
	selected_episode : 0,
	selected_server : 'cr',
	typeDifix: null,
    load: 1,
	estado : 0,
    device : null,
    devicetype : null,
    EMULATOR : "LNXXB650_KOR",
	estadoMenu: 0,
	menu_selected: 0,
	server_selected: 0,
	timer_FB: null,
	value_FB: 0,
	timer_NE : null,
	n: false,
	debugFlag : false,
	debugInsert : '',
	debugFile : [],
	debugFileSelect : 0,
	debugVisible: false,
	//TODO: subtitles
	subsTest: null,
	stateSubTest: false,
}

Main.crearElemento2 = function(id, tipo, style, join, texto)
{
	var element = document.createElement(tipo);
	element.setAttribute("id",id);
	if(texto != '')
		element.innerHTML = texto;
	if(style != '')
		element.className = style;
	if(join == 'body')
		document.body.appendChild(element);
	else
		document.getElementById(join).appendChild(element);
}

Main.createIndex = function()
{
	Main.crearElemento2('menu', 'div', '', 'body', '');
		Main.crearElemento2('icono', 'div', '', 'menu', '');
		Main.crearElemento2('categoria', 'div', '', 'menu', 'Animes');
		Main.crearElemento2('nombre', 'div', '', 'menu', '');
		Main.crearElemento2('descripcion', 'div', '', 'menu', '');
		Main.crearElemento2('videos', 'div', '', 'menu', '');
			Main.crearElemento2('video-1', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video0', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video1', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video2', 'img', '', 'videos', '');
			Main.crearElemento2('video3', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video4', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video5', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video6', 'img', 'style_poster', 'videos', '');
			Main.crearElemento2('video7', 'img', 'style_poster', 'videos', '');
		Main.crearElemento2('seasons', 'div', '', 'menu', '');
			Main.crearElemento2('s-1', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s0', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s1', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s2', 'img', '', 'seasons', '');
			Main.crearElemento2('s3', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s4', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s5', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s6', 'img', 'style_poster', 'seasons', '');
			Main.crearElemento2('s7', 'img', 'style_poster', 'seasons', '');
		Main.crearElemento2('episodes', 'div', '', 'menu', '');
			Main.crearElemento2('ep0', 'img', 'style_episodes', 'episodes', '');
			Main.crearElemento2('ep1', 'img', '', 'episodes', '');
			Main.crearElemento2('ep2', 'img', 'style_episodes', 'episodes', '');
			Main.crearElemento2('ep3', 'img', 'style_episodes', 'episodes', '');
		Main.crearElemento2('episodes_div', 'div', '', 'menu', '');
			Main.crearElemento2('ep0_div', 'div', 'style_episodes_div', 'episodes_div', 'asdasd');
			Main.crearElemento2('ep1_div', 'div', '', 'episodes_div', 'asdasd');
			Main.crearElemento2('ep2_div', 'div', 'style_episodes_div', 'episodes_div', 'asdasd');
			Main.crearElemento2('ep3_div', 'div', 'style_episodes_div', 'episodes_div', 'asdasd');
		//---------------------
		Main.crearElemento2('barra', 'div', '', 'menu', '');
			Main.crearElemento2('barralogo', 'div', '', 'barra', '');
				Main.crearElemento2('barralogoimage', 'div', '', 'barralogo', '');
			Main.crearElemento2('item0', 'div', 'style_item', 'barra', 'Popular');
			Main.crearElemento2('item1', 'div', 'style_item', 'barra', 'Simulcast');
			Main.crearElemento2('item2', 'div', 'style_item', 'barra', 'Updated');
			Main.crearElemento2('item3', 'div', 'style_item', 'barra', 'Alphabetical');
		Main.crearElemento2('b1', 'div', 'style_b', 'menu', 'Menu');
		Main.crearElemento2('b2', 'div', 'style_b', 'menu', 'Exit');
		Main.crearElemento2('b3', 'div', 'style_b', 'menu', '10%');
		Main.crearElemento2('menu_menu', 'div', '', 'menu', '');
			Main.crearElemento2('mm_back', 'div', '', 'menu_menu', '');
			Main.crearElemento2('m0', 'div', 'style_mm', 'menu_menu', '');
			Main.crearElemento2('m1', 'div', 'style_mm', 'menu_menu', '');
			Main.crearElemento2('m2', 'div', 'style_mm', 'menu_menu', '');
			Main.crearElemento2('m3', 'div', 'style_mm', 'menu_menu', '');
			Main.crearElemento2('mm_text', 'div', '', 'menu_menu', 'Series');
	Main.crearElemento2('loading', 'div', '', 'body', '');
		Main.crearElemento2('loading_text', 'div', '', 'loading', 'Loading...');
	Main.crearElemento2('playerMain', 'div', '', 'body', '');
		Main.crearElemento2('player', 'div', '', 'playerMain', '');
			Main.crearElemento2('playerback', 'div', '', 'player', '');
			Main.crearElemento2('playericon', 'div', '', 'player', '');
			Main.crearElemento2('playertitle', 'div', '', 'player', '');
			Main.crearElemento2('playertimebar', 'div', '', 'player', '');
				Main.crearElemento2('playerprogresbar', 'div', '', 'playertimebar', '');
			Main.crearElemento2('timeInfo', 'div', '', 'player', '00:00:00 / 00:00:00');
		Main.crearElemento2('volume', 'div', '', 'playerMain', '');
			Main.crearElemento2('volumeback', 'div', '', 'volume', '');
			Main.crearElemento2('volumeicon', 'div', '', 'volume', '');
			Main.crearElemento2('volumebar', 'div', '', 'volume', '');
				Main.crearElemento2('volumebar2', 'div', '', 'volumebar', '');
			Main.crearElemento2('volumenumber', 'div', '', 'volume', '');
		Main.crearElemento2('subtitle', 'div', '', 'playerMain', '');
		Main.crearElemento2('next', 'div', '', 'playerMain', '');
			Main.crearElemento2('next_image', 'img', '', 'next', '');
			Main.crearElemento2('next_image_div', 'div', '', 'next', '');
			Main.crearElemento2('next_text', 'div', '', 'next', 'Next episode in:');
			Main.crearElemento2('next_num', 'div', '', 'next', '');
	Main.crearElemento2('inicio', 'div', '', 'body', '');
		Main.crearElemento2('inicio_logo', 'div', '', 'inicio', '');
		Main.crearElemento2('inicio_logo2', 'div', '', 'inicio', '');
		Main.crearElemento2('inicio_loading', 'img', '', 'inicio', '');
}

Main.init = function()
{
	Main.createIndex();
    if ( Player.initialize() && Audio.init() && Display.init() && Server.init() )
    {
			//Server.setCookie();
		Main.serverActualizar();
		Display.loadingstep2();
		Display.showVolume();
		Display.hideVolume();
        this.enableKeys();
        widgetAPI.sendReadyEvent();
        var TVPlugin = document.getElementById("pluginObjectTV");
		var MACPlugin = document.getElementById("pluginNetwork");
		alert("MAC: " + MACPlugin.GetMAC());
        this.devicetype = TVPlugin.GetProductType();
        alert("Your Device is : "+ this.devicetype);
        var nnavi = document.getElementById("pluginObjectNNavi");
        this.device = nnavi.GetModelCode();
        alert(this.device);
		var FontpanelPlugin = document.getElementById("pluginObjectFontpanel");
		alert("XXXXXXXXXXXXXXXXXXXX"+FontpanelPlugin);
		var test = FontpanelPlugin.DisplayVFD_Show(0100);
		alert("WWWWWWWWWWWWWWWWWWWW"+test);
	}
	else
    {
        alert("Failed to initialise");
    }
}

Main.serverActualizar = function()
{
	Display.changeMenu(Main.selected_menu);
	var f = Main.parceFilter(Main.selected_menu);
	var c = Main.parceCategory(Main.selected_category);
	Data.callback_series = function()
    {
		Main.hideInicio();
		Display.setNewVideo(0);
		Display.changeMenuMenu(Main.server_selected, Main.menu_selected);
    }
    Server.apiLogin(c,f);
}

Main.onUnload = function()
{
    Player.deinitialize();
}

Main.enableKeys = function()
{
    document.getElementById("anchor1").focus();
}

Main.keyDown = function(event)
{
	var keyCode = event.keyCode;
    switch(keyCode)
    {
		case tvKey.KEY_PANEL_MENU:
        case tvKey.KEY_MENU:
			Main.eventMenu();
        break;
		case tvKey.KEY_0:
        case tvKey.KEY_TOOLS:
			Main.eventMenu();
        break;
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
			Main.eventReturn();
		break;
		break;
        case tvKey.KEY_PLAY:
			if(Main.estado == 3)
				Main.handlePlayKey();
		break;
        case tvKey.KEY_STOP:
			if(Main.estado == 3)
				Main.endVideo('stop');
		break;
        case tvKey.KEY_PAUSE:
			if (Main.estado == 3)
				this.handlePauseKey();
		break;
		case tvKey.KEY_VOL_UP:
        case tvKey.KEY_PANEL_VOL_UP:
			Main.eventVolUp();
        break;
        case tvKey.KEY_VOL_DOWN:
        case tvKey.KEY_PANEL_VOL_DOWN:
			Main.eventVolDown();
		break;
		case tvKey.KEY_UP:
			Main.eventUp();
        break;
		case tvKey.KEY_DOWN:
			Main.eventDown();
        break;
        case tvKey.KEY_RIGHT:
			Main.eventRight();
		break;
		case tvKey.KEY_LEFT:
			Main.eventLeft();
        break;
		case tvKey.KEY_FF:
			Main.eventFF();
		break;
        case tvKey.KEY_RW:
			Main.eventRW();
        break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
			Main.eventEnter();
		break;
		case tvKey.KEY_EXIT:
			Player.deinitialize();
		break;
        case tvKey.KEY_MUTE:
			Main.eventMute();
		break;
		case tvKey.KEY_CONTENT:
			widgetAPI.blockNavigation(event);
		break;
		case tvKey.KEY_INFO:
			Main.eventInfo();
		break;
    }
}

Main.getLoad= function ()
{
	return this.load;
}

Main.hideInicio= function ()
{
	document.getElementById("inicio").style.display="none";
	document.getElementById("menu").style.display="block";
	this.load = 0;
}

Main.parceFilter = function(i)
{
	if(i==0)
		return 'popular';
	else if(i==1)
		return 'simulcast';
	else if(i==2)
		return 'updated';
	else if(i==3)
		return 'alpha';
}

Main.parceCategory = function(i)
{
	if(i==0)
		return 'anime';
	else if(i==1)
		return 'drama';
}

Main.changeCategory = function()
{
	if(Main.selected_category == 0)
		Main.selected_category = 1;
	else
		Main.selected_category = 0;
	Main.estado = 0;
	Main.selected_menu = 0;
	Main.selected_season = 0;
	Main.selected_episode = 0;
	var c = Main.parceCategory(Main.selected_category);
	var f = Main.parceFilter(Main.selected_menu);
	Display.showLoading();
	Display.changeMenu(Main.selected_menu);
	Data.callback_series = function()
	{
		Display.setNewVideo(Main.selected_serie);
	}
	Server.loadSeries(c,f);
}

Main.changeFilter = function(i)
{
	var c = Main.parceCategory(Main.selected_category);
	var f = Main.parceFilter(i);
	Display.showLoading();
	Data.callback_series = function()
	{
		Display.setNewVideo(Main.selected_serie);
	}
	Server.loadSeries(c,f);
}

Main.eventVolUp = function()
{
	if(Audio.getMute() == true)
		Audio.setMute(false);
	Audio.setRelativeVolume(0);
	Display.showVolume();
}

Main.eventVolDown = function()
{
	if(Audio.getMute() == true)
		Audio.setMute(false);
	Audio.setRelativeVolume(1);
	Display.showVolume();
}

Main.eventMute = function()
{
	if(this.device == this.EMULATOR)
		Audio.setMute(Audio.getMute());
	else if(this.devicetype == this.TV)
		Audio.setMute(!Audio.getMute());
	else
		alert("Audio Plugin does not work with this device");
}

Main.eventUp = function()
{
	if(Main.estado < 3)
	{
		if(Main.selected_menu != 0)
		{
			Main.selected_menu--;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.estado = 0;
			Display.changeMenu(Main.selected_menu);
			Main.changeFilter(Main.selected_menu);
		}
	}
}

Main.eventDown = function()
{
	if(Main.estado < 3)
	{
		if(Main.selected_menu < Main.selected_menu_count)
		{
			Main.selected_menu++;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.estado = 0;
			Display.changeMenu(Main.selected_menu);
			Main.changeFilter(Main.selected_menu);
		}
	}
}

Main.eventInfo = function()
{
	if (this.estado == 3)
		Display.showPlayer();
}

Main.eventReturn = function()
{
	widgetAPI.blockNavigation(event);
	if(Main.estadoMenu == 1 && Main.estado !=3){
		Display.hideMenu();
	}
	else{
		if(Main.estado == 1){
			Main.estado = 0;
			Main.selected_season = 0;
			Display.setNewVideo(Main.selected_serie);
			document.getElementById("seasons").style.display="none";
			document.getElementById("videos").style.display="block";
		}
		else if(Main.estado == 2){
			if(Main.selected_server == 'cr'){
				if(Data.getSeasonsCount() > 1){
					Main.estado = 1;
					Main.selected_episode = 0;
					Display.showSeasons(Main.selected_season);
					document.getElementById("episodes").style.display="none";
					document.getElementById("seasons").style.display="block";
				}
				else{
					Main.estado = 0;
					Main.selected_season = 0;
					Main.selected_episode = 0;
					Display.setNewVideo(Main.selected_serie);
					document.getElementById("episodes").style.display="none";
					document.getElementById("videos").style.display="block";
				}
			}
			else if(Main.selected_server == 'af' || Main.selected_server == 'dr'){
				Main.estado = 0;
				Main.selected_season = 0;
				Main.selected_episode = 0;
				Display.setNewVideo(Main.selected_serie);
				document.getElementById("episodes").style.display="none";
				document.getElementById("videos").style.display="block";
				document.getElementById("episodes_div").style.display="none";
			}
		}
		else if(Main.estado == 3){
			if(Display.nextState == true)
				Display.hideNextEpisode();
			else
				Main.endVideo('return');
		}
	}
}

Main.eventRight = function()
{
	if(Main.estadoMenu == 1)
	{
		if(Main.menu_selected < 3)
		{
			Main.menu_selected++;
			Display.changeMenuMenu(Main.server_selected, Main.menu_selected);
		}
	}
	else
	{
		if(Main.estado == 0){
			if(Main.selected_serie < Data.getSeriesCount()-1){
				Main.selected_serie++;
				Display.setNewVideo(Main.selected_serie);
			}
		}
		else if(Main.estado == 1){
			if(Main.selected_season < Data.getSeasonsCount()-1){
				Main.selected_season++;
				Display.showSeasons(Main.selected_season);
			}
		}
		else if(Main.estado == 2){
			if(Main.selected_episode < Data.getEpisodesCount()-1){
				Main.selected_episode++;
				Display.showEpisodes(Main.selected_episode);
			}
		}
	}
}

Main.eventLeft = function()
{
	if(Main.estadoMenu == 1)
	{
		if(Main.menu_selected != 0)
		{
			Main.menu_selected--;
			Display.changeMenuMenu(Main.server_selected, Main.menu_selected);
		}
	}
	else
	{
		if(Main.estado == 0){
			if(Main.selected_serie > 0){
				Main.selected_serie--;
				Display.setNewVideo(Main.selected_serie);
			}
		}
		else if(Main.estado == 1){
			if(Main.selected_season > 0){
				Main.selected_season--;
				Display.showSeasons(Main.selected_season);
			}
		}
		else if(Main.estado == 2){
			if(Main.selected_episode > 0){
				Main.selected_episode--;
				Display.showEpisodes(Main.selected_episode);
			}
		}
	}
}

Main.eventFF = function()
{
	if(Main.estado == 0){
		var Range = Math.round((Data.getSeriesCount()-1) * 0.1);
		if(Main.selected_serie < Data.getSeriesCount()-Range){
			Main.selected_serie = Main.selected_serie + Range;
			Display.setNewVideo(Main.selected_serie);
		}
		else{
			Main.selected_serie = Data.getSeriesCount()-1;
			Display.setNewVideo(Main.selected_serie);
		}
	}
	else if(Main.estado == 3)
		Main.FB(Player.FORWARD);
}

Main.eventRW = function()
{
	if(Main.estado == 0)
	{
		var Range = Math.round((Data.getSeriesCount()-1) * 0.1);
		if(Main.selected_serie > Range){
			Main.selected_serie = Main.selected_serie - Range;
			Display.setNewVideo(Main.selected_serie);
		}
		else{
			Main.selected_serie = 0;
			Display.setNewVideo(Main.selected_serie);
		}
	}
	else if(Main.estado == 3)
		Main.FB(Player.REWIND);
}


Main.eventEnter = function()
{
	if(Main.estadoMenu == 1 && Main.estado !=3){
		Main.enterMenu();
	}
	else{
		if(Main.estado == 0){
			if(Main.selected_server == 'cr')
				Main.showSeasons(Main.selected_serie);
			else if(Main.selected_server == 'af'){
				Display.showLoading();
				Main.estado = 2;
				Data.callback_episodes = function()
				{
					Display.showEpisodes(0);
				}
				Server.loadEpisodesDifix(Main.selected_serie);
			}
			else if(Main.selected_server == 'dr'){
				Display.showLoading();
				Main.estado = 2;
				Data.callback_episodes = function()
				{
					Display.showEpisodes(0);
				}
				Server.loadEpisodesDifix2(Main.selected_serie);
			}
			else{
				Display.showLoading();
				Main.estado = 2;
				Data.callback_episodes = function()
				{
					Display.showEpisodes(0);
				}
				Server.loadEpisodesDifix2(Main.selected_serie);
			}
		}
		else if(Main.estado == 1){
			Main.estado = 2;
			Main.showEpisodes(Main.selected_season);
		}
		else if(this.estado == 2)
		{
			if(Main.selected_server == 'cr'){
				if(Data.getEpisodesID(Main.selected_episode) != 0){
					Main.estado = 3;
					Main.playVideo(Main.selected_episode);
				}
			}
			else if(Main.selected_server == 'af'){
				Main.playVideo(Main.selected_episode);
				Main.estado = 3;
			}
			else if(Main.selected_server == 'dr'){
				Main.playVideo(Main.selected_episode);
				Main.estado = 3;
			}
		}
	}
}

Main.enterMenu = function()
{
	if(Main.menu_selected == 0){
		if(Main.server_selected==0)
			Main.server_selected = 1;
		// else if(Main.server_selected==1)
		// 	Main.server_selected = 2;
		else
			Main.server_selected = 0;
		Display.changeMenuMenu(Main.server_selected, Main.menu_selected);
	}
	else if(Main.menu_selected == 1){
		if(Main.server_selected == 0){
			Main.selected_server = 'cr';
			Main.selected_category = 0;
			Main.selected_menu = 0;
			Main.selected_menu_count = 3;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Display.changeMenu(Main.selected_menu);
			Main.changeFilter(Main.selected_menu);
			Display.hideMenu();
		}
		else if(Main.server_selected == 1){
			Main.selected_server = 'af';
			Main.selected_menu = 0;
			Main.selected_menu_count = 0;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.typeDifix = 'anime';
			Display.changeMenu(Main.selected_menu);
			Display.showLoading();
			Data.callback_series = function()
			{
				Display.setNewVideo(Main.selected_serie);
			}
			Server.loadSeriesDifix('tv');
			Display.hideMenu();
		}
		else{
			Main.selected_server = 'dr';
			Main.selected_menu = 0;
			Main.selected_menu_count = 0;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.typeDifix = 'doramas';
			Display.changeMenu(Main.selected_menu);
			Display.showLoading();
			Data.callback_series = function()
			{
				Display.setNewVideo(Main.selected_serie);
			}
			Server.loadSeriesDifix2(Main.typeDifix);
			Display.hideMenu();
		}
	}
	else if(Main.menu_selected == 2){
		if(Main.server_selected == 0){
			Main.selected_server = 'cr';
			Main.selected_category = 1;
			Main.selected_menu = 0;
			Main.selected_menu_count = 3;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Display.changeMenu(Main.selected_menu);
			Main.changeFilter(Main.selected_menu);
			Display.hideMenu();
		}
		else if(Main.server_selected == 1){
			Main.selected_server = 'af';
			Main.selected_menu = 0;
			Main.selected_menu_count = 0;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.typeDifix = 'ova';
			Display.changeMenu(Main.selected_menu);
			Display.showLoading();
			Data.callback_series = function()
			{
				Display.setNewVideo(Main.selected_serie);
			}
			Server.loadSeriesDifix('ova');
			Display.hideMenu();
		}
		else{
			Main.selected_server = 'dr';
			Main.selected_menu = 0;
			Main.selected_menu_count = 0;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.typeDifix = 'especiales';
			Display.changeMenu(Main.selected_menu);
			Display.showLoading();
			Data.callback_series = function()
			{
				Display.setNewVideo(Main.selected_serie);
			}
			Server.loadSeriesDifix2(Main.typeDifix);
			Display.hideMenu();
		}
	}
	else if(Main.menu_selected == 3){
		if(Main.server_selected == 0){
			Main.changeQualityCR();
		}
		else if(Main.server_selected == 1){
			Main.selected_server = 'af';
			Main.selected_menu = 0;
			Main.selected_menu_count = 0;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.typeDifix = 'pelicula';
			Display.changeMenu(Main.selected_menu);
			Display.showLoading();
			Data.callback_series = function()
			{
				Display.setNewVideo(Main.selected_serie);
			}
			Server.loadSeriesDifix('movie');
			Display.hideMenu();
		}
		else{
			Main.selected_server = 'dr';
			Main.selected_menu = 0;
			Main.selected_menu_count = 0;
			Main.selected_serie = 0;
			Main.selected_season = 0;
			Main.selected_episode = 0;
			Main.typeDifix = 'peliculas';
			Display.changeMenu(Main.selected_menu);
			Display.showLoading();
			Data.callback_series = function()
			{
				Display.setNewVideo(Main.selected_serie);
			}
			Server.loadSeriesDifix2(Main.typeDifix);
			Display.hideMenu();
		}
	}
}

Main.showSeasons = function(i)
{
	Display.showLoading();
	Data.callback_seasons = function()
	{
		if(Data.getSeasonsCount() > 1){
			Main.estado = 1;
			Display.showSeasons(0);
			return;
		}
		else{
			Main.estado = 2;
			Main.showEpisodes(0);
			return;
		}
	}
	Server.loadSeasons(i);
}

Main.showEpisodes = function(i)
{
	Display.showLoading();
	Data.callback_episodes = function()
	{
		Display.showEpisodes(0);
		return;
	}
	Server.loadEpisodes(i);
}

Main.getsMain = function(i)
{
	switch(i)
	{
		case 'selected_episode':
			return Main.selected_episode;
		break;
		case 'selected_serie':
			return Main.selected_serie;
		break;
		case 'selected_season':
			return Main.selected_season;
		break;
	}
}

Main.playVideo = function(i)
{
	document.getElementById("menu").style.display="none";
	document.getElementById("playerMain").style.display="block";
	widgetAPI.putInnerHTML(document.getElementById("playertitle"), Data.getEpisodesName(i));
	Display.showLoading();
	Display.showPlayer();
	if(Main.selected_server == 'cr')
		Server.playVideo(i);
	else if(Main.selected_server == 'af')
		Server.playVideoDifix(i);
	else if(Main.selected_server == 'dr')
		Server.playVideoDifix2(i);
}

Main.handlePauseKey = function()
{
    switch(Player.getState())
    {
        case Player.PLAYING:
			Display.showPlayer();
			Player.setIcon(2);
            Player.pauseVideo();
		break;
        default:
		break;
    }
}

Main.handlePlayKey = function()
{
    switch(Player.getState())
    {
        case Player.STOPPED:
            Player.playVideo();
		break;
        case Player.PAUSED:
            Player.resumeVideo();
		break;
        default:
		break;
    }
}

Main.eventMenu = function()
{
	alert("asdasd");
	if(Main.estadoMenu == 0)
		Display.showMenu();
	else
		Display.hideMenu();
}

Main.endVideo = function(a)
{
	Main.estado = 2;
	Display.hideLoading();
	Display.stopPlayer();
	Player.stopVideo();
	document.getElementById("playerMain").style.display="none";
	document.getElementById("subtitle").style.display="none";
	document.getElementById("menu").style.display="block";
	Display.showEpisodes(Main.selected_episode);
	Player.buff = 0;
}

Main.FB = function(type)
{
	Main.state_FB = 1;
	Main.value_FB = Main.value_FB + (Display.totalTime*0.03)/1000;
	alert(Main.value_FB);
	Display.showFB(Main.value_FB, type);
	clearTimeout(Main.timer_FB);
	if(type == Player.REWIND)
		Main.timer_FB = setTimeout('Main.FBsend(4);', 3000);
	else if(type == Player.FORWARD)
		Main.timer_FB = setTimeout('Main.FBsend(3);', 3000);
}

Main.FBsend = function(type)
{
	if(type == Player.FORWARD){
		if((Display.playingTime/1000) + Main.value_FB < (Display.totalTime/1000)-120)
			Player.skipForwardVideo(Main.value_FB);
	}
	else if(type == Player.REWIND){
		if((Display.playingTime/1000) - Main.value_FB <= 0)
			Player.skipBackwardVideo(Display.playingTime/1000);
		else
			Player.skipBackwardVideo(Main.value_FB);
	}
	Main.value_FB = 0;
	Main.state_FB = 0;
}

Main.changeQualityDifix = function()
{
	if(Server.qualityDifix == '360p')
		Server.qualityDifix = '480p';
	else if(Server.qualityDifix == '480p')
		Server.qualityDifix = '720p';
	else if(Server.qualityDifix == '720p')
		Server.qualityDifix = '1080p';
	else if(Server.qualityDifix == '1080p')
		Server.qualityDifix = '360p';
	Display.changeQualityDifix();
}

Main.changeQualityCR = function()
{
	if(Server.quality == 'low')
		Server.quality = 'mid';
	else if(Server.quality == 'mid')
		Server.quality = 'high';
	else if(Server.quality == 'high')
		Server.quality = 'ultra';
	else if(Server.quality == 'ultra')
		Server.quality = 'auto';
   else if(Server.quality == 'auto')
      Server.quality = 'low';
	Display.changeQualityCR();
}

Main.nextEpisode = function(){
	Player.stopVideo();
	Display.stopPlayer();
	Main.selected_episode++;
	if(Main.selected_server == 'cr'){
		if(Data.getEpisodesID(Main.selected_episode) != 0)
			Main.playVideo(Main.selected_episode);
	}
	else if(Main.selected_server == 'af')
		Main.playVideo(Main.selected_episode);
	else if(Main.selected_server == 'dr')
		Main.playVideo(Main.selected_episode);
}

/* Subtitles Function */

Main.startSubtitle = function(url){
	alert('subs = ' + url);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var subs = new Function("return " + xmlhttp.responseText + ";")();
			if(subs.length != 0)
				Main.setSubs(subs);
		}
	}
	xmlhttp.open("GET", 'https://difix.herokuapp.com/api/all/subtitles.php?url='+url, true);
	xmlhttp.send();
}

Main.setSubs = function(s){
	Main.stateSubTest = true;
	document.getElementById("subtitle").style.display="block";
	Main.subsTest = s;
	if(Main.callback_subs)
		Main.callback_subs();
}

Main.showSubs = function(h,m,s){
	for(var i=0; i<Main.subsTest.length; i++){
		if(Main.subsTest[i].start.split(':')[0] == h && Main.subsTest[i].start.split(':')[1] == m && Main.subsTest[i].start.split(':')[2] == s)
			if(document.getElementById('subtitle'+Main.subsTest[i].number) == null){
				Main.crearElemento2('subtitle'+Main.subsTest[i].number, 'div', 'subtitle', 'subtitle', Main.subsTest[i].text);
				alert(Main.subsTest[i].text);
			}
		if(Main.subsTest[i].stop.split(':')[0] == h && Main.subsTest[i].stop.split(':')[1] == m && Main.subsTest[i].stop.split(':')[2] == s)
			if(document.getElementById('subtitle'+Main.subsTest[i].number) != null)
				document.getElementById('subtitle'+Main.subsTest[i].number).parentNode.removeChild(document.getElementById('subtitle'+Main.subsTest[i].number));
	}
}
