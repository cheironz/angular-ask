var AngularAskModule = angular.module('angularAsk', ['ng']);
AngularAskModule.config(['$provide', function($provide){
	$provide.decorator('$rootScope', ['$delegate', function($delegate){
		Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
			value: function(name, listener){
				var unsubscribe = $delegate.$on(name, listener);
				this.$on('$destroy', unsubscribe);

				return unsubscribe;
			},
			enumerable: false
		});

		return $delegate;
	}]);
}]);

AngularAskModule.directive('ngask', [
	function(){
		return {
			restrict: 'EAC',
			link: function(scope, elem, attrs){
				scope.$onRootScope('ngAskConfirm', function(e, title, content, okFunc, cancelFunc){
					if ( typeof title == 'string' && title.length !== 0) {
						console.log('title:' + title);
					}
					if ( typeof content == 'string' && content.length !== 0) {
						console.log('content:' + content);
					}
					okFunc();
					cancelFunc();
				});
				scope.$onRootScope('ngAskPrompt', function(e, title, content, okFunc, cancelFunc){
					if ( typeof title == 'string' && title.length !== 0) {
						console.log('title:' + title);
					}
					if ( typeof placeholder == 'string' && placeholder.length !== 0) {
						console.log('placeholder:' + placeholder);
					}
					okFunc();
					cancelFunc();
				});
			}
		};
	}
]);