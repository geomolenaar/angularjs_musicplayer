'use strict';

/**
 * @ngdoc function
 * @name angularjsMusicplayerApp.controller:ArtistCtrl
 * @description
 * # ArtistCtrl
 * Controller of the angularjsMusicplayerApp
 */
angular.module('angularjsMusicplayerApp')
  	.controller('ArtistCtrl', function ($scope, $routeParams, musiclibrary) {
   		
   		/**
         * Stores the artistId route parameter
         * @type {number}
         */
   		$scope.artistId = $routeParams.artistId;

   		/**
         * Retrieves all albums from the musiclibrary service
         * @return {array}
         */
   		$scope.$watchCollection(musiclibrary.returnAllAlbums, function() {
    		$scope.albums = musiclibrary.returnAllAlbums();
    	});	
  	});
