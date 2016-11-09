function validate($scope) {
	$scope.add_req = function() {
		if ($scope.data[$scope.num].required[$scope.q]) { 
		
		//document.querySelector('#inp' + $scope.num).setAttribute('required', 'required')
			 $('#inp' + $scope.num).attr('required', 'required'); 
			  $('#inp' + $scope.num).addClass('req'); 
			 $('#txt' + $scope.num).attr('required', 'required'); 
			 $('#txt' + $scope.num).addClass('req'); 
		} else {
			 $('#inp' + $scope.num).removeAttr('required'); 
			 $('#inp' + $scope.num).removeClass('req'); 
	
			 $('#txt' + $scope.num).removeAttr('required'); 
			  $('#txt' + $scope.num).removeClass('req'); 

		}
	}
	
	$scope.add_patterns = function(pattern, inp) {
		
		
		switch (pattern) {
			case 'text' : {
				inp.attr('type', 'text');
				inp.removeAttr('pattern'); 
				
				break;
			}
			case 'email': {
				inp.attr('type', 'email');  
				inp.removeAttr('pattern'); 
				break; 
			} 
			case 'phone': {
				inp.attr('type', 'text');  
				inp.attr('pattern', '^[0-9]{1,20}$'); 
				inp.attr('title', 'only digits allowed'); 
				break;
			} 
			case 'nums' : {
				inp.attr('type', 'text');  
				inp.attr('pattern', '^[0-9]{1,20}$'); 
				inp.attr('title', 'only digits allowed'); 

			}
			
		}
	}
	
	$scope.check_required = function (req){
		if (req) return false;
		else return true; 
	} 

}