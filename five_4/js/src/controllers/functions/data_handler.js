﻿function gather_data($scope, $rootScope) {

    $scope.add_multi = function (inp) {
        for (var i = 0; i < inp.length; i++) {
            $scope.data.data.push(inp.eq(i).val()); 
        }
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
    }

    $scope.send_data = function () {
        $rootScope.$broadcast('data', { data: $scope.data, field: $scope.num });
    }

    $scope.add_name = function(f,l) {
        $scope.data.f_name = f;
        $scope.data.l_name = l;
        console.log($scope.data);
    }

}

module.exports = gather_data; 