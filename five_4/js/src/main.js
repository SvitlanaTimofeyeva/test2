var a = require('../../lib/angular');
var b = require('../../lib/angular-route.min.js'); 

var input_directive = require('./directives/input_directive');
var form_directive = require('./directives/form_directive');
var get_data = require('./data'); 

var app = angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            template: `
            <div class ="title" id="cat-title">organization information</div>
            <div class ="col-md-12" id="form-wrap" ng-controller="inputCtrl">
                <!-- <form id="myForm" name="ContactForm"> -->
                    <div class ="inp-container" ng-repeat="index in indices track by $index">
                        <pretty-input num="index" input="{{inputs}}"></pretty-input>
                    </div>
                <!-- </form> -->
            </div>
            <button id="continue-btn" ng-click="change_cat()">Continue</button>
		    <p id="err"></p>
                `
        })
        .when('/view', {
            template: `

            <div class ="form-wrap-2">
                <category-form></category-form>
            </div>
            <button id="continue-btn" ng-click="change_cat()">Continue</button>
		    <p id="err"></p>
            `
        })
    })
    .controller('mainCtrl', function ($scope, $compile, $location) {
        $scope.cat = 1; 
        $scope.shown_cat = 1;
        $scope.cat_index = 0; 
        $scope.all = 2;
        $scope.step = 100 / $scope.all;  
		
        $scope.contentwrap = $('.form-wrap-2'); 
		$scope.formData = []; 
		
		$scope.isValid = function() {
			
			var fields = document.querySelectorAll('.valid-cat'); 
			if (fields.length < 6) {
				return false; 
			} else {
				return true; 
			}
		}
         
        
		$scope.show_big_form = function (cb) {

		    if ($scope.switched) {
		        $('.content').animate({
		            opacity: 0

		        }, {
		            duration: 500,
		            complete: function () {

		                $location.path('/view');
		                $('.all-wrap').css({
                            'display': 'none'
		                })
		                $scope.$apply();

		               
                      
		            }
		        })
		    } else {
		        $scope.switched = false;
		        cb(); 
		    }

		  
		}

		$scope.$on('$routeChangeSuccess', function () {
		    if ($location.path == '/') {
		        $scope.switched = false; 
		    }
		    setTimeout(function() {
		        $('.all-wrap').fadeIn(700);
		    },500) 
		});

		$scope.switched = false;


		$scope.change_cat = function () { 
		    
		    function cb() { 
		        $('.meter-top span').animate({

		            width: $scope.step * ($scope.cat + 1) + '%'
		        }, {
		            duration: 1000,
		            start: function() {
		                $scope.shown_cat++;
		            }, 
		            complete: function () {

		                if ($scope.cat == 1) {

		                    $scope.cat++;
				            
		                    $('.stats').fadeOut(300, function () {
		                        $('.progress-bar-top').fadeOut(500);
		                        $('.thanx').css({
		                            'margin-top': window.innerHeight / 2 - 30 + 'px'
		                        });
		                        $('.content').fadeOut(500, function () {

		                            $('.thanx').fadeIn(700);
		                        });
		                
		                    });
		                }
		                if (flag) {
		                    $('.meter-top').fadeOut(500);
		                }
		            }
		        })
		    }

		    if (!$scope.switched) { $scope.switched = true; } else {
		        $scope.switched = false; 
		    }
		    $scope.show_big_form(cb);
        }

        window.s = $scope; 


    })
    .controller('inputCtrl', function ($scope) {
           
        $scope.q = 0;


        $scope.q_all = get_data($scope)[$scope.cat_index].length; 
       
        $scope.q_arr = new Array($scope.q_all);
        $scope.q_arr.fill(0); 

        $scope.indices = $scope.q_arr.map(function (item, i) {
            return i; 
        })


        $scope.$on('data', function (e, d) {
            console.log(d);
            $scope.refresh_data(d.data, d.field)
            $scope.formData.push(d);

        })
		
        $scope.$on('view', function (e, i) {
            $scope.set_view(i)
        })

     })
    
input_directive(app);
form_directive(app);