function form_directive(app) {
    app.directive('categoryForm', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/category_form.html',
            scope: true,
            controller: function ($scope, $compile) {
                $scope.type = ''; 
                
                
                $scope.subs = get_data($scope)[0];

            }
        }
    })
}