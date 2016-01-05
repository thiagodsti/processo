/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('processo', ['ui.grid']).directive('grid', function(){
    return{
        templateUrl: "js/directives/grid/grid.html",
        restrict: 'E',
        scope:{
            gridOptions:'=',
            data: '='
        },
        link: link
    }
});
function link(scope, element){
     scope.gridOptions.data = scope.data;       
}
