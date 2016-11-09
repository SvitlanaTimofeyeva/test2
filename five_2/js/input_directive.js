function input_directive(app) {

    app.directive('prettyInput', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/input.html',
            scope: {
                num: '=',
                input: '@input'
            },
            replace: false,
            controller: function ($scope, $rootScope) {

                animate_form($scope);

                $scope.inputData = [];

                $scope.isAnimating = false;

                $scope.invalid = false;

                // form values
                $scope.all_form_data = new Array($scope.q);

                $scope.curr = '';
                $scope.q = 0;
                $scope.field_data = [];

                $scope.clicked_cells = [];
                $scope.sm_clicked_cells = [];

                $scope.flag = false;

                $scope.instances = 0;
               

                $scope.all_data = JSON.parse($scope.input);
                $scope.data = $scope.all_data[$scope.num];


                $scope.values = $scope.data.values[$scope.q];

                // category title 
                $scope.title = $scope.data.title;

                // all questions 
                $scope.q_all = $scope.data.placeholders.length;
                $scope.small_step = 100 / $scope.q_all;

                $scope.placeholder = $scope.data.placeholders[$scope.q];
                $scope.prompt = $scope.data.prompts[$scope.q];

                $scope.get_prompt = function () {
                    $scope.prompt = $scope.data.prompts[$scope.q];
                    return $scope.data.prompts[$scope.q];
                }

                $scope.word_limit = 0;
                $scope.isMulti = false;
                $scope.multi_length = new Array();

                validate($scope, $rootScope);
                validate_2($scope);
                multi_inputs($scope);
                gather_data($scope, $rootScope); 

                $scope.subtitle = $scope.data.subtitle;

                
                $scope.view = $scope.data.view; 

                $scope.add = $scope.data.add;
                if (!$scope.add) $scope.addtext = $scope.data.addtext; 

                //input dropdown 
                if ($scope.data.style == 'drop') {
                    $scope.items = $scope.data.drop_placeholders;
                    $scope.drop_placeholders = $scope.data.drop_placeholders;

                } else {

                    $scope.items = [];

                }

                $scope.drop_loaded = false;

                // show dropdowns  
                $scope.counter = 0;
                $scope.down = function () {


                    $scope.add_req();
                    $scope.add_patterns($scope.data.patterns[$scope.q], $('#inp' + $scope.num));



                    if ($scope.data.values.length > 0 || $scope.data.info[$scope.q] == 'multidrop' ||
                    $scope.data.info[$scope.q] == 'drop') {

                        prepare_drop();

                    } else if ($scope.data.style == 'drop') {
                        //if ($scope.num == 1) $('#txt' + $scope.num).remove();
                        //$('#inp' + $scope.num).css({ 'text-shadow': '0 0 0 rgb(22, 42, 99)', 'color': 'transparent' })

                        prepare_drop();

                        $('#wrong' + $scope.num).animate({
                            opacity: 0
                        }, 200);
                        $('#inp' + $scope.num).val($scope.placeholder);
                        $('#inp' + $scope.num).css({
                            'background-color': 'rgb(157, 171, 208)'

                        });
                        if ($scope.counter > 0) return false;
                        $('#right' + $scope.num).on('click', function () {
                            $scope.counter++;
                            $('#ad' + $scope.num).slideDown(500, function () {
                                if ($scope.data.detail == '01') {
                                    $('#txt' + $scope.num).remove();
                                    $('#switch' + $scope.num).find('.switch-container').css({
                                        'margin-top': 0
                                    })
                                    $('#switch' + $scope.num).css({

                                        'margin-top': '-64px',
                                        'padding-bottom': '64px',
                                        'z-index': 9999
                                    });


                                    $('#switch' + $scope.num).fadeIn(200);
                                    $scope.handle_radio();
                                }
                            });
                            $('#right' + $scope.num).animate({
                                marginTop: '-' + ($scope.items.length + 1) * 100 + 'px'
                            }, {
                                duration: 500,
                                complete: function () {

                                    for (var i = 0; i < $('.repeat' + $scope.num).length; i++) {

                                        $scope.validate_drop($scope.data.patterns[i], $('.repeat' + $scope.num).eq(i),
                                        $scope.data.required[i]);
                                    }

                                }
                            })

                        })

                    } else if ($scope.data.style == 'multi') {
                        $('#inp' + $scope.num).animate({
                            opacity: 0
                        }, {
                            duration: 200,
                            complete: function () {
                                $scope.show_multi();
                            }
                        })
                    }

                    function prepare_drop() {



                        $('#inp' + $scope.num).css({ 'text-shadow': '0 0 0 rgb(22, 42, 99)', 'color': 'transparent' })
                        $('#inp' + $scope.num).addClass('nowrite');
                        $('#right' + $scope.num + ' img').attr('src', 'img/down.png').fadeIn(500, function () {
                            $(this).addClass('down');
                        });
                        $scope.drop = true;

                        multi_drop($scope);
                        $('#right' + $scope.num).css({
                            'background-color': '#1f467d'
                        });

                        $('#right' + $scope.num).animate({
                            width: 100 + 'px',


                        });

                    }
                }


                // change question!!! 
                $scope.change_q = function ($event) {


                    $scope.add_req();
                    if ($scope.invalid) return false;

                    if ($event) {
                        if ($event.keyCode != '13') return false;
                    }

                    if ($scope.q + 1 < $scope.q_all) {


                        if (!$scope.drop && $scope.curr.id != 'txt' + $scope.num &&
                            $scope.data.info[$scope.q] != 'leadership-pic') {


                            $scope.pretty_slide();
                            $scope.switch_placeholder();


                        } else if ($scope.drop) {


                            $scope.show_drop();
                        }
                        else if ($scope.curr.id == 'txt' + $scope.num && $scope.data.types[$scope.q + 1] != 't' &&
                              $scope.data.info[$scope.q] != 'leadership-pic') {



                            //switch next input type
                            $scope.collapse_textarea();
                            $scope.pretty_slide();


                            //$scope.switch_placeholder();
                        } else if ($scope.curr.id == 'txt' + $scope.num && $scope.data.types[$scope.q + 1] == 't' &&
                              $scope.data.info[$scope.q] != 'leadership-pic') {



                            $scope.pretty_slide();
                            $scope.switch_placeholder(true);

                        }


                    }
                    else {

                        $scope.finish();

                    }

                    if ($scope.data.types[$scope.q + 1] == 'f') {
                        if ($scope.data.detail == '00') {
              
                        $scope.add_generic($scope.curr.value)

                        } else if ($scope.data.detail == '05') {
                            $scope.add_generic($scope.curr.value)
                        }

                        if ($scope.data.types[$scope.q] == 'i') {
                            $scope.show_file($('#inp' + $scope.num));
                        } else {


                        }

                    }

                }



                // input progress bar animation 

                $scope.small_progress = function (cb, q) {


                    if (!q) {

                        q = $scope.q;

                    }



                    $('#span' + $scope.num).animate({
                        width: $scope.small_step * q + '%'
                    }, {
                        duration: 500,
                        complete: function () {

                            if (cb) cb();

                        }
                    });
                }

                // form field is done  
                $scope.f_count = 0;
                $scope.finish = function (flag) {

                    //$('#ac' + $scope.num).slideUp(200); 
                    if ($('#inp' + $scope.num).find('.rad-sel') && $scope.num == 0) {

                        var radioval = $('#inp' + $scope.num).find('.rad-sel');
                        if (radioval.hasClass('y')) {
                            $scope.add_radio(true);
                        } else {
                            $scope.add_radio(false);
                        }
                    } else {
                        if ($scope.data.detail != '04') {
                            $scope.add_generic($scope.curr.value)
                        }
                    }

                    $('#wrap' + $scope.num).addClass('valid-cat');

                    if ($scope.get_prompt()) {
                        $scope.hide_pretty_prompt();
                    }

                    $scope.done = true;
                    $scope.q++;

                    if ($scope.drop) {
                        if ($scope.q > $scope.q_all) $scope.q = $scope.q_all;

                        $scope.small_progress(cb1);

                    }
                    else {


                        $scope.small_progress(cb2);
                    }

                   
                    function cb1() {

                        $('#right' + $scope.num).fadeOut(100, function () {
                            $('#wrong' + $scope.num).fadeOut(100, function () {
                                $('.pretty-dropdown').slideUp(500, function () {
                                    
                                    if ($scope.f_count < 1) {
                                        $scope.add_drop($scope.dropvals);
                                    }
                                    $scope.f_count++;
                                    $('#meter' + $scope.num).animate({
                                        width: 100 + '%'
                                    }, {
                                        duration: 500,
                                        complete: function () {
                                            $scope.say_thanx();
                                        }
                                    })
                                });
                            })
                        });

                    }

                    function cb2() {

                        $('#right' + $scope.num + ' img').fadeOut(300, function () {

                            if ($scope.isBig && $('#txt' + $scope.num).css('opacity') != '0') {

                                $scope.hide_pretty_prompt();

                                $('#wrong' + $scope.num).fadeOut(100, function () {
                                    $('#right' + $scope.num).animate({
                                        height: '100px',
                                        marginTop: '-100px'
                                    }, {
                                        duration: 100,
                                        start: function () {

                                            $('#txt' + $scope.num).animate({
                                                height: 95 + 'px'
                                            }, {
                                                duration: 100,
                                                duration: 100,
                                                start: function () {

                                                    $('#meter' + $scope.num).animate({
                                                        width: 100 + '%'
                                                    }, {
                                                        duration: 500,
                                                        complete: function () {

                                                            $scope.say_thanx();
                                                        }
                                                    })

                                                }
                                            })


                                        }
                                    })
                                })


                            } else {

                                $('#meter' + $scope.num).animate({
                                    width: 100 + '%'
                                }, {
                                    duration: 500,
                                    complete: function () {
                                        $scope.say_thanx();
                                    }
                                })
                            }

                        })
                    }

                    // send form data
                    $scope.send_data();
                }

                //select items in dropdown 

                $scope.clicked = 0;
                $scope.listener = false;
                
                $scope.drop_num = 0;
                $scope.select_items = function ($event) {

                    // $('#inp' + $scope.num).val('Ready to go'); 
                    if (!$scope.isMulti) {
                        $('.down').addClass('rotate');
                        $('#right' + $scope.num).attr('id', 'colorchange');
                        $('#colorchange').css({
                            'background-color': '#28d68c'
                        })
                    }

                    
                    function add_listener() {
                        if ($scope.listener) return false;
                        $scope.listener = true;
                        $('#colorchange').on('click', function () {

                            //$scope.clicked++; 

                            //$scope.switch_drop = true; 
                            $('#wrong' + $scope.num).fadeOut(200, function () {
                                $('#colorchange').animate({
                                    marginRight: '300px',
                                    opacity: 0
                                }, {
                                    duration: 500,
                                    complete: function () {
                                        $('#colorchange').attr('id', 'right' + $scope.num);
                                        if ($('#right' + $scope.num).attr('id') == 'right4') {
                                            $('#s4').css({ 'display': 'none' });
                                        }
                                        $scope.p_count++;
                                        

                                        if ($scope.q == $scope.q_all) {
                                            $scope.finish();
                                        } else {
                                            $('#drop' + $scope.num).slideUp(400, function () {
                                                if ($scope.drop_num < 1) {
                                                    $scope.add_simple_drop($scope.clicked_cells);
                                                }
                                                $scope.drop_num++
                                                $('#inp' + $scope.num).fadeOut(300, function () {


                                                
                                                    $scope.q++;


                                                    // console.log($scope.data.placeholders[$scope.q] + ' ' + $scope.q) 

                                                    $scope.placeholder = $scope.data.placeholders[1];
                                                    $scope.val = $scope.placeholder;
                                                    $scope.values = $scope.data.values[1];

                                                    $scope.$apply();

                                                    $scope.map_drop_vals();
                                                    // if ($scope.clicked == 1) {

                                                    // } 

                                                    if ($scope.q == $scope.q_all) {

                                                        $scope.finish()
                                                    } else {

                                                        $scope.small_progress(null, $scope.q);
                                                    }

                                                    $('#right' + $scope.num + ' img').removeClass('rotate');
                                                    $('#right' + $scope.num).css({
                                                        'margin-top': -100 + 'px',
                                                        'margin-right': '20px',
                                                        'width': '0px',
                                                        'opacity': 1

                                                    });

                                                    $('#right' + $scope.num + ' img').css({ 'display': 'none' });

                                                    $scope.$apply();
                                                    console.log(null, $scope.q)

                                                    $(this).fadeIn(300);


                                                })

                                            })
                                        }
                                    }
                                })

                            })


                        })
                    }

                    add_listener();

                    
                    // if ($event.target.classList.contains('nowrite')) return false; 
                    if ($event.target.classList.contains('selected') && !$event.target.classList.contains('drop-item')) {

                        $event.target.style.backgroundColor = '#c3cbe1';
                        $event.target.style.color = '#9dabd0';


                        if ($event.target.classList.contains('small-cell')) {

                            //$scope.dropvals.vals.pop(); 
                            console.log($scope.dropvals)
                            $scope.dropvals.vals.pop(); 
                         
                            
                            $event.target.style.backgroundColor = '#b1bddc';
                            $event.target.style.color = '#6c7ca7';



                        }
                        if (!$event.target.classList.contains('drop-item') && $event.target.classList.contains('cell')) {
                            $scope.clicked_cells.pop();
                            console.log($scope.clicked_cells)
                        }


                        $event.target.classList.remove('selected');

                    } else {

                        if ($event.target.classList.contains('arrow-up') ||
                        $event.target.classList.contains('multi-arr') || $event.target.classList.contains('nowrite')) return false;

                        $scope.curr.style.backgroundColor = '#c3cbe1';
                        $scope.curr.style.color = '#8a97bb';

                        $scope.drop = true;
                        $event.target.style.backgroundColor = '#9dabd0';
                        $event.target.style.color = '#162a63'
                        $scope.show_right();


                        $event.target.classList.add('selected');
                        if (!$event.target.classList.contains('drop-item') && $event.target.classList.contains('cell')) {
                            $scope.clicked_cells.push($event.target.innerText); 
                        }

                        if ($event.target.classList.contains('small-cell')) {
                           
                            $scope.drop_success();
                            $('#right' + $scope.num).attr('id', 'colorchange');
                            $('#colorchange').css({
                                'background-color': '#28d68c'
                            })
                        }



                    }

                }
            }
        }
    })
}