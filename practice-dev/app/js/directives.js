(function () {

    'use strict';

    /* Directives */


    angular.module('xxdirectives', []).directive('head', head)//css动态加载

    head.$injector = ['$rootScope', '$compile'];
    function head($rootScope, $compile) {
        return {
            restrict: 'E',
            link: function (scope, elem) {
                var html = '<link rel="stylesheet" ng-repeat="cssUrl in routeStyles track by $index" ng-href="{{cssUrl}}" >',
                    routeStyles = {};
                elem.append($compile(html)(scope));
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    scope.routeStyles = [];
                    if (current && current.$$route && current.$$route.css) {
                        if (!Array.isArray(current.$$route.css)) {
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function (sheet) {
                            routeStyles[sheet] = undefined;
                        });
                    }
                    if (next && next.$$route && next.$$route.css) {
                        if (!Array.isArray(next.$$route.css)) {
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function (sheet) {
                            routeStyles[sheet] = sheet;
                        });
                    }
                    for (var i in routeStyles) {
                        scope.routeStyles.push(i);
                    }
                });

            }
        };
    }
})()
