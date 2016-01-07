angular.module('processo').factory('dialog', ['ngDialog', function (ngDialog) {
        return function(){
            var dialog;
            var controller = function(){
                
            };
            
            dialog = ngDialog.open({
                template: 'js/factories/dialog/dialog.html',
                controller: controller(),
                overlay: true,
                showClose: true,
                disableAnimation: false,
                closeByEscape: true,
                closeByDocument: false
            });
            
            
        }
    }]);