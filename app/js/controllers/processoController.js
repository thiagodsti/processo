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

    $scope.toggleImgSrcLista = '/icons/arrow_down.png';
    $scope.toggleImgOpenLista = false;

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
        $scope.processo = {situacao: 'ABERTO', dataVisita: new Date(), dataCriacao: new Date()};

    };

    processoService.getProcesso().success(function (data, status) {
        console.log(data);
        $scope.processos = data;
    }).error(function (data, status) {
        console.log("Não foi possível carregar os dados!");
    });

    $scope.adicionarProcesso = function (processo){
        if(validarFormulario(processo)){
          if($scope.PageMode == 'SAVE') {
            processoService.saveProcesso(processo).then(function() {
                $scope.novoProcesso();
            });
            $scope.processos.push(processo);
          } else if ($scope.PageMode == 'UPDATE') {
            processoService.updateProcesso(processo).then(function() {
                $scope.novoProcesso();
            });
          }
        } else {
            console.log('Form inválido');
        }
    };

    $scope.fecharProcesso = function (processo) {
      if(validarFormulario(processo)) {
        preencherProcesso(processo);
        processo.situacao = 'FECHADO';
        processoService.updateProcesso(processo).then(function() {
            $scope.novoProcesso();
        });
      } else {
        console.log('Form inválido');
      }

    };

    function validarFormulario(processo) {
      if ($scope.processoForm.$valid) {
        preencherProcesso(processo);
        return true;
      } else {
        return false;
      }
    }

    function preencherProcesso(processo) {
      processo.ocorrencias = $scope.ocorrencias;
      if(!processo.regularidade){
          processo.irregularidades = $scope.irregularidades;
      }
    }

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

    $scope.isProcessoClosed = function() {
      return $scope.processo.situacao == 'FECHADO';
    };

    $scope.isIrregularidadeSelected = function (){
        if($scope.irregularidade && angular.equals({}, $scope.irregularidade)){
            return false;
        }else{
            return true;
        }
    };

    $scope.selectProcesso = function(processo){
        $scope.processo = processo;
        console.log(processo);
        $scope.ocorrencias = processo.ocorrencias;
        $scope.ocorrencia = {};
        $scope.irregularidades = processo.irregularidades;
        $scope.irregularidade = {};
        $scope.PageMode = 'UPDATE';
    };

    $scope.selectOcorrencia = function(ocorrencia){
        $scope.ocorrencia = angular.copy(ocorrencia);
        $scope.selectedOcorrencia = angular.copy(ocorrencia);
    };

    $scope.selectIrregularidade = function(irregularidade){
        $scope.irregularidade = angular.copy(irregularidade);
        $scope.selectedIrregularidade = angular.copy(irregularidade);
    };

    $scope.executeActionOcorrencia = function(selectedOcorrencia){
        if(!$scope.editModeOcorrencia &&  !$scope.deleteModeOcorrencia){
            $scope.ocorrencias.push($scope.ocorrencia);
            $scope.ocorrencia = {};
        }else if($scope.editModeOcorrencia){
           var indice = $scope.ocorrencias.indexOf($scope.ocorrencia);
           $scope.ocorrencia = selectedOcorrencia;
        }
    };

    $scope.executeActionIrregularidade = function(selectedIrregularidade){
        if(!$scope.editModeIrregularidade &&  !$scope.deleteModeIrregularidade){
            $scope.irregularidades.push($scope.irregularidade);
            $scope.irregularidade = {};
        }else if($scope.editModeIrregularidade){
           var indice = $scope.irregularidades.indexOf($scope.irregularidade);
           $scope.irregularidade = selectedIrregularidade;
        }
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

    $scope.modeOcorrencia = function (edit, deleteMode){
      //$scope.ocorrencia = {data: new Date()};
      //console.log($scope.ocorrencia);
        if(edit){
          $scope.editModeOcorrencia = true;
          $scope.deleteModeOcorrencia = false;
        }else if(deleteMode){
          $scope.editModeOcorrencia = false;
          $scope.deleteModeOcorrencia = true;
          $scope.ocorrencias.pop($scope.ocorrencia);
          $scope.ocorrencia = {};
        }else{
          $scope.editModeOcorrencia = false;
          $scope.deleteModeOcorrencia = false;
        }
    };

    $scope.modeIrregularidade = function (edit, deleteMode){
        if(edit){
          $scope.editModeIrregularidade = true;
          $scope.deleteModeIrregularidade = false;
        }else if(deleteMode){
          $scope.editModeOcorrencia = false;
          $scope.deleteModeOcorrencia = true;
          $scope.irregularidades.pop($scope.irregularidade);
          $scope.irregularidade = {};
        }else{
          $scope.editModeIrregularidade = false;
          $scope.deleteModeIrregularidade = false;
        }
    };

    $scope.gridOptionsProcessos = {
        enableRowSelection: true,
        multiSelect: false,
        paginationPageSize: 12,
        paginationPageSizes: [12, 24, 36],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        columnDefs: [
          { field: 'processo',name:'Processo',headerCellClass:'', minWidth: 100, width: '*'},
          { field: 'fiscal.nome',name:'Fiscal', headerCellClass: '', minWidth: 100, width: '*' },
          { field: 'municipio.municipio', name:'Municipio',headerCellClass:'', minWidth: 100, width: '*'},
          { field: 'dataVisita', name: 'Data Visita', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', headerCellClass: '', minWidth: 100, width: '*'},
          { field: 'situacao', name: 'Situação', headerCellClass: '', minWidth: 100, width: '*'}
        ]
    };
    $scope.gridOptionsOcorrencias = {
        enableRowSelection: true,
        multiSelect: false,
        paginationPageSize: 12,
        paginationPageSizes: [12, 24, 36],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        columnDefs: [
          { field: 'data', name: 'Data', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', minWidth: 100, width: '*'},
          { field: 'titulo', name: 'Titulo', minWidth: 100, width: '*'},
          { field: 'descricao', name: 'Descricao', minWidth: 100, width: '*'}
        ]
        //        showGridFooter:true
    };

    $scope.gridOptionsIrregularidades = {
        enableRowSelection: true,
        multiSelect: false,
        paginationPageSize: 12,
        paginationPageSizes: [12, 24, 36],
        enableFullRowSelection: true,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        columnDefs: [
          { field: 'titulo', name: 'Titulo', minWidth: 100, width: '*'},
          { field: 'descricao', name: 'Descricao', minWidth: 100, width: '*'}
        ]
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
