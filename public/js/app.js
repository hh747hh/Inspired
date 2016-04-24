"use strict";

(function(){
  angular
  .module("breatheNow", [
    "ui.router"
  ])
  .config(Router)
  .controller("teachersIndexController", teachersIndexCtrl)
  .controller("teachersShowController", teachersShowCtrl);

  Router.$inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
  function Router($stateProvider, $locationProvider, $urlRouterProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
    .state("teachersIndex", {
      url:           "/",
      templateUrl:   "/html/teachers-index.html",
      controller:    "teachersIndexController",
      controllerAs:  "teachersIndexVM"
    })
    .state("teachersShow", {
      url:   "/teachers/:name",
      templateUrl: "/html/teachers-show.html",
      controller:    "teachersShowController",
      controllerAs: "teachersShowVM"
    });
    $urlRouterProvider.otherwise("/");
  }

  function teachersIndexCtrl(){
    var vm = this;
    vm.teachers = [
    {name : "Dalai Lama"},
    {name : "Tick Nat Hahn"},
    {name : "Tara Brach"}
  ];
}
  teachersShowCtrl.$inject = ["$stateParams"];
  function teachersShowCtrl($stateParams){
      var vm = this;
      vm.teacher = $stateParams;
  }

})();
