var Server =
{
	premium : null,
	url : 'https://api.crunchyroll.com',
	url2 : 'https://difix.herokuapp.com/api/af/?action=',
	url3 : 'https://difix.herokuapp.com/api/dr/',
	version : "2313.8",
	access_token : "Scwg9PRRZ19iVwD",
	device_type : "com.crunchyroll.crunchyroid",
	device_id : 'SI30Gv4YwPEW3m8NBAUE0EfJyFteHMW9',
	difix_server : 0,
	difix_urls : [],
	session_id : null,
	quality : 'auto',
	qualityDifix : '480p',
	array_priority : ['hyperion','yotta','zippyshare','cldup','yourupload','izanagi','mp4upload','kami','vk','nowvideo','novamov','videowed']
}

Server.setCookie = function(){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert(xmlhttp.responseText);
			document.cookie = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET", Server.url3+"api.php?action=get_cookie", true);
	xmlhttp.send();
}

Server.init = function()
{
    var success = true;
    return success;
}

Server.playVideo = function(i)
{
	Main.stateSubTest = false;
	var version = "2313.8";
	var media_id = Data.getEpisodesID(i);
	var fields = "media.episode_number,media.name,media.description,media.url,media.stream_data";
	var values = '?session_id=' + Server.session_id + '&version=' + version + '&media_id=' + media_id + '&fields=' + fields;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var link = '';
			var url = new Function("return " + xmlhttp.responseText + ";")();
			var c = url.data.stream_data.streams.length;
			for(var i=0; i < c ; i++)
				if(url.data.stream_data.streams[i].quality == Server.quality)
					link = url.data.stream_data.streams[i].url;
				else if(url.data.stream_data.streams[i].quality == 'mid' && link=='')
					link = url.data.stream_data.streams[i].url;
			Player.setVideoURL(link + '|COMPONENT=HLS');
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", "https://api.crunchyroll.com/info.0.json"+values, true);
	xmlhttp.send();
}

Server.loadEpisodes = function(i)
{
	var version = "2313.8";
	var collection_id = Data.getSeasonsID(i);
	var count = Data.getSeasonsEpisodes(i);
	var fields = "media.episode_number,media.name,media.description,media.url,media.screenshot_image,image.fwide_url,image.fwidestar_url,media.available,media.free_available"
	var values = '?session_id=' + Server.session_id + '&version=' + version + '&collection_id=' + collection_id + '&fields=' + fields + '&sort=' + 'desc' + '&limit=' + count;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			Data.setEpisodes(myArr);
		}
	}
	xmlhttp.open("GET", "https://api.crunchyroll.com/list_media.0.json"+values, true);
	xmlhttp.send();
	return;
}


Server.loadSeasons = function(i)
{
	var version = "2313.8";
	var series_id = Data.getSeriesID(i);
	var count = Data.getSeriesEpisodes(i);
	var fields = "collection.collection_id,collection.season,collection.name,collection.description,collection.media_count,collection.portrait_image,image.thumb_url"
	var values = '?session_id=' + Server.session_id + '&version=' + version + '&series_id=' + series_id + '&fields=' + fields + '&sort=' + 'desc' + '&limit=' + count;
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			Data.setSeasons(myArr);
		}
	}
	xmlhttp.open("GET", "https://api.crunchyroll.com/list_collections.0.json"+values, true);
	xmlhttp.send();
}

Server.loadSeries = function(c,f)
{
	var fields = "series.name,series.description,series.series_id,series.media_count,series.portrait_image,image.thumb_url";
	values = '?session_id=' + Server.session_id  + '&version=' + Server.version + '&media_type=' + c + '&filter=' + f + '&fields=' + fields + '&limit=1000' + '&offset=0';
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			Data.setSeries(myArr);
		}
	}
	xmlhttp.open("GET", Server.url+"/list_series.0.json"+values, true);
	xmlhttp.send();
}

