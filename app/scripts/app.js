'use strict';

/**
 * @ngdoc overview
 * @name angularjsMusicplayerApp
 * @description
 * # angularjsMusicplayerApp
 *
 * Main module of the application.
 */
angular
  .module('angularjsMusicplayerApp', [
    'ngResource',
    'ngRoute',
    'angular.filter',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'ListCtrl'
        })
        .when('/album/:albumId', {
            templateUrl: 'views/album.html',
            controller: 'AlbumViewCtrl'
        })
        .when('/artists/', {
            templateUrl: 'views/artists.html',
            controller: 'ListCtrl'
        })
        .when('/tracks', {
            templateUrl: 'views/tracks.html',
            controller: 'ListCtrl'
        })
        .when('/artists/:artistId', {
            templateUrl: 'views/albumsbyartists.html',
            controller: 'ArtistCtrl'
        })
        .when('/playlists', {
            templateUrl: 'views/playlists.html',
            controller: 'PlaylistsCtrl'
        })
        .when('/playlists/:playlistId', {
            templateUrl: 'views/playlist.html',
            controller: 'PlaylistsCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  });
