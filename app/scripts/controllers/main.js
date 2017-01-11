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
    $scope.base = {};
    $scope.base.selected = {name: 'United-States', country: 'USD'};
    $scope.rate = {};

    $scope.changeFlag = function(currency) {
      $http.get('countries.json')
        .then(function(response) {
          var code = currency.country.slice(0, -1); // remove last char to match country code
          currency.name = response.data[code].replace(/\s+/g, '-'); // remove hyphens to match flag name
        });
    };

    $scope.getRates = function(currency) {
      // console.log($scope);
      var countryCode = currency.country;
      $http.get('http://api.fixer.io/latest?base=' + countryCode)
        .then(parseData, errorCallback);
      $scope.changeFlag(currency);
    };

    var parseData = function(response) {
      // console.log(response.data.rates[$scope.selected.country]);
      $scope.currencies = _.map(response.data.rates, function (value, prop) { // each currency becomes an object for iteration purposes
        return {country: prop, rate: value};
      });
      $scope.rate.selected.rate = response.data.rates[$scope.rate.selected.country];
    };

    var errorCallback = function(response) {
      console.log('Error:', response);
    };

    $http.get('http://api.fixer.io/latest?base=USD') // get default data to display on page load
      .then(parseData, errorCallback);

    // fx.base = response.data.base;
    // fx.rates = response.data.rates;
  }]);
