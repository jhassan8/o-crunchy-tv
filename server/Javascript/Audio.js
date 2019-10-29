var Audio =
{
  plugin : null
}

Audio.init = function()
{
  var success = true;
  this.plugin = document.getElementById("pluginAudio");
  if(!this.plugin)
    success = false;
  Audio.setMute(Audio.getMute());
  return success;
}

Audio.setRelativeVolume = function(delta)
{
  this.plugin.SetVolumeWithKey(delta);
}

Audio.getVolume = function()
{
  return this.plugin.GetVolume();
}

Audio.setMute = function(state)
{
  this.plugin.SetUserMute(state);
}

Audio.getMute = function()
{
  return this.plugin.GetUserMute();
}
