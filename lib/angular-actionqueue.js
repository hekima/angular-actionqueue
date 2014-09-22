/**
* zh-actionqueue Module
*
* Description: An AngularJS factory to manage requests as an action queue.
*/
angular.module('zh.actionqueue', [])
.factory('actionQueue', ['$rootScope', '$q', function($scope, $q){
	var add,
		consumeQueue,
		start,
		actionQueue,
		lastPromise;

	actionQueue = [];

	function noop() {
		var deferred = $q.defer();
		deferred.resolve();
		return deferred.promise;
	}

	lastPromise = noop();

	consumeQueue = function consumeQueue(promise) {
		var nextFunction = actionQueue.shift();
	  lastPromise = lastPromise.then(
	  	function(){
	  		if(!nextFunction) {
	  			nextFunction = noop;
	  		}
		  	var promise = nextFunction();
		  	return promise;
		  }
		);
	}

	// add function to processing queue
	add = function add (item) {
		actionQueue.push(item);
		$scope.$emit('actionQueueAdded');
	};

	$scope.$on('actionQueueAdded',function(){
		consumeQueue();
	});

	return {
		add: add
	};
}]);