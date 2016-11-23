angular.module('thapp').register.controller('loginCtrl',loginCtrl);

/*@ngInject*/
function loginCtrl(HttpUtil) {
    var data = {
        username : 'asdef',
        password : 'sdf',
        verifyCode : 'sdf'
    }
    HttpUtil.port({
        way : 'post',
        url : '/serverth/publics/user/v1/login',
        data : data,
        success : function (payload) {
            console.log(payload);
        },
        debug : true
    })
}