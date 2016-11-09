var a = require('../../lib/angular');


var input_directive = require('./directives/input_directive');
var form_directive = require('./directives/form_directive');
var get_data = require('./data'); 

var app = angular.module('app', [])
    .controller('mainCtrl', function ($scope, $compile) {
        $scope.cat = 1; 
		$scope.shown_cat = 1; 
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

		                $('#form-wrap').remove();

		                var html = '<category-form></category-form>';
		                var dir = $compile(html)($scope);

		                console.log(dir)
		                $scope.contentwrap.append(dir)

		                setTimeout(function () {
		                    $('.content').animate({
		                        opacity: 1
		                    }, 300)


		                    $scope.$apply();
		                }, 300)
		            }
		        })
		    } else {
		        $scope.switched = false;
		        cb(); 
		    }

		  
		}

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
        $scope.q_all = get_data($scope)[0].length; 
        
        $scope.indices = [0,1,2,3,4,5,6,7,8]

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