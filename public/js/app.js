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
    var Teacher = $resource("/api/teachers/:name", {}, {update: {method: "PATCH"}
  });
  Teacher.all = Teacher.query();
  Teacher.find = function(property, value, callback){
    Teacher.all.$promise.then(function(){
      Teacher.all.forEach(function(teacher){
        if(Teacher[property] == value) callback(teacher);
      });
    });
  };
  return Teacher;
}

teachersIndexCtrl.$inject = ["Teacher"];
function teachersIndexCtrl(Teacher){
  var vm      = this;
  vm.teachers = Teacher.query();
  vm.create   = function(){
    Teacher.save(vm.teacher, function(response){
      vm.teachers.push(response);
    });
  }
}

teachersShowCtrl.$inject = ["$stateParams", "Teacher", "$state"];
function teachersShowCtrl($stateParams, Teacher, $state){
  var vm = this;
  vm.teacher = Teacher.get($stateParams);
  vm.delete  = function(){
    Teacher.remove($stateParams, function(){
      $state.go("teachersIndex");
    });
  }
  vm.update  = function(){
    Teacher.update($stateParams, vm.teacher, function(response){
      $state.go("teachersShow", response);
    });
  }

}

})();
