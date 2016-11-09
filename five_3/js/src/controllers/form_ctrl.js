var get_data = require('../data'); 

function form_ctrl($scope) {
    $scope.type = ''; 
                
                
    $scope.subs = get_data($scope)[0];
    console.log($scope.subs);

    var clicked = 0; 

    $scope.switch_radio = function ($event) {
        clicked++;
        if (clicked % 2 == 0) return false; 

        var id = $event.currentTarget.id;

        var e = $('#' + id);

        var y = e.find('.y'); 
        var n = e.find('.n');

        if (y.hasClass('radsel2')) {
            y.removeClass('radsel2');
            n.addClass('radsel2'); 
        } else {
            n.removeClass('radsel2');
            y.addClass('radsel2');
        }
    }
}

module.exports = form_ctrl; 