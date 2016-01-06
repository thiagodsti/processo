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
            data: '='
        },
        link: link
    };
});
function link(scope, element){
    scope.gridOptions.data = scope.data;
    angular.extend(scope.gridOptions, {
        onRegisterApi: function (gridApi) {
            //set gridApi on scope
            scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged(scope, function(row){
                var msg = 'row selected ' + row.isSelected;
                console.log(msg);
            });

            gridApi.selection.on.rowSelectionChangedBatch(scope, function(rows){
                var msg = 'rows changed ' + rows.length;
                console.log(msg);
            });
        }
    });

    scope.$watch('data', function() {
      scope.gridOptions.data = scope.data;
    });


}
