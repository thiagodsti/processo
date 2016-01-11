angular.module("processo").controller("processoController", function($scope, $filter, processoService){

  //Lucas utilizar o $scope.PageMode para controlar quando pode o campo ser editado ou não.

    $scope.processos = [];
    $scope.ocorrencias = [];
    $scope.irregularidades = [];

    $scope.titulo = '';
    $scope.descricao = '';
    $scope.ocorrencia = {};
    $scope.irregularidade = {};

    $scope.toggleImgSrcCadastro = '/icons/arrow_up.png';
    $scope.toggleImgOpenCadastro = true;

    $scope.toggleImgSrcLista = '/icons/arrow_up.png';
    $scope.toggleImgOpenLista = true;

    $scope.isProcessSelected = false;

    $scope.novoProcesso = function() {
      $scope.PageMode = 'SAVE';
      $scope.ocorrencias = [];
      $scope.irregularidades = [];
      $scope.titulo = '';
      $scope.descricao = '';
      $scope.ocorrencia = {};
      $scope.irregularidade = {};
      $scope.isProcessSelected = false;
      $scope.processo = {situacao: 'ABERTO'};
    };

    processoService.getProcesso().success(function (data, status) {
        console.log(data);
        $scope.processos = data;
    }).error(function (data, status) {
        console.log("Não foi possível carregar os dados!");
    });

    $scope.adicionarProcesso = function (processo){
      if($scope.processoForm.$valid){
        console.log(processo);
        processo.ocorrencias = $scope.ocorrencias;
        if(!processo.regularidade){
          processo.irregularidades = $scope.irregularidades;
        }
        processoService.saveProcesso(processo).then(function() {
            $scope.novoProcesso();
        });
        $scope.processos.push(processo);

      } else {
        console.log('Form inválido');
      }
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

    $scope.isOcorrenciaSelected = function (){
        if($scope.ocorrencia && angular.equals({}, $scope.ocorrencia)){
            return false;
        }else{
            return true;
        }
    };

    $scope.selectProcesso = function(processo){
        $scope.processo = processo;
        $scope.ocorrencia = {};
    };

    $scope.selectOcorrencia = function(ocorrencia){
        $scope.ocorrencia = ocorrencia;
    };

    $scope.adicionarOcorrencia = function(){
         $scope.ocorrencias.push($scope.ocorrencia);
         $scope.ocorrencia = {};
    };

    $scope.removerProcesso = function (processo) {
        console.log(processo);
    };

    $scope.isProcessoSelecionado = function (processo) {
      $scope.PageMode = 'UPDATE';
        //return processos.some(function (processo) {
        //	return processo.selecionado;
        //});
    };

    $scope.adicionarIrregularidade = function () {
      $scope.irregularidades.push($scope.irregularidade);
      $scope.irregularidade = {};
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


    $scope.fiscais = [
      {nome: 'Thiago Diniz da Silveira'},
      {nome: 'Luis Antônio Nunes'},
      {nome: 'Lucas Toledo'}
    ];

    $scope.tiposDeFiscalizacao = [
      {label: 'Fiscalização 1'},
      {label: 'Fiscalização 2'}
    ];

    $scope.municipios = [
      {municipio: 'Florianópolis', estado: 'SC'},
      {municipio: 'São José', estado: 'SC'},
      {municipio: 'Palhoça', estado: 'SC'}
    ];

    $scope.irregularidadesTitulo = [
      {titulo: 'Irregularidade 1'},
      {titulo: 'Irregularidade 2'}
    ];

    $scope.novoProcesso();




});
