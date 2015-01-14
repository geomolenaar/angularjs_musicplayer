'use strict';

/**
 * @ngdoc service
 * @name angularjsMusicplayerApp.musiclibrary
 * @description
 * # musiclibrary
 * Factory in the angularjsMusicplayerApp.
 */
angular.module('angularjsMusicplayerApp')
    .factory('musiclibrary', function ($http) {
   
        /**
         * Stores array with all the albums
         * @type {Array}
         */
        var allAlbums = [];

        /**
         * Retrieves all albums from the json file
         * @return {array} 
         */
        var getAllAlbums = function() {
            $http.get('json/data.json').success(function (data) {
                allAlbums = data;
            });
        };

        /**
         * Initialize when the app runs
         */
        getAllAlbums();

        /**
         * Returns the array allAlbums
         * @return {array}
         */
        var returnAllAlbums = function() {
            return allAlbums;
        };

        return {
            returnAllAlbums: returnAllAlbums
        };
    
  });