Server.apiLogin = function(c,f)
{
	var xmlhttp = new XMLHttpRequest();
	var values = '?device_id=' + Server.device_id + '&device_type=' + Server.device_type + '&access_token=' + Server.access_token + '&version=' + Server.version;
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			Server.session_id = (new Function("return " + xmlhttp.responseText + ";")()).data.session_id;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					if(xmlhttp.responseText.indexOf('anime|drama') !=-1)
						Server.premium = true;
					else
						Server.premium = true;
					var fields = "series.name,series.description,series.series_id,series.media_count,series.portrait_image,image.thumb_url";
					values = '?session_id=' + Server.session_id  + '&version=' + Server.version + '&media_type=' + c + '&filter=' + f + '&fields=' + fields + '&limit=1000' + '&offset=0';
					xmlhttp = new XMLHttpRequest();
					xmlhttp.onreadystatechange = function() {
						if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
							var myArr = new Function("return " + xmlhttp.responseText + ";")();
							Data.setSeries(myArr);
						}
					}
					xmlhttp.open("GET", Server.url+"/list_series.0.json"+values, true);
					xmlhttp.send();
				}
			}
			xmlhttp.open("GET", 'https://difix.herokuapp.com/api/cr/api.login.php?session_id='+Server.session_id, true);
			xmlhttp.send();
		}
	}
	xmlhttp.open("GET", Server.url+"/start_session.0.json"+values, true);
	xmlhttp.send();
}

Server.loadSeriesDifix = function(c)
{
	alert(Server.url2+"lists&type="+c);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			Data.setSeries(myArr);
		}
	}
	xmlhttp.open("GET", Server.url2+"lists&type="+c, true);
	xmlhttp.send();
}

Server.loadSeriesDifix2 = function(c)
{
	var values = '?media_type=' + c;
	alert(Server.url3+"api.list.php"+values);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			Data.setSeries(myArr);
		}
	}
	xmlhttp.open("GET", Server.url3+"api.list.php"+values, true);
	xmlhttp.send();
}

Server.loadEpisodesDifix = function(i)
{
	var series_id = Data.getSeriesID(i);
	alert(Server.url2+"episodes&id="+series_id);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert(xmlhttp.responseText);
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			Data.setEpisodes(myArr);
		}
	}
	xmlhttp.open("GET", Server.url2+"episodes&id="+series_id, true);
	xmlhttp.send();
	return;
}

Server.loadEpisodesDifix2 = function(i)
{
	var series_id = Data.getSeriesID(i);
	var values = '?series_id=' + series_id + '&type=' + Main.typeDifix;
	alert(Server.url3+"api.caps.php"+values);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			alert(xmlhttp.responseText);
			var myArr = new Function("return " + xmlhttp.responseText + ";")();
			if(myArr.error == true){
				Display.hideLoading();
				Main.estado = 0;
				return;
			}
			Data.setEpisodes(myArr);
		}
	}
	xmlhttp.open("GET", Server.url3+"api.caps.php"+values, true);
	xmlhttp.send();
	return;
}

Server.playVideoDifix = function(i)
{
	Main.stateSubTest = false;
	Server.difix_server = 0;
	Server.difix_urls == [];
	var media_id = Data.getEpisodesID(i);
	alert(Server.url2+"videos&id="+media_id);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var urls = new Function("return " + xmlhttp.responseText + ";")();
			if(urls.error == true)
				Main.endVideo('Error');
			else{
				Server.difix_urls = urls;
				Server.connectorSelect();
			}
		}
	}
	xmlhttp.open("GET", Server.url2+"videos&id="+media_id, true);
	xmlhttp.send();
}

Server.playVideoDifix2 = function(i)
{
	var media_id = Data.getEpisodesID(i);
	var values = '?media_id=' + media_id;
	alert(Server.url3+"api.vid.php"+values);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var urls = new Function("return " + xmlhttp.responseText + ";")();
			if(urls.error == true)
				Main.endVideo('Error');
			else{
				var toplay = urls.data[0].id;
				var subtitle = urls.subtitle;
				Player.setVideoURL(toplay);
				Main.startSubtitle(subtitle);
				Main.handlePlayKey();
				alert(toplay + '-' + subtitle);
			}
		}
	}
	xmlhttp.open("GET", Server.url3+"api.vid.php"+values, true);
	xmlhttp.send();
}

