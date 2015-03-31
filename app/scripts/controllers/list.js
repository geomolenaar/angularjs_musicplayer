'use strict';

/**
 * @ngdoc function
 * @name angularjsMusicplayerApp.controller:AlbumCtrl
 * @description
 * # AlbumCtrl
 * Controller of the angularjsMusicplayerApp
 */
angular.module('angularjsMusicplayerApp')
    .controller('ListCtrl', function ($scope, musiclibrary) {
	  	
	  	/**
	     * Retrieves all albums from the musiclibrary service
	     * @return {array}
	     */
	    $scope.$watchCollection(musiclibrary.returnAllAlbums, function(newVal) {
	    	$scope.albums = newVal;
	    });	
  });
