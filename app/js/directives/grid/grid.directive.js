/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('processo', ['ui.grid', 'ui.grid.selection', 'ui.grid.moveColumns', 'ui.grid.pagination', 'ui.grid.resizeColumns']).directive('grid', function(){
    return{
        templateUrl: "js/directives/grid/grid.html",
        restrict: 'E',
        scope:{
            gridOptions:'=',
            data: '=',
            model: '@'
        },
        link: link
    };
});
function link(scope, element){
    if(!scope.data){
        scope.gridOptions.data = [];
    }else{
        scope.gridOptions.data = scope.data; 
    }
    angular.extend(scope.gridOptions, {
        onRegisterApi: function (gridApi) {
            //set gridApi on scope
            scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged(scope, function(row){
                if(row.isSelected){
                    scope.$parent[scope.model] = row.entity;
                }else{
                    scope.$parent[scope.model] = {};
                }
                
            });
        }
    });

    scope.$watch('data', function() {
        if(!scope.data){
            scope.gridOptions.data = [];
        }else{
            scope.gridOptions.data = scope.data; 
        }
    });


}
