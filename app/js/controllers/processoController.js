angular.module("processo").controller("processoController", function($scope, $filter, processoService){

    $scope.processos = [];
    $scope.processo = {ocorrencia:[]};
    $scope.ocorrencia = {};

    $scope.toggleImgSrcCadastro = 'icons/arrow_up.png';
    $scope.toggleImgOpenCadastro = true;
    
    $scope.toggleImgSrcLista = 'icons/arrow_up.png';
    $scope.toggleImgOpenLista = true;
    
    $scope.isProcessSelected = false;

    processoService.getProcesso().success(function (data, status) {
        console.log(data);
        $scope.processos = data;
    }).error(function (data, status) {
        console.log("Não foi possível carregar os dados!");
    });

    $scope.adicionarProcesso = function (processo){
        console.log(processo);
        processoService.saveProcesso(processo).then(function() {
            console.log('salvo mesmo com sucesso');
        });
        $scope.processos.push(processo);
        $scope.processo = {ocorrencia:[]};
    };

    $scope.toggleImg = function (isImgOpen, item){
        if($scope[isImgOpen]){
            $scope[item] = 'icons/arrow_down.png';
            $scope[isImgOpen] = false;
        }else{
            $scope[item] = 'icons/arrow_up.png';
            $scope[isImgOpen] = true;
        }
    };
    
    $scope.adicionarOcorrencia = function(){
         $scope.processo.ocorrencia.push($scope.ocorrencia);
         $scope.ocorrencia = {};
    }

    $scope.removerProcesso = function (processo) {
        console.log(processo);
    };

    $scope.isProcessoSelecionado = function (processo) {
        //return processos.some(function (processo) {
        //	return processo.selecionado;
        //});
    };

    $scope.gridOptionsProcessos = {
        enableRowSelection: true,
        //        enableSelectAll: true,
        multiSelect: false,
        //        noUnselect: true,
        paginationPageSize: 12,
        paginationPageSizes: [12, 24, 36],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        //        showGridFooter:true
    };
    $scope.gridOptionsOcorrencias = {
        enableRowSelection: true,
        //        enableSelectAll: true,
        multiSelect: false,
        //        noUnselect: true,
        paginationPageSize: 12,
        paginationPageSizes: [12, 24, 36],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        //        showGridFooter:true
    };
    

    $scope.lista1 = [{label: 'item 1',nome:'lucas', telefone:'123'},
        {label: 'item 2', nome:'lucas', telefone:'123'},
        {label: 'item 3', nome:'lucas', telefone:'123'}];

    $scope.lista2 = [{
            id: 1,
            label: 'aLabel',
            subItem: { name: 'aSubItem' }
        }, {
            id: 2,
            label: 'bLabel',
            subItem: { name: 'bSubItem' }
        }];



});
