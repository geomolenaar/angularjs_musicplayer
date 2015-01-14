'use strict';

/**
 * @ngdoc function
 * @name angularjsMusicplayerApp.controller:PlaylistCtrl
 * @description
 * # PlaylistCtrl
 * Controller of the angularjsMusicplayerApp
 */
angular.module('angularjsMusicplayerApp')
  	.controller('PlaylistsCtrl', function ($scope, player, $routeParams) {

   		/**
         * Retrieves all playlists
         * @type {array}
         */
    	$scope.playlists = player.getPlaylists();

    	/**
         * Stores the playlistId route parameter
         * @type {number}
         */
      	$scope.playlistId = $routeParams.playlistId;

      	/**
      	 * Refers to the player factory
      	 * @type {object}
      	 */
      	$scope.player = player;

  	});
