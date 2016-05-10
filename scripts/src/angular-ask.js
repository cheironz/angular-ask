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


/*
Dom Structure
<div class="angular-ask">
	<p class="title">Are you sure?</p>
	<p class="content">This will cause a problem.</p>
	<form ><input type="text" placeholder="what is the value?" /></form>
	<div class="operations">
		<button class="cancel">Cancel</button>
		<button class="ok">OK</button>
	</div>
</div>
*/


AngularAskModule.directive('ngask', [
	function(){
		return {
			restrict: 'EAC',
			link: function(scope, elem, attrs){
				scope.ngAskResult = 'test';
				var themeHref = document.getElementById('angularAskTheme').getAttribute('href');
				var fullScreenBlur = themeHref.indexOf('fullscreen');
				scope.$onRootScope('ngAskConfirm', function(e, title, content, okFunc, cancelFunc){
					var container = document.createElement('div');
					container.className += 'angular-ask';
					if ( typeof title == 'string' && title.length !== 0) {
						var titleContainer = document.createElement('p');
						titleContainer.className += 'title';
						titleContainer.innerHTML = title;
						container.appendChild(titleContainer);
					}
					if ( typeof content == 'string' && content.length !== 0) {
						var contentContainer = document.createElement('p');
						contentContainer.className += 'content';
						contentContainer.innerHTML = content;
						container.appendChild(contentContainer);
					}
					var operationsContainer = document.createElement('div');
					operationsContainer.className += 'operations';
					var cancelBtn = document.createElement('button');
					cancelBtn.className += 'cancel';
					cancelBtn.innerHTML = 'Cancel';
					var okBtn = document.createElement('button');
					okBtn.className += 'ok';
					okBtn.innerHTML = 'OK';
					operationsContainer.appendChild(cancelBtn);
					operationsContainer.appendChild(okBtn);
					container.appendChild(operationsContainer);
					var ngaskDom = document.getElementById('ngask');
					ngaskDom.appendChild(container);
					if(fullScreenBlur){
						$('.ngask-blur').css({
							'filter': 'blur(2px)',
							'-webkit-filter': 'blur(2px)',
							'-moz-filter': 'blur(2px)',
							'-o-filter': 'blur(2px)',
							'-ms-filter': 'blur(2px)'
						});
					}
					cancelBtn.addEventListener('click', function(){
						$(container).remove();
						if(fullScreenBlur){
							$('.ngask-blur').removeAttr('style');
						}
						scope.ngAskResult = false;
						if($.isFunction(cancelFunc)){
							cancelFunc();
						}
					});
					okBtn.addEventListener('click', function(){
						$(container).remove();
						if(fullScreenBlur){
							$('.ngask-blur').removeAttr('style');
						}
						scope.ngAskResult = true;
						if($.isFunction(okFunc)){
							okFunc();
						}
					})
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