function validate($scope, $rootScope) {
  
    // validate dropdown inputs
    var has_handler = false; 
    $scope.sm_validate = function () {
        //var reqs = $('.repeat' + $scope.num + '.req');
    
            $('#right' + $scope.num + ' img').addClass('rotate');
            $('#right' + $scope.num).css({
                'background-color': '#28d68c'
            });
            
            if (!has_handler) {
                has_handler = true;
                $('#right' + $scope.num).on('click', click_handler);
            } 


        

        function click_handler() {
            var v = {
                subtitle: $scope.data.subtitle,
                vals: [],
                placeholders: $scope.data.drop_placeholders,
                prompts: [$scope.data.prompts],
                types: $scope.data.types,
                dropvals: [],
                dropcat: [],
            }
      
            for (var i = 0 ; i < $('.repeat' + $scope.num).length - 2; i++) {
                
                v.vals.push($('.repeat' + $scope.num).eq(i).val());
            }

            var radioval1 = $('#wrap' + $scope.num).find('#switch' + $scope.num).find('.y');
            if (radioval1.hasClass('rad-sel')) {
                v.vals.push(true)
            } else {
                v.vals.push(false)
            }

            $scope.add_input_drop(v);

            $('#right' + $scope.num).animate({
                marginRight: '200px',
                opacity: 0
            }, {
                duration: 300,
                start: function () {
                   
                    $('#switch' + $scope.num).fadeOut(200);
                   
                }, 
                complete: function () {
                    $scope.finish();
                    $('#ad' + $scope.num).slideUp(500);

                }
            })

        }
    }


    // match patterns
    $scope.match_pattern = function ($event) {


        if ($('#right' + $scope.num).attr('id') == 'right1' && !$('#right' + $scope.num).hasClass('done')) {
            return false;
        }

        if ($('#right' + $scope.num).attr('id') == 'right4' || $('#right' + $scope.num).attr('id') == 'colorchange') {

            if ($scope.q < $scope.q_all) {
                $scope.show_drop();
            }
            else {
                $scope.change_q();
            }

        } else {
            $('#s' + $scope.num).css({ 'display': 'block' });
        }

        // validate input 
        var form = document.getElementsByName('form' + $scope.num)[0];
        form.onsubmit = function () {

            
            if ($scope.multi_length.length > 0 && $scope.q < $scope.q_all) {
                $scope.change_multi(); 
            } else {

                if ($('#txt' + $scope.num).css('display') != 'none') {

                    var text = $('#txt' + $scope.num).val();
                    text = text.replace(/[^a-zA-Z\s]/g, '');

                    var words = text.split(/[\s]+/);

                    //console.log('numwords', words.length);

                    if (words.length > $scope.word_limit) {
                        return false;
                    }

                }
                if ($scope.get_prompt()) {
                    $scope.hide_pretty_prompt();
                }

                if ($event) {
                    $scope.change_q($event);
                } else {
             
                    $scope.change_q();
                }
            }

        }

    }

    $scope.phone_is_focused = false;

    // show input handles  
    $scope.max = $scope.data.max;
    $scope.c = 0;

    $scope.pretty_validate = function ($event) {

        $scope.down();
        if ($scope.data.values.length == 0) {


            $scope.curr = $event.target;
            $scope.show_wrong();
        } else {

            $scope.curr = $event.target;
            $event.target.style.backgroundColor = '#9dabd0';
            $event.target.value = $scope.placeholder;

            if ($event.target.classList.contains('nowrite')) return false;
            $event.target.style.color = '#8a97bb';

            $event.target.style.color = '#162a63';


        }

        if ($scope.data.add == 0) {
            
            $scope.c++; 
            if ($scope.c < $scope.max) {
                $('#ac' + $scope.num).slideDown(200);
            }

        }
    }



    $scope.add_field = function ($event) {
        $rootScope.$broadcast('view', $scope.num);
                
        $('#form' + ($scope.num + 1)).fadeIn(300, function () {
        
                    $('#ac' + $scope.num).slideUp(300); 
                });

    }

    // check if input is empty 
    $scope.check_empty = function () {
        if ($('#inp' + $scope.num).hasClass('nowrite')) {


            $scope.curr.value = $scope.placeholder;
        }

        if ($scope.curr.value == '') {
            $scope.hide_right();
        } else {
            $scope.show_right();
        }

    }

}