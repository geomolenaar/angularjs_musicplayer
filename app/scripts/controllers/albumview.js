'use strict';

/**
 * @ngdoc function
 * @name angularjsMusicplayerApp.controller:PlaylistCtrl
 * @description
 * # PlaylistCtrl
 * Controller of the angularjsMusicplayerApp
 */
angular.module('angularjsMusicplayerApp')
    .controller('AlbumViewCtrl', function ($scope, $routeParams, musiclibrary, player) {

        /**
         * Stores the albumId route parameter
         * @type {number}
         */
      	$scope.albumId = $routeParams.albumId;
      	
        /**
         * Retrieves all albums from the musiclibrary service
         * @return {array}
         */
        $scope.$watchCollection(musiclibrary.returnAllAlbums, function() {
        	$scope.albums = musiclibrary.returnAllAlbums();
        });	

        /**
         * Retrieves all playlists
         * @type {array}
         */
        $scope.playlists = player.getPlaylists();

        /**
         * Adds selected song to a selected playlists
         * @param {number} index  Index of the playlist
         * @param {string} artist Artist name
         * @param {string} title  Title name
         * @param {string} url    Url
         */
    	$scope.addToPlaylist = function(index, artist, title, url) {
    		player.addTrackToPlaylist(index, artist, title, url);
    	};

  });
