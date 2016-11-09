function gather_data($scope, $rootScope) {

    


        //$scope.form_data = {
        //    title: $scope.data.title,
        //    subtitle: $scope.data.subtitle, 
        //    vals: [],
        //    placeholders: $scope.data.placeholders,
        //    prompts: [$scope.data.prompts], 
        //    types: $scope.data.types,
        //    dropvals: [], 
        //    dropcat: [],

        //}
  

    //else {
    //    $scope.form_data = $scope.data.multi[$scope.q].data
    //}


    $scope.add_multi = function (inp) {
        for (var i = 0; i < inp.length; i++) {
            $scope.data.data.push(inp.eq(i).val()); 
        }

        //console.log($scope.form_data);
    }

    $scope.add_generic = function (val) {

        if (val == 'Service area of this organization') return false; 
        $scope.data.data.push(val)
        
        
    }


 
    $scope.add_drop = function (vals) {
     console.log('push')
            $scope.data.data.push({
                vals: vals.vals,
                cats: vals.cat
            });
        
 
    }

    $scope.add_input_drop = function (vals) {


        for (var i = 0; i < vals.vals.length-1; i++) {
           
                $scope.data.data.push(vals.vals[i]);
            
        }
        console.log($scope.data.data)
        console.log(vals.vals); 
    }

    $scope.add_simple_drop = function (vals) {
        
        $scope.data.data.push({
            cats: vals,
            vals: []
        });
    }

    $scope.add_radio = function (val) {
        $scope.data.data.push(val); 
    }

    var prevfile = ''; 
    $scope.add_filedata = function (val) {

        if (prevfile == val) return false; 
        prevfile = val;

        $scope.data.data.push(val); 




        //$scope.send_data();
    }

    $scope.send_data = function () {
        $rootScope.$broadcast('data', { data: $scope.data, field: $scope.num });
    }

}