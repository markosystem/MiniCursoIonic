
angular.module('starter.controllers',[])

.controller("TarefaCtrl", function($scope){
	$scope.nova = {nome: ''};
	$scope.incompletas = {total: 0};
	$scope.completas = {total: 0};
	var tarefasObject = localStorage.getItem('tarefas') == null ? []:localStorage.getItem('tarefas');
	
	var a = [
	{
		nome: 'Arroz',
		feito: true
	},
	{
		nome: 'Feijão',
		feito: false
	},
	{
		nome: 'Cerveja',
		feito: false
	}];

	console.log(tarefasObject);
	console.log(a);

	$scope.tarefas = tarefasObject;

	totais();
	$scope.adicionar = function(){
		if($scope.nova.nome){
		    insert({
		        nome: $scope.nova.nome,
		        feito: false
		    });
		}
	};
	$scope.limparNaoFeitas = function(){
		var incompletas = [];
		for(var i=0;i<$scope.tarefas.length;i++){
			if($scope.tarefas[i].feito){
				incompletas.push($scope.tarefas[i]);
			}
		}
		localStorage.setItem("tarefas", JSON.stringify(incompletas));
		$scope.tarefas = localStorage.getItem('tarefas');
		console.log($scope.tarefas);
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
		$scope.tarefas = localStorage.getItem('tarefas');
		totais();
	};
	$scope.totais = function(){
		totais();
	}
	function insert(dado){
		tarefasObject.push({
	        nome: $scope.nova.nome,
	        feito: false
	    });
	    localStorage.setItem("tarefas", JSON.stringify(tarefasObject));
		$scope.nova = {nome: ''};
		totais();
	}
	function totais(){
		var totalCompletas = 0;
		for(var i=0;i<$scope.tarefas.length;i++){
			if($scope.tarefas[i].feito){
				totalCompletas++;
			}
		}
		$scope.completas = {total: totalCompletas};
		var totalIncompletas = 0;
		for(var i=0;i<$scope.tarefas.length;i++){
			if(!$scope.tarefas[i].feito){
				totalIncompletas++;
			}
		}
		$scope.incompletas = {total: totalIncompletas};
	}
})