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
				var themeHref = document.getElementById('angularAskTheme').getAttribute('href');
				var fullScreenBlur = themeHref.indexOf('fullscreen');
				scope.$onRootScope('ngAskConfirm', function(e, title, content, callback){
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
					if(fullScreenBlur >= 0){
						$('.ngask-blur').css({
							'filter': 'blur(4px)',
							'-webkit-filter': 'blur(4px)',
							'-moz-filter': 'blur(4px)',
							'-o-filter': 'blur(4px)',
							'-ms-filter': 'blur(4px)'
						});
					}
					var btnClicked;
					cancelBtn.addEventListener('click', function(){
						$(container).remove();
						if(fullScreenBlur){
							$('.ngask-blur').removeAttr('style');
						}
						scope.ngAskResult = false;
						btnClicked = false;
						if($.isFunction(callback)){
							callback(btnClicked);
						}
					});
					okBtn.addEventListener('click', function(){
						$(container).remove();
						if(fullScreenBlur){
							$('.ngask-blur').removeAttr('style');
						}
						scope.ngAskResult = true;
						btnClicked = true;
						if($.isFunction(callback)){
							callback(btnClicked);
						}
					});
				});
				scope.$onRootScope('ngAskPrompt', function(e, title, placeholder, callback){
					var container = document.createElement('div');
					container.className += 'angular-ask';
					if ( typeof title == 'string' && title.length !== 0) {
						var titleContainer = document.createElement('p');
						titleContainer.className += 'title';
						titleContainer.innerHTML = title;
						container.appendChild(titleContainer);
					}
					var form = document.createElement('form');
					var input = document.createElement('input');
					input.setAttribute('type', 'text');
					if ( typeof placeholder == 'string' && placeholder.length !== 0) {
						input.setAttribute('placeholder', placeholder);
					}
					form.appendChild(input);
					container.appendChild(form);
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
					input.focus();
					if(fullScreenBlur >= 0){
						$('.ngask-blur').css({
							'filter': 'blur(4px)',
							'-webkit-filter': 'blur(4px)',
							'-moz-filter': 'blur(4px)',
							'-o-filter': 'blur(4px)',
							'-ms-filter': 'blur(4px)'
						});
					}
					var btnClicked;
					cancelBtn.addEventListener('click', function(){
						$(container).remove();
						if(fullScreenBlur){
							$('.ngask-blur').removeAttr('style');
						}
						scope.ngAskResult = undefined;
						btnClicked = false;
						if($.isFunction(callback)){
							callback(btnClicked);
						}
					});
					okBtn.addEventListener('click', function(){
						$(container).remove();
						if(fullScreenBlur){
							$('.ngask-blur').removeAttr('style');
						}
						scope.ngAskResult = input.value;
						btnClicked = true;
						if($.isFunction(callback)){
							callback(btnClicked);
						}
					});
				});
			}
		};
	}
]);