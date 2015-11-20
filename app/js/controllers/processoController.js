	angular.module("processo").controller("processoController", function($scope, $filter, processoService){


    console.log('cheguei aqui');

    processoService.getProcesso().success(function (data, status) {
      console.log(data);
    }).error(function (data, status) {
      console.log("Não foi possível carregar os dados!");
    });

  });
