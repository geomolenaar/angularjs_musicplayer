'use strict';

/**
 * @ngdoc service
 * @name angularjsMusicplayerApp.Player
 * @description
 * # Player
 * Factory in the angularjsMusicplayerApp.
 */
angular.module('angularjsMusicplayerApp')
  	.factory('player', function ($rootScope, localStorageService, $route) {

    /**
     * Array with all the songs in the current playlist
     * @type {Array}
     */
  	var playlist = [];

    /**
     * Array with all the users playlists
     * @type {Array}
     */
    var playlists = [];

    /**
     * Current song playing
     * @type {string}
     */
    var currentSong;

    /**
     * Current album playing
     * @type {string}
     */
    var currentAlbum;

    /**
     * Current artist playing
     * @type {string}
     */
    var currentArtist;
    
    /**
     * Creates the player
     * @type {Object}
     */
    var player = {

        /**
         * Currently playing
         * @type {Boolean}
         */
        playing: false,

        /**
         * Currently paused
         * @type {Boolean}
         */
        paused: false,

        /**
         * Creates an element with an id 'Audio'
         */
        audio: document.createElement('audio'),

        /**
         * Plays the selected song and adds the entire album to the current playlist
         * @param  {number} index   Index of the selected song
         * @param  {string} artist  Artist name
         * @param  {array}  tracks  Tracks of the album
         * @param  {sring}  album   Album name
         * @return {array}  
         */
        play: function(index, artist, tracks, album) {
            emptyPlayList();
            this.playing = true;
            player.index = index;

            angular.forEach(tracks, function(songs) {
                playlist.push(songs);
            });
            
            currentArtist = artist;
            currentSong = playlist[player.index].title;
            currentAlbum = album;

            player.audio.src = playlist[player.index].url;
            player.audio.play();
        },

        /**
         * Sets current status to paused
         * @return {boolean} 
         */
        pause: function() {
            this.playing = false;
            this.paused = true;
            this.audio.pause();
        },

        /**
         * Sets status back to playing
         * @return {boolean}
         */
        resume: function() {
            if(this.paused) {
                this.playing = true;
                this.audio.play();
            } else {
                return;
            }
            
        }
    };

    /**
     * Empties the playlist array
     * @return {array}
     */
    var emptyPlayList = function() {
        playlist = [];
    };

    /**
     * Plays selected album
     * @param  {string} title   Title of the album
     * @param  {array} tracks   All the tracks of the album
     * @param  {string} artist  Title of the artist
     * @return {array}       
     */
    var playAlbum = function(title, tracks, artist) {
        emptyPlayList();
        player.playing = true;
        angular.forEach(tracks, function(data) {
            playlist.push(data);
        });
        player.index = 0;
        currentSong = playlist[0].title;
        currentArtist = artist;
        currentAlbum = title;
        player.audio.src = playlist[0].url;
        player.audio.play();
    };

    /**
     * Plays the album (shuffled)
     * @param  {string} title  Title of the album
     * @param  {array} tracks  All the tracks of the album
     * @return {array}       
     */
    var playAlbumShuffle = function(title, tracks) {
        emptyPlayList();
        player.playing = true;
        angular.forEach(tracks, function(data) {
            playlist.push(data);
        });
        shuffle(playlist);
        player.index = 0;
        currentSong = playlist[0].title;
        currentAlbum = title;
        player.audio.src = playlist[0].url;
        player.audio.play();
    };

    /**
     * Returns the current song that is playing
     * @return {string}
     */
    var getCurrentSong = function() {
        return currentSong;
    };

    /**
     * Returns the current artist(s) that is playing
     * @return {string}
     */
    var getCurrentArtist = function() {
        return currentArtist;
    };

    /**
     * Returns the current album that is playing
     * @return {string}
     */
    var getCurrentAlbum = function() {
        return currentAlbum;
    };

    /**
     * Returns the current seconds of the song that is playing
     * @return {number}
     */
    var getCurrentSeconds = function() {
        var sec = parseInt(player.audio.currentTime % 60);
        if(sec<10) {
            sec = '0' + sec;
        }
        return sec;
    };

    /**
     * Returns the current minutes of the song that is playing
     * @return {number}
     */
    var getCurrentMinutes = function() {
        var min = parseInt((player.audio.currentTime / 60) % 60);
        return min;
    };

    /**
     * Returns the duration seconds of the song that is playing
     * @return {number}
     */
    var getDurationSeconds = function() {
        var sec = parseInt(player.audio.duration % 60);
        if(sec<10) {
            sec = '0' + sec;
        }
        return sec;
    };

    /**
     * Returns the duration minutes of the song that is playing
     * @return {number}
     */
    var getDurationMinutes = function() {
        var min = parseInt((player.audio.duration / 60) % 60);
        return min;
    };
    
    /**
     * Plays the next song in the playlist
     */
    var nextSong = function() {
        if(playlist.length > 0) {
            if(player.index !== playlist.length-1) {
                player.index++;
                player.audio.src = playlist[player.index].url;
                currentSong = playlist[player.index].title;
                player.audio.play();
            } else {
                return;
            }
        } else {
            return;
        }
    };

    /**
     * Plays the previous song in the playlist
     */
    var prevSong = function() {
        if(playlist.length > 0) {
            if(player.index !== 0) {
                player.index--;
                player.audio.src = playlist[player.index].url;
                currentSong = playlist[player.index].title;
                player.audio.play();
            } else {
                return;    
            }
        } else {
            return;
        }    
    };

    /**
     * Shuffles the selected album
     * @param  {array} array All tracks of the selected album
     * @return {array}       
     */
    var shuffle = function(array) {
          var currentIndex = array.length, temporaryValue, randomIndex ;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }
    };

    /**
     * Clears the users localstorage
     */
    var clearLocalStorage = function() {
        localStorage.clear();
        $route.reload();
    };

    /**
     * Adds new playlist
     * @param {string} title Title of the playlist
     */
    var addPlaylist = function(title) {
        if(localStorageService.get('playlists')) {
            playlists = localStorageService.get('playlists');
        } else {
            playlists = [];
        }
        var newPlaylist = {};
            newPlaylist.title = title;
            newPlaylist.tracks = [];

        playlists.push(newPlaylist);
        setLocalStorage();
        $route.reload();
    };

    /**
     * Updates the users localstorage
     */
    var setLocalStorage = function() {
        localStorageService.set('playlists', playlists);
    };

    /**
     * Adds a new track to the playlist
     * @param {number} index  Index of the selected playlist
     * @param {string} artist The artist name
     * @param {string} title  The title of the song
     * @param {string} url    The url of the song
     * @param {string} album  The title of the album
     */
    var addTrackToPlaylist = function(index, artist, title, url, album) {
        playlists = localStorageService.get('playlists');

        var newTrack = {};
            newTrack.artist = artist;
            newTrack.title = title;
            newTrack.url = url;
            newTrack.album = album;

        playlists[index].tracks.push(newTrack);

        setLocalStorage();
        $route.reload();
    };  
    
    /**
     * Returns all the playlists
     * @return {array}
     */
    var getPlaylists = function() {
        return localStorageService.get('playlists');
    };

    player.audio.addEventListener('timeupdate',function (){
        $rootScope.$apply(getCurrentMinutes());
        $rootScope.$apply(getCurrentSeconds());
    }, false);

    player.audio.addEventListener('ended', function() {
      $rootScope.$apply(nextSong());
    }, false);

    player.audio.addEventListener('loadedmetadata', function() {
        $rootScope.$apply(getDurationMinutes());
        $rootScope.$apply(getDurationSeconds());
    }, false);

  	return {
  	    player: player,
        playAlbum: playAlbum,
        playAlbumShuffle: playAlbumShuffle,
        nextSong: nextSong,
        prevSong: prevSong,
        getCurrentSong: getCurrentSong,
        getCurrentAlbum: getCurrentAlbum,
        getCurrentArtist: getCurrentArtist, 
        getCurrentSeconds: getCurrentSeconds,
        getCurrentMinutes: getCurrentMinutes,
        getDurationMinutes: getDurationMinutes,
        getDurationSeconds: getDurationSeconds,
        getPlaylists: getPlaylists,
        addPlaylist: addPlaylist,
        addTrackToPlaylist: addTrackToPlaylist,
        clearLocalStorage: clearLocalStorage
  	};

});
