
angular.module('starter.controllers',[])

.controller("TarefaCtrl", function($scope){
	initialize();
	getLocalStorage();
	$scope.adicionar = function(){
		if($scope.nova.nome){
			var tarefa;
			//if($scope.tarefas.length > 0){
				//for(var i=0;i<$scope.tarefas.length;i++){
					//if($scope.nova.nome != $scope.tarefas[i].nome){
					//	tarefa = {
					//		nome: $scope.nova.nome,
					//		feito: false
					//	};
					//}
			//	}
			//}else{
				tarefa = {
					nome: $scope.nova.nome,
					feito: false
				};
			//}
			if(tarefa != null){
				$scope.tarefas.push(tarefa);
				localStorage.setItem("tarefas", JSON.stringify($scope.tarefas));
				totais();
			}
		}
		$scope.nova = {nome: ''};
	};

	$scope.limparNaoFeitas = function(){
		var incompletas = [];
		for(var i=0;i<$scope.tarefas.length;i++){
			if($scope.tarefas[i].feito){
				incompletas.push($scope.tarefas[i]);
			}
		}
		localStorage.setItem("tarefas", JSON.stringify(incompletas));
		$scope.tarefas = JSON.parse(localStorage.getItem('tarefas'));
		totais();
	};

	$scope.limparFeitas = function(){
		var completas = [];
		for(var i=0;i<$scope.tarefas.length;i++){
			if(!$scope.tarefas[i].feito){
				completas.push($scope.tarefas[i]);
			}
		}
		localStorage.setItem("tarefas", JSON.stringify(completas));
		$scope.tarefas = JSON.parse(localStorage.getItem('tarefas'));
		totais();
	};

	$scope.totais = function(){
		totais();
	}

	function totais(){
		var totalCompletas = 0;
		var totalIncompletas = 0;
		var tarefas = [];
		
		for(var i=0;i<$scope.tarefas.length;i++){
			if(!$scope.tarefas[i].feito){
				totalIncompletas++;
				tarefas.push($scope.tarefas[i]);
			}
		}
		
		for(var i=0;i<$scope.tarefas.length;i++){
			if($scope.tarefas[i].feito){
				totalCompletas++;
				tarefas.push($scope.tarefas[i]);
			}
		}

		$scope.completas = {total: totalCompletas};
		$scope.incompletas = {total: totalIncompletas};
		localStorage.setItem("tarefas", JSON.stringify(tarefas));
		$scope.tarefas = JSON.parse(localStorage.getItem('tarefas'));
	}

	function initialize(){
		$scope.nova = {nome: ''};
		$scope.incompletas = {total: 0};
		$scope.completas = {total: 0};
	}

	function getLocalStorage(){
		if(localStorage.getItem('tarefas') == null){
			$scope.tarefas = [];
		}else{
			$scope.tarefas = JSON.parse(localStorage.getItem('tarefas'));
		}
		totais();
	}
})