(function() {
    'use strict';

    /* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
    angular.module('xxservices', []).value('version', '0.1')
        .service('angularLoad', angularLoad) //js，css加载
        .factory("Context",Context) //用户是否已登录
        .factory('HttpUtil',HttpUtil) // 与后台通信的服务
        .factory('OverAll',setOverAll) // 设置全局使用的对象



    function angularLoad($document, $q, $timeout) {
        var document = $document[0];

        function loader(createElement) {
            var promises = {};

            return function (url) {
                if (typeof promises[url] === 'undefined') {
                    var deferred = $q.defer();
                    var element = createElement(url);

                    element.onload = element.onreadystatechange = function (e) {
                        if (element.readyState && element.readyState !== 'complete') {
                            return;
                        }

                        $timeout(function () {
                            deferred.resolve(e);
                        });
                    };
                    element.onerror = function (e) {
                        $timeout(function () {
                            deferred.reject(e);
                        });
                    };

                    promises[url] = deferred.promise;
                }

                return promises[url];
            };
        }

        /**
         * Dynamically loads the given script
         * @param src The url of the script to load dynamically
         * @returns {*} Promise that will be resolved once the script has been loaded.
         */
        this.loadScript = loader(function (src) {
            var script = document.createElement('script');

            script.src = src;

            document.body.appendChild(script);
            return script;
        });

        /**
         * Dynamically loads the given CSS file
         * @param href The url of the CSS to load dynamically
         * @returns {*} Promise that will be resolved once the CSS file has been loaded.
         */
        this.loadCSS = loader(function (href) {
            var style = document.createElement('link');

            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = href;

            document.head.appendChild(style);
            return style;
        });
    };

    function Context($cookies) {
        return {
            /**
             * 用户是否已登录
             */
            isUserLogin : function() {
                return $cookies.staff_token != null;
            }
        }
    }

    /*与后台通信的服务*/
    function HttpUtil($http,$location,Servdatas) {
        var arry = {};
        return {
            port : port
        }

        function port(params) {
            arry = {
                method     : params.way || null,
                url        : params.url || null,
                data       : params.data || null,
                successfoo : params.success || null,
                onerrorfoo : params.warn || null,
                serverfoo  : params.error || null,
                debug      : params.debug || false,
            }

            if(arry.debug){ // 开启debug模式
                dealData();
                return;
            }

            if(isHttp().readyData()){
                var sendData = isHttp().sendData;
                $http(sendData).success(function(data,status){

                    ServerResult(data,function(payload){sendData.successfoo(payload)},sendData.onerrorfoo);

                }).error(function(data,status){
                    if(sendData.serverfoo != null){
                        sendData.serverfoo();
                    }
                    HttpError(data,status);
                })
            };
        }
        function isHttp() { // 请求前数据处理
            /*params是一个参数数组
             * [method,url,data,successfoo,onerrorfoo,serverfoo,debug]*/

            var sendData = {};
            var result = {
                sendData : sendData,
                readyData : readyData
            }
            return result;

            function readyData() {
                if(arry.successfoo == null ){
                    layer.msg('successfunction有误');
                    return;
                }

                switch (arry.method){
                    case 'get'   :
                        sendData = {
                            method : arry.method,
                            url    : arry.url,
                            params : arry.data
                        }
                        return true;
                        break;
                    case 'post'  :
                    case 'put'   :
                    case 'delete':
                        sendData = {
                            method : arry.method,
                            url    : arry.url,
                            data   : arry.data
                        }
                        return true;
                    default      :
                        layer.msg("传参有误");
                        return false;
                }
            }
        }

        // 业务成功或异常
        function ServerResult(result,onSuccess,onError) {
            if (result.resultCode == 0) {// 结果正常则调用onSuccess回调
                // onSuccess为success:true时的回调，参数为payload；

                onSuccess(typeof result.payload == 'undefined'?null:result.payload);
            }else if(result.resultCode == 4005){
                alert("您的账号异常，请重新登陆");
            }
            else if (onError == null) {// 结果不正常且没有onError则直接提示errorMessage
                layer.msg(result.resultMessage);
            } else {// 结果不正常且有onError则执行onError
                // onError为success:false时的回调，参数为errorCode,errorMessage
                onError(); // result.errorCode, result.resultMessage参数可以传错误码和错误结果
                layer.msg(result.resultMessage);
            }
        }

        /*网络报错*/
        function HttpError(data,status) {
            if (status == 401) {
                $location.path('/login');

            } else if (status == 403) {
                alert("您访问的功能受限，请联系管理员");
            }else if (data == null) {
                alert("网络繁忙，请稍后再试哦");
            }
        }

        /*假数据测试*/
        function dealData() {
            // 通过筛选从已经写好的假数据中调取想要的假数据
            var head = arry.url.split('/')[3];
            if(typeof  Servdatas[head] == 'undefined'){
                layer.msg('请在数据表中输入假数据');
                return;
            }
            for(var i = 0;i<Servdatas[head].length;i++){
                if(Servdatas[head][i].url == arry.url && Servdatas[head][i].method == arry.method){
                    arry.successfoo(Servdatas[head][i].fun(arry.data));
                    return;
                }

            }
        }
    }

    /*设置全局使用的变量*/
    function setOverAll() {
        return {};
    }
})()
