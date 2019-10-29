var Player = {
	plugin: null,
	audio: null,
	state: -1,
	skipState: -1,
	stopCallback: null,
	originalSource: null,
	reload: true,
	STOPPED: 0,
	PLAYING: 1,
	PAUSED: 2,
	FORWARD: 3,
	REWIND: 4,
	TOTAL_BUFFER_SIZE_IN_BYTES : 100*1024*1024,
    INITIAL_BUFFERPER_CENT : 50,
    PENDING_BUFFER_PERCENT : 60,
   buff: 0
}

Player.initialize = function()
{
	var success = true;
	this.state = this.STOPPED;
	this.plugin = document.getElementById("pluginPlayer");
	this.audio = document.getElementById("pluginAudio");
	if (!this.plugin)
		success = false;
	else {
		var mwPlugin = document.getElementById("pluginTVMW");
		if (!mwPlugin)
			success = false;
		else{
			try{
				this.originalSource = mwPlugin.GetSource();
			}
			catch (e) {
				alert("Error= " + e);
			}
			try {
				mwPlugin.SetMediaSource();
			} catch (e){
				alert("Error= " + e);
			}
		}
	}
	this.setFullscreen();
	this.plugin.OnConnectionFailed = 'Player.OnConnectionFailed';
	this.plugin.OnNetworkDisconnected = 'Player.OnNetworkDisconnected';
	this.plugin.OnStreamNotFound = 'Player.OnStreamNotFound';
	this.plugin.OnRenderError = 'Player.OnRenderError';
	this.plugin.OnBufferingStart = 'Player.onBufferingStart';
	this.plugin.OnBufferingProgress = 'Player.onBufferingProgress';
	this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';
	this.plugin.OnCurrentPlayTime = 'Player.setCurTime';
	this.plugin.OnStreamInfoReady = 'Player.setTotalTime';
	this.plugin.OnRenderingComplete = 'Player.OnRenderingComplete';
	return success;
}


Player.OnNetworkDisconnected = function()
{
	alert("Network Disconected");
}

Player.OnStreamNotFound = function()
{
	alert("Stream Not Found");
}

Player.OnRenderError = function()
{
	alert("Render Error");
}

Player.setCurTime = function(time)
{
	Display.setTime(time);
}

Player.setTotalTime = function()
{
    Display.setTotalTime(Player.plugin.GetDuration());
}

Player.setRelativeVolume = function(delta)
{
	this.audio.SetVolumeWithKey(delta);
}

Player.getVolume = function()
{
	return this.audio.GetVolume();
}

Player.OnConnectionFailed = function()
{
	alert('Error');
}

Player.deinitialize = function()
{
	Main.endVideo('exit');
	var mwPlugin = document.getElementById("pluginTVMW");
	this.stopVideo();
	if(mwPlugin && (this.originalSource !== null))
		mwPlugin.SetSource(this.originalSource);
}

Player.setFullscreen = function()
{
	try {
		this.plugin.SetDisplayArea(0, 0, 960, 540);
	}
	catch (e){
		alert("Error= " + e);
	}
}

Player.setVideoURL = function(url)
{
	this.url = url;
}

Player.playVideo = function()
{
	if (this.url === null)
		alert("No videos to play");
	else {
		Player.setIcon(this.PLAYING);
		this.state = this.PLAYING;
		this.plugin.Play(this.url);
		this.audio.SetSystemMute(false);
	}
	alert(this.url);
}

Player.pauseVideo = function()
{
	this.state = this.PAUSED;
	Player.setIcon(this.PAUSED);
	this.plugin.Pause();
	//alert(this.plugin.GetVideoResolution());
}

Player.stopVideo = function()
{
	if (this.state != this.STOPPED) {
		this.state = this.STOPPED;
		this.plugin.Stop();
	}
}

Player.resumeVideo = function()
{
	this.state = this.PLAYING;
	Player.setIcon(this.PLAYING);
	this.plugin.Resume();
}

Player.skipForwardVideo = function(i)
{
	alert('Forward: ' + i + ' seconds');
	this.plugin.JumpForward(i);
}

Player.skipBackwardVideo = function(i)
{
	alert('Rewind: ' + i + ' seconds');
	this.plugin.JumpBackward(i);
}

Player.getState = function()
{
	return this.state;
}

Player.onBufferingStart = function()
{
   this.buff++;
	this.reload = false;
	Display.showLoading();
}

Player.onBufferingProgress = function(percent)
{
	//widgetAPI.putInnerHTML(document.getElementById("loading_text"), percent + " %");
}

Player.onBufferingComplete = function() {
	document.getElementById("pluginPlayer").visibility=="visible";
	Player.setIcon(this.PLAYING);
	Display.hideLoading();
	switch (this.skipState)
	{
		case this.FORWARD:
		break;
		case this.REWIND:
		break;
	}
}

Player.OnRenderingComplete = function()
{
	Main.endVideo('complet');
}

Player.onServerError = function()
{
	alert("Server Error!");
}

Player.getBandwidth = function(bandwidth)
{
	alert("getBandwidth " + bandwidth);
}

Player.onDecoderReady = function()
{
	alert("onDecodeready");
}

/*Player.onRenderError = function()
{
	app.emit("playerstatus",
	{
		status: null,
		error: "015: Render error",
		pairKey: app.pairKey
	});
	alert("onRenderError");
}*/

/*Player.onStreamNotFound = function()
{
	alert("OnStreamNotFound");
}*/

Player.onAuthenticationFailed = function()
{
	alert("OnAuthenticationFailed");
}

Player.onConnectionFailed = function()
{
	alert("OnConnectionFailed");
}

Player.stopPlayer = function()
{
	stopVideo();
}

Player.setTottalBuffer = function(buffer)
{
	alert("setTottalBuffer " + buffer);
}

Player.setCurBuffer = function(buffer)
{
	alert("setCurBuffer " + buffer);
}

Player.setIcon = function(iconstate)
{
    switch(iconstate){
		case this.PLAYING:
            document.getElementById("playericon").style.background='url('+Main.api_url+'Images/playericonplay.png)';
		break;
		case this.PAUSED:
            document.getElementById("playericon").style.background='url('+Main.api_url+'Images/playericonpause.png)';
		break;
		case this.FORWARD:
            document.getElementById("playericon").style.background='url('+Main.api_url+'Images/playericonff.png)';
		break;
		case this.REWIND:
            document.getElementById("playericon").style.background='url('+Main.api_url+'Images/playericonrr.png)';
		break;
		default:
		break;
    }
}

Player.getState = function()
{
    return this.state;
}
