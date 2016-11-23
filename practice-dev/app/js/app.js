'use strict';
angular.module('thapp', ['ngCookies', 'ngRoute', 'xxfilters', 'xxservices', 'xxdirectives', 'ngStorage', 'angularFileUpload','testModel']).// Declare app level module which depends on filters, and services
config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$routeProvider', '$httpProvider', config]);

function config($controllerProvider, $compileProvider, $filterProvider, $provide, $routeProvider, $httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    // Disable IE ajax request caching 清除请求接口在IE上的缓存问题
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    $.ajaxSetup({cache: false});

    angular.module('thapp').register = {
        controller: $controllerProvider.register,
        directive: $compileProvider.directive,
        filter: $filterProvider.register,
        factory: $provide.factory,
        service: $provide.service
    };

    angular.module('thapp').asyncjs = function (js) {
        return ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
            var deferred = $q.defer();
            var dependencies = js;
            $script(dependencies, function () {
                $rootScope.$apply(function () {
                    deferred.resolve();
                });
            });
            return deferred.promise;
        }];
    }
    var viewCatalog = 'partials',
        jsCatalog = 'js',
        cssCatalog = 'css'
    $routeProvider
        .when('/login', {
            templateUrl: viewCatalog+'/user/login.html',
            controller: 'loginCtrl',
            css: [cssCatalog+'/user.css'],
            resolve: {
                load: angular.module('thapp').asyncjs([jsCatalog+'/ctrl/user/login.js'])
            }
        })
        .otherwise({
            redirectTo: '/login'
        });
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
// 控制登录
angular.module('thapp').run(['$rootScope', '$http', '$location', 'Context', '$window', '$timeout', function ($rootScope, $http, $location, Context, $window, $timeout) {
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
        
    });
}]);

angular.module('thapp').controller('appCtrl',appCtrlFoo);
function appCtrlFoo() {

}
