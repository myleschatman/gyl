'use strict';
/**
 * @ngdoc function
 * @name gylApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gylApp
 */
angular.module('gylApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    // var baseUrl = 'http://api.fixer.io/';
    $scope.currency = {};
    $scope.currency.selected = {name: 'United State of America', country: 'USD'};

    var parseData = function(response) {
      $scope.currencies = _.map(response.data.rates, function (value, prop) {
        return {country: prop, rate: value};
      });
    };

    var countryFlag = $http.get('countries.json')
      .then(function(response) {
        $scope.countries = response.data;
      });
    console.log(countryFlag);

    var errorCallback = function(response) {
      console.log('Error:', response);
    };

    $http.get('rates.json')
      .then(parseData, errorCallback);
    console.log($scope);
    // fx.base = response.data.base;
    // fx.rates = response.data.rates;
  }]);
