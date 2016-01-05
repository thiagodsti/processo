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
        {name: "Enos", age: 34},
        {name: "Enos", age: 34},
        {name: "Enos", age: 34},
        {name: "Enos", age: 34},
        {name: "Enos", age: 34},
        {name: "Enos", age: 34}];
    $scope.gridOptions = {
        exporterMenuCsv: false,
        enableGridMenu: true
    };



});
