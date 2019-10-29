var Data =
{
	series : {},
	seasons : {},
	episodes : {},
	callback_series : null,
	callback_seasons : null,
	callback_episodes : null,
}

//SETS
Data.setSeries = function(data)
{
	Data.series = data;
	if(Data.callback_series)
		Data.callback_series();
}

Data.setSeasons = function(data)
{
	Data.seasons = data;
	Data.seasons.data.reverse();
	if(Data.callback_seasons)
		Data.callback_seasons();
}

Data.setEpisodes = function(data)
{
	Data.episodes = data;
	Data.episodes.data.reverse();
	if(Data.callback_episodes)
		Data.callback_episodes();
}

//GETS SERIES
Data.getSeriesImage = function(i)
{
	if(Data.series.data[i] != null)
		return Data.series.data[i].portrait_image.thumb_url;
	else
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
}

Data.getSeriesName = function(i)
{
	return Data.series.data[i].name;
}

Data.getSeriesDesc = function(i)
{
	return Data.series.data[i].description;
}

Data.getSeriesID = function(i)
{
	return Data.series.data[i].series_id;
}

Data.getSeriesEpisodes = function(i)
{
	return Data.series.data[i].media_count;
}

Data.getSeriesCount = function()
{
	return Data.series.data.length;
}

//GETS SEASONS
Data.getSeasonsCount = function()
{
	return Data.seasons.data.length;
}

Data.getSeasonsEpisodes = function(i)
{
	return Data.seasons.data[i].media_count;
}

Data.getSeasonsID = function(i)
{
	return Data.seasons.data[i].collection_id;
}

Data.getSeasonsDesc = function(i)
{
	return Data.seasons.data[i].description;
}

Data.getSeasonsName = function(i)
{
	return Data.seasons.data[i].name;
}

Data.getSeasonsImage = function(i)
{
	if(Data.seasons.data[i] != null)
		if(Data.seasons.data[i].portrait_image == null)
			return Data.getSeriesImage(Main.getsMain('selected_serie'));
		else
			return Data.seasons.data[i].portrait_image.thumb_url;
	else
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
}

//GETS EPISODES
Data.getEpisodesName = function(i)
{
	if(Main.selected_server == 'cr'){
		if(Data.episodes.data[i].available == false)
			return 'Episodio ' + Data.episodes.data[i].episode_number + ' : Coming Soon';
		else
			return 'Episodio ' + Data.episodes.data[i].episode_number + ' : ' + Data.episodes.data[i].name;
	}
	else if(Main.selected_server == 'af' || Main.selected_server == 'dr')
		return Data.episodes.data[i].name;
}

Data.getEpisodesCount = function()
{
	return Data.episodes.data.length;
}

Data.getEpisodesImage = function(i)
{
	if(Data.episodes.data[i] != null){
		if(Main.selected_server == 'cr'){
			if(Data.episodes.data[i].screenshot_image == null){
				img = "http://static.ak.crunchyroll.com/i/no_image_beta_fwide.jpg";
				if(Data.episodes.data[i].available == false)
					img = "http://static.ak.crunchyroll.com/i/coming_soon_beta_fwide.jpg";
			}
			else{
				if(Data.episodes.data[i].free_available == false)
					img = Data.episodes.data[i].screenshot_image.fwidestar_url;
				else
					img = Data.episodes.data[i].screenshot_image.fwide_url;
			}
		}
		else if(Main.selected_server == 'af')
			if(Data.episodes.data[i].screenshot_image.fwide_url.length > 5)
				img = Data.episodes.data[i].screenshot_image.fwide_url;
			else
				img = Data.series.data[Main.selected_serie].portrait_image.thumb_epi;
	}
	else
		img  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
	return img;
}

Data.getEpisodesDesc = function(i)
{
	return Data.episodes.data[i].description;
}

Data.getEpisodesID = function(i)
{
	if(Data.episodes.data[i] != null){
		if(Main.selected_server == 'cr'){
			if(Data.episodes.data[i].available == false)
				return 0;
			else
				if(Data.episodes.data[i].free_available == false && Server.premium == false)
					return 0;
				else
					return (Data.episodes.data[i].url).match(/\d{5,}/);
		}
		else if(Main.selected_server == 'af' || Main.selected_server == 'dr'){
			return Data.episodes.data[i].media_id;
		}
	}
	else
		return 0;
}

Data.getEpisodeNumber = function(i)
{
	if(Data.episodes.data[i] != null)
		return '<BR>Episodio<BR>'+Data.episodes.data[i].episode_number;
	else
		return '';
}