Server.connectorSelect = function()
{
	var id = null;
	var act = false;
	for(var i=Server.difix_server;i<Server.array_priority.length && act == false;i++){
		for(var y=0;y<Server.difix_urls.data.length && act == false;y++){
			if(Server.array_priority[i] == Server.difix_urls.data[y].name){
				id = Server.difix_urls.data[y].id;
				server = Server.difix_urls.data[y].name;
				Server.difix_server = i;
				act = true;
			}
		}
	}
	if(id != null){
		switch(server){
			case 'zippyshare':
				Server.connectorZippyshare(id);
			break;
			case 'mp4upload':
				Server.connectorMp4upload(id);
			break;
			case 'vk':
				Server.connectorVK(id);
			break;
			case 'nowvideo':
				Server.connectorNowvideo(id);
			break;
			case 'novamov':
				Server.connectorNovamov(id);
			break;
			case 'videowed':
				Server.connectorVideowed(id);
			break;
			case 'izanagi':
				Server.connectorIzanagi(id);
			break;
			case 'yotta':
				Server.connectorYotta(id);
			break;
			case 'kami':
				Server.connectorKami(id);
			break;
			case 'yourupload':
				Server.connectorYourupload(id);
			break;
			case 'cldup':
				Server.connectorCldup(id);
			break;
			case 'hyperion':
				Server.connectorHyperion(id);
			break;
			case 'netu':
				//Server.connectorNetu(id);
			break;
			case 'rutube':
				//Server.connectorRutube(id);
			break;
		}
	}
	else
		Main.endVideo('Error');
}

Server.connectorHyperion= function(id){
	alert('hyperion');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var link = Server.getLastString(myArr, 'difix:', ':difix');
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", Server.url2+'hyperion&id=' + id, true);
	xmlhttp.send();
}

Server.connectorCldup = function(id){
	alert('cldup');
	if(id == ''){
		Server.difix_server++;
		Server.connectorSelect();
		return;
	}
	Player.setVideoURL('https://cldup.com/'+id+'.mp4');
	Main.handlePlayKey();
}

Server.connectorYourupload = function(id){
	alert('Yourupload');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var link = Server.getLastString(myArr, 'difix:', ':difix');
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", Server.url2+'yourupload&id=' + id, true);
	xmlhttp.send();
}

Server.connectorZippyshare = function(id)
{
	alert('Zippyshare');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var b = false;
			for(var i=0; i < 10 && b == false; i++){
				var link = Server.getString(myArr, '<script type="text/javascript">', "</script>");
				if(link.indexOf('dlbutton') != -1){
          link = link.replace("document.getElementById('dlbutton').omg","var locoman");
          link = link.replace("document.getElementById('dlbutton').omg", "locoman");
          link = link.replace("document.getElementById('omg').getAttribute('class');", '2');
          link = link.replace("document.getElementById('lang-one').", '');
          link = link.replace("document.getElementById('lang-one').", '');
          link = link.replace("document.getElementById('lang-one').", '');
					link = link.replace("document.getElementById('dlbutton').href", 'link');
					b=true;
				}
				else
					myArr = myArr.replace('<script type="text/javascript">' + link + '</script>','ErrorDifix');
			}
			if(link == '' || b == false){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
      alert(link);
			link = id.substring(0, id.indexOf('.')) + '.zippyshare.com' + eval(link);
			link = link.replace('https://','http://');
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", id, true);
	xmlhttp.send();
}

Server.connectorMp4upload = function(id)
{
	alert('Mp4upload');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var link = "function(p,a,c,k,e,d)"+Server.getString(xmlhttp.responseText,"eval(function(p,a,c,k,e,d)",".split('|')))",false)+".split('|'))";
			link = Server.getString((new Function("return " + link + ";")()),'src:"','"');
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'http://www.mp4upload.com/embed-' + id + '.html', true);
	xmlhttp.send();
}

Server.connectorVK = function(id)
{
	alert('VK');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = xmlhttp.responseText;
			var s;
			if(myArr.indexOf('"url480":"') != -1)
				s = '"url480":"';
			else if(myArr.indexOf('"url360":"') != -1)
				s = '"url360":"';
			else if(myArr.indexOf('"url720":"') != -1)
				s = '"url720":"';
			else if(myArr.indexOf('"url240":"') != -1)
				s = '"url240":"';
			else{
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			var link = Server.getString(myArr, s, '"');
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			link = link.replace('https://','http://');
			Player.setVideoURL(link);
			Main.handlePlayKey();
			return;
		}
	}
	xmlhttp.open("GET", id.replace(/\\/g,""), true);
	xmlhttp.send();
	return;
}

