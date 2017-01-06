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
    var baseUrl = 'http://api.fixer.io/';

    $scope.url = baseUrl + 'latest';

    $http.get('rates.json')
      .then(function (response) {
        $scope.results = response.data;
        setExchangeRates();
      }, function (error) {
        console.log('ERROR:', error);
      });

    function setExchangeRates() {
      fx.base = $scope.results.base;
      fx.rates = $scope.results.rates;
      console.log(fx.base, fx.rates);
    }
  }]);

  // $http.get('rates.json').then(function(res) {
  //   fx.base = res.data.base;
  //   fx.rates = res.data.rates;
  //   fx.settings = {from: 'USD', to: 'CNY'};
  //   console.log(fx.convert(1000).toFixed(2));
  // });
