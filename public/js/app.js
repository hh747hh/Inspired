"use strict";

(function(){
  angular
  .module("breatheNow", [
    "ui.router",
    "ngResource"
  ])
  .config(Router)
  .factory("Teacher", teacherFactory)
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

  teacherFactory.$inject = ["$resource"];
  function teacherFactory($resource){
    var Teacher = $resource("/api/teachers");
    return Teacher;
  }
  teachersIndexCtrl.$inject = ["Teacher"];
  function teachersIndexCtrl(Teacher){
    var vm = this;
    vm.teachers = Teacher.query();
    vm.create   = function(){
      console.log(vm.newTeacher);
      Teacher.save(vm.newTeacher, function(response){
        vm.teachers.push(response);
      });
    }
  }
  teachersShowCtrl.$inject = ["$stateParams"];
  function teachersShowCtrl($stateParams){
    var vm = this;
    vm.teacher = $stateParams;
  }

})();
