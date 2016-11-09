angular.module('app', [])
    .controller('mainCtrl', function ($scope) {
        $scope.cat = 1; 
		$scope.shown_cat = 1; 
        $scope.all = 2;
        $scope.step = 100 / $scope.all;  
		
		$scope.isValid = function() {
			
			var fields = document.querySelectorAll('.valid-cat'); 
			if (fields.length < 6) {
				return false; 
			} else {
				return true; 
			}
		}

        $scope.change_cat = function (flag) { 
		
			if (!$scope.isValid()) {
				$('#err').html('Form contains invalid data!'); 
				return false; 
			} else {
				$('#err').html(''); 
			}
   
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
                               $('.content').fadeOut(500);
                               $('.thanx').css({
                                   'margin-top': window.innerHeight / 2 - 30 + 'px'
                               });
                               $('.thanx').fadeIn(500);
                           });
                       }
                         if (flag) {
                        $('.meter-top').fadeOut(500);
                   }
               }
           })
        } 

    })
    .controller('inputCtrl', function ($scope) {
           
           

            $scope.q = 0;
            $scope.q_all = 5; 

            $scope.indices = [0,1,2,3,4,5]; 

            $scope.inputs = JSON.stringify([
                {
                    title: 'Basic Organization Information',
                    placeholders: [' Employer Identification Number (EIN)*',
                    'Full legal name of the organization*',
                    'Your organization is also known as (AKA)',
                    'Please add your organization mission statement here.', 
					'Please include your organization history', 
					'Please describe your organization’s work', 
					'Add a tagline for your organization', 
					'Please insert your organization logo here.', 
					'Number of staff at your organization', 
					'Primary contact Full Name', 
					'Primary contact email', 
					'Primary contact phone number', 
					'Can an individual or an organization contact you regarding your organization'
					],
                    types: ['i', 'i', 'i', 't', 't', 't', 'i', 'f', 'i', 'i', 'i', 'i', 'i'],
                    prompts: ['Employer Identification Number in the following format XX-XXXXXXX (9 digits)',
                    null, null, '30 words limit', '30 words limit', '30 words limit', null, null, null, 'First name and last name', null, null, 'Type in yes or no'],
                    values: [], 
					patterns: ['nums', 'text', 'text', 'text', 'text', 'text', 'text', 'file', 'nums', 'text', 'email', 'phone', 'text'], 
					required: [1,1,0,0,0,0,0,0,0,0,0,0,0]

                },
                {
                    title: 'Address',
                    placeholders: ['Main/physical address*', 'Building/suite number', 'State', 'City', 'Zip Code', 'Country', 'Is this your primary address?', 'Your organization\'s second service address'], 
                    types: ['i', 'i', 'i', 'i', 'i', 'i', 'i', 't'],
                    prompts: [null, null, null, null, null, null, 'Type in yes or no', null],
                    values: [], 
					patterns: ['text', 'nums', 'text', 'text', 'nums', 'text', 'text', 'text'], 
					required: [1,0,0,0,0,0,0,0]

                },
                {
                    title: 'Fiscal Year Information',
                    placeholders: ['Fiscal year start date*', 'Fiscal year end date*',
                        'Asset Amount', 'Asset Amount Year', 'Revenue Amount', 'Revenue Amount Year', 'Income Amount', 'Income Amount Year', 'Year when your organization was founded*', 
						'Year when your organization was incorporated'],
                    types: ['i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i'],
                    prompts: [null, null, 'An amount from the most recent 990 return by your organization', 'Please add the year that corresponded to your organization`s asset amount'], 
                    values: [],
					patterns: ['nums', 'nums', 'nums', 'nums', 'nums', 'nums', 'nums', 'nums', 'nums', 'nums'], 
					required: [1,1,0,0,0,0,0,0,1,0]

                },
                {
                    title: 'National Taxonomy of Exempt Entities (NTEE)', 
                    placeholders: ['Select your organization type*', 'Service area of your organization*'],
                    types: ['d', 'd'],
                    values: [[
                        'Nonprofit Organization',
                        'School',
                        'Faith Based organization',
                        'Association'

                    ], [
						'Health',
						'Education',
						'Financial Stability', 
						'Income', 
						'Food Supply'

					]],
                    prompts: [null, null],
					patterns: [], 
					required: []
                },
                {
                    title: 'Region(s) that your organization currently serves',
                    placeholders: ['Geographic area(s) served by this program*', '5 digit zip code of the regions you serve*'],
                    types: ['i'],
                    prompts: [null],
                    values: [], 
					patterns: ['text', 'nums'], 
					required: [1,0]
                },
                {
                    title: 'Leadership Information',
                    placeholders: ['Leadership Full Name', 'Leadership Job Title', 'Leadership Bio', 'Leadership Contact Phone with extension', 'Leadership Contact Email'],
                    types: ['i', 'i', 't', 'i', 'i', 'i'],
                    prompts: ['Your current senior leadership information.',
                    null, 'Please provide up to 50 word professional bio of your senior leadership team'],
                    values: [], 
					patterns: ['text', 'text','text', 'phone', 'email'], 
					required: [0,0,0,0,0]					
                }
            ]);


     })
    .directive('prettyInput', function () {
        return {
            restrict: 'E',
            template: `
                <label class="form-label">{{title}}</label>
                <div class ="wrap" id="wrap{{num}}">
						<textarea id="txt{{num}}" ng-keydown="match_pattern($event)" placeholder="{{placeholder}}" class="form-textarea" ng-focus="pretty_validate($event)" ng-change="check_empty()" ng-model="val"></textarea>
                        <input id="inp{{num}}" ng-keydown="match_pattern($event)" ng-focus="pretty_validate($event)" ng-change="check_empty()" ng-model="val" class ="form-input" placeholder="{{placeholder}}" />
                        <div class ="big-input-meter" id="meter{{num}}"></div>

						<label id="f{{num}}" class="label-wrap">
						<span>Add file</span>
						<input type="file" id="f_inp{{num}}">
						</label>
                     <div class ="pretty-dropdown" id="drop{{num}}">
                       <div class ="cell" ng-click="select_items($event)" ng-repeat="value in values">
                    {{value}}
                    </div>
                </div>
               </div>
                <div class ="right" id="right{{num}}" ng-click="match_pattern()"> 
					<input type="submit"  class="submit" id="s{{num}}"/>
                    <img class="icon" src="img/arr.png" />
                </div>
                <div class ="wrong" id="wrong{{num}}">
                     <img class ="icon" src="img/cross.png" />
                </div> 
				
				<div class="check" id="thanx{{num}}">
				<svg version="1.1" id="check{{num}}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="75px" height="75px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
				<path fill="none" stroke="#fff" stroke-linecap="round" stroke-width="5" stroke-miterlimit="5" id="checkmark" d="M41.8,18.4L24.061,35.045l-1.838,1.524c-1,1-2.049,0.238-3.049-0.762L8.8,26.9
					c-0.925-1.495-0.477-2.571,0.106-3.109l0.583-0.045c0.135-0.224,0.852,0.045,1.659,0.493l10.223,8.519l17.486-16.096
					c0.763-0.717,2.152-1.435,2.646-1.166L42.04,15.9C42.398,16.528,42.8,17.4,41.8,18.4z"></path>
				</svg>
					
				<p class="thanx-p" id="t{{num}}">Thank you!</p>

				</div>

				
				<div class="prompt" id="p{{num}}"><span>{{prompt}}</span></div>
				
                <div class ="input-meter">
                    <div class="meter-span" id="span{{num}}"></div>
                </div>


                `,
            scope: {
                num: '=',
                input: '@input'
            },
            replace: false,
            controller: function ($scope) {
				
				animate_form($scope); 
			
				$scope.isAnimating = false; 

				$scope.invalid = false; 
	
				
                $scope.curr = '';
                $scope.q = 0;
                $scope.field_data = [];

                $scope.clicked_cells = []; 

                $scope.flag = false; 
				
				$scope.instances = 0; 


                $scope.data = JSON.parse($scope.input);
                $scope.values = $scope.data[$scope.num].values[$scope.q];

                $scope.title = $scope.data[$scope.num].title;

                $scope.q_all = $scope.data[$scope.num].placeholders.length;
                $scope.small_step = 100 / $scope.q_all;

                $scope.placeholder = $scope.data[$scope.num].placeholders[$scope.q]; 
				$scope.prompt = $scope.data[$scope.num].prompts[$scope.q];  
				
				$scope.get_prompt = function() { 
					$scope.prompt = $scope.data[$scope.num].prompts[$scope.q];  
					return $scope.data[$scope.num].prompts[$scope.q];  
				}
				

				
				validate($scope); 
				
				
				
				

                $scope.down = function () {
						$scope.add_req(); 
						$scope.add_patterns($scope.data[$scope.num].patterns[$scope.q], $('#inp' + $scope.num)); 
                    if ($scope.data[$scope.num].values.length > 0) {
						
						$('#inp' + $scope.num).addClass('nowrite'); 
                        $('#right' + $scope.num + ' img').attr('src', 'img/down.png').fadeIn(500, function () {
                            $(this).addClass('down'); 
                        });
                        $scope.drop = true;
                        $('#right' + $scope.num).css({
                            'background-color': '#1f467d'
                        });

                        $('#right' + $scope.num).animate({
                            width: 100 + 'px',
                         

                        });

                       
                    }
                }

                $scope.match_pattern = function($event) {
					
					if ($('#right' + $scope.num).attr('id') == 'right3' || $('#right' + $scope.num).attr('id') == 'colorchange') {
						
						if ($scope.q < $scope.q_all) {
						$scope.show_drop(); }
						else {
							$scope.change_q(); 
						}						
						
					} else {
						$('#s' + $scope.num).css({'display': 'block'}); 
					}
					
					var form = document.getElementById('myForm'); 
					form.onsubmit = function() { 
			
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

                $scope.pretty_validate = function ($event) { 

                    $scope.down(); 
                    if ($scope.data[$scope.num].values.length == 0) {
                        $scope.curr = $event.target;
                        $scope.show_wrong();
                    } else {

                        $scope.curr = $event.target;
                        $event.target.style.backgroundColor = '#9dabd0';
                        $event.target.style.color = '#8a97bb';
                        $event.target.value = $scope.placeholder; 
                        $event.target.style.color = '#162a63'; 

                    
                    }

                }

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
	
				
		
                // change question!!! 
                $scope.change_q = function ($event) { 
				
					
					$scope.add_req(); 
                    if ($scope.invalid) return false; 
					
					if ($event) {
						if ($event.keyCode != '13') return false; 
					}
					
					if ($scope.q + 1 < $scope.q_all) {
						if (!$scope.drop && $scope.curr.id != 'txt' + $scope.num ) {

							$scope.pretty_slide();
							$scope.switch_placeholder();


						} else if ($scope.drop) {

						  
							$scope.show_drop(); 
						}
						else if ($scope.curr.id == 'txt' + $scope.num && $scope.data[$scope.num].types[$scope.q+1] != 't') { 
							
							
							//switch next input type
							$scope.collapse_textarea();  
							$scope.pretty_slide(); 
							
							
							//$scope.switch_placeholder();
						} else if ($scope.curr.id == 'txt' + $scope.num && $scope.data[$scope.num].types[$scope.q+1] == 't') {
							$scope.pretty_slide();
							$scope.switch_placeholder(true);
						} 
					}
                    else {
					
                        $scope.finish();

                    } 
					
					if ($scope.data[$scope.num].types[$scope.q+1] == 'f') { 
						if ($scope.data[$scope.num].types[$scope.q] == 'i') {
							$scope.show_file($('#inp' + $scope.num)); 
						} else {
						
							//$scope.show_file($('#inp' + $scope.num), true); 
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
						console.log($scope.q)
                            if (cb) cb(); 
							
                        }
                    });
                }

                // form field is done 
                $scope.finish = function (flag) {

					$('#wrap' + $scope.num).addClass('valid-cat'); 
				
					if ($scope.get_prompt()) {
						$scope.hide_pretty_prompt(); 
					}
							
                    $scope.done = true; 
                    $scope.q++;

                    if ($scope.drop) { 
						if ($scope.q > $scope.q_all) $scope.q = $scope.q_all; 
                        $scope.small_progress(cb1);
                    } else {
                     
                     
                        $scope.small_progress(cb2);
                    }

                    function cb1() {
                        $('#right' + $scope.num).fadeOut(100, function () {
                            $('#wrong' + $scope.num).fadeOut(100, function () {
                                $('.pretty-dropdown').slideUp(500, function () {
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
							
							if ($scope.isBig && $('#txt' + $scope.num).css('opacity') != '0' ) {
								
								$scope.hide_pretty_prompt(); 
								
								$('#wrong' + $scope.num).fadeOut(100, function() {
									$('#right' + $scope.num).animate({
										height: '100px', 
										marginTop: '-100px'
									}, {
										duration: 100, 
										start: function() {
										
										
													$('#txt' + $scope.num).animate({
													height: 95 + 'px' 
													}, {
													duration: 100, 
													start: function() { 
													
																$('#meter' + $scope.num).animate({
																	width: 100 + '%'
																}, {
																	duration: 500, 
																	complete: function() { 
																		
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
                }

                //select items in dropdown 

				$scope.clicked = 0; 
				$scope.listener = false; 
				
                $scope.select_items = function ($event) {

					$('#inp' + $scope.num).val('Ready to go'); 
                    $('.down').addClass('rotate');
                    $('#right' + $scope.num).attr('id', 'colorchange');
                    $('#colorchange').css({
                        'background-color': '#28d68c'
                    })

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
                                complete: function() {
                                    $('#colorchange').attr('id', 'right' + $scope.num);
									if ($('#right' + $scope.num).attr('id') == 'right3' ) {
															$('#s3').css({'display': 'none'}); 
														}
                                    $scope.p_count++; 
									
							
                                    if ($scope.q == $scope.q_all) {
										$scope.finish(); 
									} else {
										$('#drop' + $scope.num).slideUp(400, function() {
											$('#inp' + $scope.num).fadeOut(300,function() {
												
												
											
													$scope.q++; 
													
											
													// console.log($scope.data[$scope.num].placeholders[$scope.q] + ' ' + $scope.q) 
													
													$scope.placeholder = $scope.data[$scope.num].placeholders[1]; 
													$scope.val = $scope.placeholder; 
													$scope.values =  $scope.data[$scope.num].values[1]; 
													
													$scope.$apply();   
														// if ($scope.clicked == 1) {
															
														// } 
													
														if($scope.q == $scope.q_all) {
															
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
													 
													 $('#right' + $scope.num + ' img').css({'display': 'none'}); 
													
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
				 
                    if ($event.target.classList.contains('selected')) {
                        $event.target.style.backgroundColor = '#c3cbe1';
                        $event.target.style.color = '#9dabd0';
                        $scope.clicked_cells.pop(); 

                    } else {

                        $scope.curr.style.backgroundColor = '#c3cbe1';
                        $scope.curr.style.color = '#8a97bb';

                        $scope.drop = true;
                        $event.target.style.backgroundColor = '#9dabd0';
                        $event.target.style.color = '#162a63'
                        $scope.show_right();

                        $scope.clicked_cells.push($event.target.innerText)
                        $event.target.classList.add('selected');



                    }
               
                }



				
				
		
          
            }
        }
    })