Server.connectorNowvideo = function(id)
{
	alert('Nowvideo');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var key = Server.getString(myArr, 'var fkzd="', '";');
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					myArr = xmlhttp.responseText;
					var link = Server.getString(myArr, 'rl=', '&title=');
					if(link == ''){
						Server.difix_server++;
						Server.connectorSelect();
						return;
					}
					link = link.replace('https://','http://')
					Player.setVideoURL(link);
					Main.handlePlayKey();
				}
			}
			xmlhttp.open("GET", "http://www.nowvideo.sx/api/player.api.php?key=" + key + "&file=" + id, true);
			xmlhttp.send();
		}
	}
	xmlhttp.open("GET", 'http://embed.nowvideo.sx/embed/?v=' + id, true);
	xmlhttp.send();
}

Server.connectorVideowed = function(id)
{
	alert('Videowed');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var key = Server.getString(myArr, 'var fkz="', '";');
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					myArr = xmlhttp.responseText;
					var link = Server.getString(myArr, 'rl=', '&title=');
					if(link == ''){
						Server.difix_server++;
						Server.connectorSelect();
						return;
					}
					link = link.replace('https://','http://')
					Player.setVideoURL(link);
					Main.handlePlayKey();
				}
			}
			xmlhttp.open("GET", "http://www.videoweed.es/api/player.api.php?key=" + key + "&file=" + id, true);
			xmlhttp.send();
		}
	}
	xmlhttp.open("GET", 'http://embed.videoweed.es/embed/?v=' + id, true);
	xmlhttp.send();
}

Server.connectorNovamov = function(id)
{
	alert('Novamov');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var key = Server.getString(myArr, 'flashvars.filekey="', '";');
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function(){
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
					myArr = xmlhttp.responseText;
					var link = Server.getString(myArr, 'rl=', '&title=');
					if(link == ''){
						Server.difix_server++;
						Server.connectorSelect();
						return;
					}
					link = link.replace('https://','http://')
					Player.setVideoURL(link);
					Main.handlePlayKey();
				}
			}
			xmlhttp.open("GET", "http://www.novamov.com/api/player.api.php?key=" + key + "&file=" + id, true);
			xmlhttp.send();
		}
	}
	xmlhttp.open("GET", 'http://embed.novamov.com/embed/?v=' + id, true);
	xmlhttp.send();
}

Server.connectorIzanagi = function(id)
{
	alert('Izanagi');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var link = Server.getLastString(myArr, 'difix:', ':difix');
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", Server.url2+'izanagi&id=' + id, true);
	xmlhttp.send();
}

Server.connectorYotta = function(id){
	alert('Yotta');
	alert('https://s3.animeflv.com/check.php?server=gdrive&v=' + id);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			alert(myArr);
			var link = Server.getLastString(myArr, 'difix:', ':difix');
			alert(link);
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", Server.url2+'yotta&id=' + id, true);
	xmlhttp.send();
}

Server.connectorKami = function(id)
{
	alert('Kami');
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var myArr = xmlhttp.responseText;
			var link = Server.getString(myArr, 'file: "', '"');
			if(link == ''){
				Server.difix_server++;
				Server.connectorSelect();
				return;
			}
			Player.setVideoURL(link);
			Main.handlePlayKey();
		}
	}
	xmlhttp.open("GET", 'https://animeflv.net/video/kami.php?key=' + id, true);
	xmlhttp.send();
}

Server.getString = function(s,i,f,r){
	var p,o,c,u;
	if(r != false)
		s = s.replace(/\\/g,'');
	if(s.indexOf(i) != -1){
		p = s.indexOf(i);
		o = s.substring(p + i.length);
		if(o.indexOf(f) != -1){
			c = o.indexOf(f);
			u = o.substring(0, c);
			return u;
		}
	}
	return '';
}

Server.getLastString = function(s,i,f){
	var p,o,c,u;
	s = s.replace(/\\/g,'');
	if(s.lastIndexOf(i) != -1){
		p = s.indexOf(i);
		o = s.substring(p + i.length);
		if(o.indexOf(f) != -1){
			c = o.indexOf(f);
			u = o.substring(0, c);
			return u;
		}
	}
	return '';
}
