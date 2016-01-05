angular.module("processo").controller("processoController", function($scope, $filter, processoService){

    $scope.processos = [];
    $scope.processo = {};

    processoService.getProcesso().success(function (data, status) {
        console.log(data);
    }).error(function (data, status) {
        console.log("Não foi possível carregar os dados!");
    });

    $scope.adicionarProcesso = function (processo){
        console.log(processo);
        processoService.saveProcesso(processo).then(function() {
            console.log('salvo mesmo com sucesso');
        });
    };

    $scope.removerProcesso = function (processo) {
        console.log(processo);
    };

    $scope.isProcessoSelecionado = function (processo) {
        //return processos.some(function (processo) {
        //	return processo.selecionado;
        //});
    };
    
    $scope.myData = [{name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "d", age: 213},
        {name: "asdf", age: 3},
        {name: "adf", age: 123},
        {name: "asdf", age: 4},
        {name: "adf", age: 34},
        {name: "jhg", age: 6}];
    $scope.gridOptions = {
        enableRowSelection: true,
//        enableSelectAll: true,
        multiSelect: true,
        enableRowSelection: true,
//        noUnselect: true,
        paginationPageSize: 5,
        paginationPageSizes: [5, 10, 50],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        showGridFooter:true
    }



});
