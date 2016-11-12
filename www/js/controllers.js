
angular.module('starter.controllers',['ionic','ionic-toast'])

.controller("TarefaCtrl", ['$scope','ionicToast', function($scope, ionicToast){
	initialize();
	getLocalStorage();
	$scope.adicionar = function(){
		if(!$scope.nova.nome){
			showMessage('Informe um nome!','top',false);
			return;
		}
		var existe = false;
		if($scope.tarefas.length > 0){
			for(var i=0;i<$scope.tarefas.length;i++){
				if($scope.nova.nome == $scope.tarefas[i].nome){
					existe = true;
				}
			}
		}
		if(!existe){
			$scope.tarefas.push({
				nome: $scope.nova.nome,
				feito: false
			});
			Lockr.set('tarefas', $scope.tarefas);
			totais();
			$scope.nova = {nome: ''};
			showMessage('Produto cadastrado com sucesso!','top',false);
		}else{
			showMessage('O Produto já existe na lista!','top',false);
		}
	};

	$scope.limparMarcados = function(){
		var naoMarcados = [];
		for(var i=0;i<$scope.tarefas.length;i++){
			if(!$scope.tarefas[i].feito){
				naoMarcados.push($scope.tarefas[i]);
			}
		}
		if($scope.tarefas.length != naoMarcados.length){
			Lockr.set('tarefas', naoMarcados);
			$scope.tarefas = Lockr.get('tarefas');
			showMessage('Produtos marcados excluídos com sucesso!','bottom',false);
			totais();			
		}else{
			showMessage('Não existe produtos não marcados!','bottom',false);
		}
		
	};

	$scope.limparNaoMarcados = function(){
		var marcados = [];
		for(var i=0;i<$scope.tarefas.length;i++){
			if($scope.tarefas[i].feito){
				marcados.push($scope.tarefas[i]);
			}
		}
		if($scope.tarefas.length != marcados.length){
			Lockr.set('tarefas', marcados);
			$scope.tarefas = Lockr.get('tarefas');
			showMessage('Produtos Não marcados excluídos com sucesso!','bottom',false);	
			totais();		
		}else{
			showMessage('Não existe produtos marcados!','bottom',false);
		}
	};

	$scope.totais = function(){
		totais();
	}

	function totais(){
		var totalMarcados = 0;
		var totalNaoMarcados = 0;
		var tarefas = [];
		
		for(var i=0;i<$scope.tarefas.length;i++){
			if(!$scope.tarefas[i].feito){
				totalNaoMarcados++;
				tarefas.push($scope.tarefas[i]);
			}
		}

		for(var i=0;i<$scope.tarefas.length;i++){
			if($scope.tarefas[i].feito){
				totalMarcados++;
				tarefas.push($scope.tarefas[i]);
			}
		}

		$scope.marcados = {total: totalMarcados};
		$scope.naoMarcados = {total: totalNaoMarcados};
		Lockr.set('tarefas', tarefas);
		$scope.tarefas = Lockr.get('tarefas');
	}

	function initialize(){
		$scope.nova = {nome: ''};
		$scope.naoMarcados = {total: 0};
		$scope.marcados = {total: 0};
	}

	function getLocalStorage(){
		if(Lockr.get('tarefas') == null){
			$scope.tarefas = [];
		}else{
			$scope.tarefas = Lockr.get('tarefas');
		}
		totais();
		return $scope.tarefas;
	}

	function showMessage(message, position, stick){
		ionicToast.show(message, position, stick, 3000);		
	}
	
	$scope.hideToast = function(){
		ionicToast.hide();
	};
}])