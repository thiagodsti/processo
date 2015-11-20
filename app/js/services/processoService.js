angular.module("processo").factory("processoService", function($http, config) {
		var _getProcesso = function () {
			return $http.get(config.baseUrl + "/processos");
		};

		var _saveProcesso = function (contato) {
		//	return $http.post(config.baseUrl + "/CadastroHoras/rest/usuarios", contato);
		};

		return {
			getProcesso: _getProcesso,
			saveProcesso: _saveProcesso
		};
});
