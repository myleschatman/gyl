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
    $scope.base = {};
    $scope.base.selected = {name: 'United-States', country: 'USD'};
    $scope.rate = {};
    $scope.amount = 1;
    $scope.numeric = /^\d+$/;
    $scope.url = 'rates.json';

    var parseData = function(response) {
      fx.base = response.data.base;
      fx.rates = response.data.rates;
      $scope.currencies = _.map(response.data.rates, function (value, prop) { // each currency becomes an object for iteration purposes
        return {country: prop, rate: value};
      });
      if ($scope.rate.selected) {
        var selectedCountry = $scope.rate.selected.country;
        var globalRates = response.data.rates;

        $scope.rate.selected.rate = globalRates[selectedCountry].toFixed(2); // change current selected rate to new updated rate
      }
    };

    var errorCallback = function(response) {
      console.log('Error:', response);
    };

    $scope.changeFlag = function(currency) {
      $http.get('countries.json')
        .then(function(response) {
          var countryName = currency.country.slice(0, -1); // remove last char to match country code in JSON file
          currency.name = response.data[countryName].replace(/\s+/g, '-'); // remove hyphens to match flag name
          $scope.rate.selected.rate = Number($scope.rate.selected.rate).toFixed(2); // round to two decimal places
        });
    };

    $scope.calculateRate = function(amount) {
      if (!amount) { amount = '0'; } // initalize to 0 to avoid displaying NaN is output
      for (var rate in fx.rates) {
        if (rate === $scope.rate.selected.country) { // current country selected in dropdown menu
          $scope.rate.selected.rate = fx(amount).from(fx.base).to(rate).toFixed(2); // change current selected rate to new updated rate
        }
      }
    };

    $scope.swapCountries = function(baseFlag, rateFlag) {
      var temp = $scope.base.selected.country;
      $scope.base.selected.country = $scope.rate.selected.country;
      $scope.rate.selected.country = temp;
      $scope.changeFlag(baseFlag);
      $scope.changeFlag(rateFlag);
      $scope.getRates(baseFlag);
    };

    $scope.getRates = function(currency, amount) {
      $scope.amount = 1;  // reset input amount
      var countryCode = currency.country;
      $http.get('https://api.fixer.io/latest?base=' + countryCode)
        .then(parseData, errorCallback);
      $scope.changeFlag(currency);
      $scope.calculateRate(amount);
    };

    $http.get('https://api.fixer.io/latest?base=USD') // get default data to display on page load
      .then(parseData, errorCallback);
  }]);
