'use strict';

/**
 * @ngdoc directive
 * @name angularjsMusicplayerApp.directive:player
 * @description
 * # player
 */
angular.module('angularjsMusicplayerApp')
    .directive('player', function (player) {
        return {
            templateUrl: 'views/partials/player.html',
            restrict: 'A',
            link: function (scope) {
            	/**
            	 * Refers to the player factory
            	 * @type {object}
            	 */
            	scope.player = player;

            	/**
                 * Watches multiple functions in the player factory 
                 * @return {string}   currentSong
                 * @return {string}   currentAlbum
                 * @return {string}   currentArtist
                 * @return {number}   currentSeconds
                 * @return {number}   currentMinutes
                 * @return {number}   durationMinutes
                 * @return {number}   durationSeconds
                 */
    	        scope.$watchGroup([player.getCurrentSong, player.getCurrentAlbum, player.getCurrentSeconds, player.getDurationSeconds, player.getDurationMinutes], function() {
    		    	scope.currentSong = player.getCurrentSong();
    		    	scope.currentAlbum = player.getCurrentAlbum();
                    scope.currentArtist = player.getCurrentArtist();
    		    	scope.currentSeconds = player.getCurrentSeconds();
    	      		scope.currentMinutes = player.getCurrentMinutes();
    	      		scope.durationMinutes = player.getDurationMinutes();
                    scope.durationSeconds = player.getDurationSeconds();
    	    	});        
    	    }
        };
});
