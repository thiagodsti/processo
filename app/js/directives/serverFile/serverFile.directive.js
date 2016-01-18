/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('processo').directive('serverFile', function(){
    return{
        templateUrl: "js/directives/serverFile/serverFile.html",
        restrict: 'E',
        scope:{
            dataFiles:'=',
        },
        link: link,
    };
});
function link(scope, element){
    scope.clickHandler = {
        onClick : function(value){
            alert('Name: '+value);
        }
};
    
    if(!scope.dataFiles){
        scope.dataFiles = [{name:'lucas', type:'qualquer'}];
    }
    scope.gridOptionsFiles = {
        enableRowSelection: true,
        multiSelect: false,
        paginationPageSize: 12,
        paginationPageSizes: [12, 24, 36],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        columnDefs: [
            { field: 'name', name: 'Nome', minWidth: 100, width: '*'},
            { field: 'type', name: 'Tipo', minWidth: 100, width: '*'},
//            { field: 'lastModified', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', name: 'Data Modificação', minWidth: 100, width: '*'},
            { name:'Ações',cellTemplate:'<div><button ng-click=" getExternalScopes().onClick(row.entity.fullName)">Click Here</button></div>'}
        ]
    };
    
    scope.fileChanged = function(elm){
        scope.dataFiles.push(elm.files[0]);
    }
    
    scope.downloadFile = function(){
        //call service and do the job
    }
    
    scope.selecFile = function(file){
        
    }
}
