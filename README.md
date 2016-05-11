# angular-ask

#### DEMO: 
[http://cheiron1990.github.io/angular-ask/demo.html](http://cheiron1990.github.io/angular-ask/demo.html)

#### 使用说明

1 HTML和CSS:
```html
<!-- Material Design 主题 -->
<head>
    <link rel="stylesheet" href="styles/css/angular-ask-material.min.css" id="notifyTheme">
<head>
<body>
    <!-- 你的内容 -->
    <div ngask id="ngask"></div>  <!-- 容器标签 -->
    <!-- 引入jQuery文件 -->
    <!-- 引入Angular文件 -->
    <script src="scripts/dist/angular-ask.min.js"></script>
</body>
```

```html
<!-- Fullscreen Design 主题 -->
<!-- 强烈建议整个页面都是深色调时再用，不然容易看不清，详见DEMO -->
<head>
    <link rel="stylesheet" href="styles/css/angular-ask-fullscreen.min.css" id="notifyTheme">
<head>
<body>
    <div class="ngask-blur">  <!-- 用这个标签包裹内容，用于背景模糊效果 -->
        <!-- 你的全部内容 -->
    </div>
    <div ngask id="ngask"></div>  <!-- 容器标签 -->
    <!-- 引入jQuery文件 -->
    <!-- 引入Angular文件 -->
    <script src="scripts/dist/angular-ask.min.js"></script>
</body>
```
2 Javascript: 
```javascript
angular.module('yourApp', ['angularAsk']);
```
3 需要显示通知时触发事件 ngAskConfirm 或者 ngAskPrompt，传入三个参数，依次是title, content或用于prompt输入框的placeholder文本，回调函数。回调函数自带参数btnClicked, 当用户点击OK时，为true，点击Cancel时，为false. 如果是ngAskPrompt, 回调还有第二个参数userInput, 值是用户的输入，如果用户点击cancel，值为undefined:
```javascript
// Confirm
var confirmCallback = function(btnClicked){};
$scope.$emit('ngAskConfirm', 'title', 'content', confirmCallback);

// Prompt
var promptCallback = function(btnClicked, userInput){};
$scope.$emit('ngAskPrompt', 'title', 'placeholder', promptCallback);

```


#### Guide

1 HTML and CSS:
```html
<!-- Material Design Theme -->
<head>
    <link rel="stylesheet" href="styles/css/angular-ask-material.min.css" id="notifyTheme">
<head>
<body>
    <!-- Your Content -->
    <div ngask id="ngask"></div>  <!-- Container Tag -->
    <!-- import jQuery file -->
    <!-- import Angular file -->
    <script src="scripts/dist/angular-ask.min.js"></script>
</body>
```

```html
<!-- Fullscreen Design Theme -->
<!-- _Attention!_ Use this theme only when your page with deep tones, or users may not see content clearly. See the demo page to feel this sentence.-->
<head>
    <link rel="stylesheet" href="styles/css/angular-ask-fullscreen.min.css" id="notifyTheme">
<head>
<body>
    <div class="ngask-blur">  <!-- For the background blur effect, Use this tag to wrap all your content. -->
        <!-- All your content -->
    </div>
    <div ngask id="ngask"></div>  <!-- Container Tag -->
    <!-- import jQuery file -->
    <!-- import Angular file -->
    <script src="scripts/dist/angular-ask.min.js"></script>
</body>
```
2 Javascript: 
```javascript
angular.module('yourApp', ['angularAsk']);
```
3 When you want to ask something, trigger a _ngAskConfirm_ or _ngAskPrompt_ event, and pass 3 arguments: title, content or placeholder used in prompt input, callback function. The callback function has an argument _btnClicked_, when users click _OK_ button, it will be _true_, while users click _cancel_ button, it will be _false_. When you use _ngAskPrompt_, the callback function has another argument _userInput_, when users click _OK_ button, it will be users' input, while users click _cancel_ button, it will be undefined.
```javascript
// Confirm
var confirmCallback = function(btnClicked){};
$scope.$emit('ngAskConfirm', 'title', 'content', confirmCallback);

// Prompt
var promptCallback = function(btnClicked, userInput){};
$scope.$emit('ngAskPrompt', 'title', 'placeholder', promptCallback);

```
