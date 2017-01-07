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

    $scope.currencyFrom = 'USD';
    $scope.currencyTo = 'EUR';

    var parseData = function(response) {
      $scope.currencies = _.map(response.data.rates, function (value, prop) {
        return {country: prop, rate: value};
      });
    };

    var errorCallback = function(response) {
      console.log('Error:', response);
    };

    $http.get('rates.json')
      .then(parseData, errorCallback);
    console.log($scope);
    $scope.updateCurrency = function(currency) {
      console.log(currency);
    };
    // fx.base = response.data.base;
    // fx.rates = response.data.rates;
  }]);
