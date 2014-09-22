'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$q', 'actionQueue', function($q, actionQueue) {
	var funcA,
		funcB,
		funcC,
		logger;

		logger = function logger(argument) {
			console.log(argument);
		}

		funcA = function funcA () {
			var deferred = $q.defer();

			setTimeout(function(){
				deferred.resolve(logger('a'))
			},2000)

			return deferred.promise;
		};

		funcB = function funcB () {
			var deferred = $q.defer();

			setTimeout(function(){
				deferred.resolve(logger('b'))
			},500)

			return deferred.promise;
		};

		funcC = function funcC () {
			var deferred = $q.defer();

			setTimeout(function(){
				deferred.resolve(logger('c'))
			},1000)

			return deferred.promise;
		};

	funcA();
	funcB();
	funcC();
	/**********
		result:
		b
		c
		a
	**********/

	setTimeout(function(){
		console.log('2nd step');
		actionQueue.add(funcA);
		actionQueue.add(funcB);
		actionQueue.add(funcC);
		/**********
			result:
			a
			b
			c
		**********/
	},3000);

	

}]);