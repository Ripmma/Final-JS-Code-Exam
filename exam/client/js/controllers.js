//Hello There friend, I need your help. Please write out the functionallity to get, write, update, and delete data. I know some of the routes have been written out. 
//Deleting and Updating should be by ID and after, I should be showing the get page. mainCtrl should also be empty. 
//To give you a hint, you have to make HTTP calls and I believe Angular has a module for that...I don't remember. 
//Please do not adjust the names of the controllers and the angular module. 


angular.module("examApp.controllers", [])

    .controller("mainCtrl", function($scope){})

    .controller("getCtrl", function($scope, $http){
    	$http.get("http://localhost:8080/api/data").then(function(response){
    		$scope.post = response.data;
    	})
    })

    .controller("postCtrl", function($scope, $http, $window){
    	$http.post('/api/post', $scope.post, { headers: { 'Content-Type': 'application/json' } })
    	.then(function(response){
    		$window.location.href = "/"
    			$scope.msg = "Gangstalicious!";
    		console.log("dope")
    	}, function(response){
    		$scope.msg = "Oh no!";
    		console.log("Crap...")
    	})
    })
    
    .controller("updateCtrl", function(){
        var p = $location.search().p

        $scope.deletePost = function(){
            $http.delete('api/delete/:id', {params :{id: p}})
            .then(function(response){
                console.log("Goodbye to whatever you just deleted...")
                $window.location.href='/'
            })
        }

        $scope.editPost = function(){
            $http.put('/api/update/:id', $scope.post, {params :{id: p}})
            .then(function(response){
                $window.location.href='/'
                console.log("Updated!")
            }), function(response){
                console.log("K... guess not?")
            }
        }
    })