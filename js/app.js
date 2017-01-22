var app = angular.module('myApp', []);

app.controller('recipeCtrl', function($scope){

$scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'recipe.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
  };
    
});