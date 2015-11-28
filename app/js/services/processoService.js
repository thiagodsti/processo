angular.module("processo").factory("processoService", function($http, $q, config) {
		var _getProcesso = function () {
			return $http.get(config.baseUrl + "/processos");
		};

		var _saveProcesso = function (processo) {
			var deferred = $q.defer();
			$http.post(config.baseUrl + "/processos", processo).success(function() {
				console.log('sucesso');
			}).error(function (msg, code) {
				deferred.reject(msg);
				console.log('erro ' + code);
			});
			return deferred.promise;
		};

		return {
			getProcesso: _getProcesso,
			saveProcesso: _saveProcesso
		};
});
