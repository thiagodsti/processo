angular.module("processo").controller("processoController", function($scope, $filter, processoService){

    //Lucas utilizar o $scope.PageMode para controlar quando pode o campo ser editado ou não.

    $scope.processos = [];
    $scope.ocorrencias = [];
    $scope.irregularidades = [];
    $scope.processoHandler = {};

    $scope.titulo = '';
    $scope.descricao = '';
    $scope.ocorrencia = {};
    $scope.irregularidade = {};

    $scope.toggleImgSrcCadastro = '/icons/arrow_up.png';
    $scope.toggleImgOpenCadastro = true;

    $scope.toggleImgSrcLista = '/icons/arrow_down.png';
    $scope.toggleImgOpenLista = false;

    $scope.isProcessSelected = false;

    $scope.init = function() {
      processoService.getProcesso().success(function (data, status) {
          console.log(data);
          $scope.processos = data;
      }).error(function (data, status) {
          console.log("Não foi possível carregar os dados!");
      });

      $scope.PageMode = 'SAVE';
      $scope.ocorrencias = [];
      $scope.irregularidades = [];
      $scope.titulo = '';
      $scope.descricao = '';
      $scope.ocorrencia = {};
      $scope.irregularidade = {};
      $scope.isProcessSelected = false;
      $scope.selectedOcorrencia = {};
      $scope.selectedIrregularidade = {};
      $scope.processo = {situacao: 'ABERTO', dataVisita: new Date(), dataCriacao: new Date()};
    };

    $scope.novoProcesso = function() {
      $scope.init();
      changePagePositionSelect();
      $scope.processoHandler.unSelectAll();
    };

    $scope.adicionarProcesso = function (processo){
      if(validarFormulario(processo)){
        if($scope.PageMode == 'SAVE') {
          processoService.saveProcesso(processo).then(function() {
              $scope.novoProcesso();
              mostrarNotificacao('Processo', 'salvo com sucesso', 'info');
              changePagePositionSave();
          });
          $scope.processos.push(processo);
        } else if ($scope.PageMode == 'UPDATE') {
          processoService.updateProcesso(processo).then(function() {
              $scope.novoProcesso();
              mostrarNotificacao('Processo', 'editado com sucesso', 'info');
              changePagePositionSave();
          });
        }
      } else {
        mostrarNotificacao('Formulário Inválido.', 'Há campos inválidos no formulário', 'danger');
      }
    };

    function changePagePositionSave(){
        window.scrollTo($('#listaProcessos').position().left, $('#listaProcessos').position().top);
    }

    function changePagePositionSelect(){
        window.scrollTo($('#cadastroProcessos').position().left, $('#cadastroProcessos').position().top);
    }

    $scope.fecharProcesso = function (processo) {
      if(validarFormulario(processo)) {
        preencherProcesso(processo);
        processo.situacao = 'FECHADO';
        processoService.updateProcesso(processo).then(function() {
            $scope.novoProcesso();
            changePagePositionSave();
        });
      } else {
        mostrarNotificacao('Formulário Inválido.', 'Há campos inválidos no formulário', 'danger');
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

    function mostrarNotificacao(titulo, message, type) {
      if(type=='danger'){
        icon = 'glyphicon glyphicon-warning-sign';
      } else if (type=='info') {
        icon = 'glyphicon glyphicon glyphicon-ok';
      }
      $.notify({
        // options
        icon: icon,
        title: titulo,
        message: message
      },{
        // settings
        type: type,
        allow_dismiss: true,
        newest_on_top: false,
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
	      timer: 1000,
        placement: {
          align: 'center'
        }
      });
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
        if($scope.selectedOcorrencia && angular.equals({}, $scope.selectedOcorrencia)){
            return false;
        }else{
            return true;
        }
    };

    $scope.isProcessoClosed = function() {
      return $scope.processo.situacao == 'FECHADO';
    };

    $scope.isIrregularidadeSelected = function (){
        if($scope.selectedIrregularidade && angular.equals({}, $scope.selectedIrregularidade)){
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
        changePagePositionSelect();
    };

    $scope.selectOcorrencia = function(ocorrencia){
        $scope.ocorrencia = angular.copy(ocorrencia);
        $scope.selectedOcorrencia = angular.copy(ocorrencia);
    };

    $scope.unselectOcorrencia = function(){
        $scope.ocorrencia = {};
        $scope.selectedOcorrencia = {};
    };

    $scope.selectIrregularidade = function(irregularidade){
        $scope.irregularidade = angular.copy(irregularidade);
        $scope.selectedIrregularidade = angular.copy(irregularidade);
    };

    $scope.unselectIrregularidade = function(){
        $scope.irregularidade = {};
        $scope.selectedIrregularidade = {};
    };

    $scope.executeActionOcorrencia = function(selectedOcorrencia){
        if(!$scope.editModeOcorrencia &&  !$scope.deleteModeOcorrencia){
//            $scope.ocorrencia.data = new Date();
            $scope.ocorrencias.push($scope.ocorrencia);
            $scope.ocorrencia = {};
        }else if($scope.editModeOcorrencia){
           var indice = findOcorrenciaIndexById($scope.ocorrencia._id);
           $scope.ocorrencias[indice] = selectedOcorrencia;
           $scope.ocorrencia = selectedOcorrencia;
//           $scope.ocorrencia.data = new Date();
        }
    };

    function findOcorrenciaIndexById (id){
        var ind = 0;
        angular.forEach($scope.ocorrencias, function(oc){
            if(oc._id === id){
                return;
            }
            ind++;
        });
        return  ind;
    }

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
    };

    $scope.modeOcorrencia = function (edit, deleteMode){
      $scope.ocorrencia = {data: new Date()};
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
      $scope.irregularidade = {data: new Date()};
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
          { field: 'dataUltimaAlteracao', name: 'Ultima Alteração', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', headerCellClass: '', minWidth: 100, width: '*'},
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
          { field: 'data', name: 'Data', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', minWidth: 100, width: '*'},
          { field: 'titulo.titulo', name: 'Titulo', minWidth: 100, width: '*'},
          { field: 'descricao', name: 'Descricao', minWidth: 100, width: '*'}
        ]
    };


    $scope.fiscais = [
        {id: 1, nome: 'Thiago Diniz da Silveira'},
        {id: 2, nome: 'Luis Antônio Nunes'},
        {id: 3, nome: 'Lucas Toledo'}
    ];

    $scope.tiposDeFiscalizacao = [
        {id: 1, label: 'Fiscalização 1'},
        {id: 2, label: 'Fiscalização 2'}
    ];

    $scope.municipios = [
        {id: 1, municipio: 'Florianópolis', estado: 'SC'},
        {id: 2, municipio: 'São José', estado: 'SC'},
        {id: 3, municipio: 'Palhoça', estado: 'SC'}
    ];

    $scope.irregularidadesTitulo = [
        {id: 1, titulo: 'Irregularidade 1'},
        {id: 2, titulo: 'Irregularidade 2'}
    ];

    $scope.init();
});
