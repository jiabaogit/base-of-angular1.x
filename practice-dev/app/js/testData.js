/**
 * Created by JiaBao on 2016/11/22.
 */
// 把假数据作为数组，fun可以进行操作，如改变数据的属性值
angular.module("testModel",[]);

angular.module("testModel")
    .factory('Servdatas',function(){
    return{
        user:[{
            url : '/serverth/publics/user/v1/login',
            method : 'post',
            fun : function(){
                return{
                    "resultCode": 0,
                    "resultMessage": "string",
                    "userName": "string",
                    "resources": [
                        {
                            "id": 0
                        }
                    ]
                }
            }

        }]
    }
})
