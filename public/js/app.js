"use strict";

(function(){
  angular
  .module("breatheNow", [
    "ui.router"
  ])
  .config(Router);

  Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("main", {
      url:   "/",
      template: "<h2>This is working!</h2>"
    })
    .state("test", {
      url:   "/test",
      template: "<h2>This also works</h2>"
    });
  }
})();
