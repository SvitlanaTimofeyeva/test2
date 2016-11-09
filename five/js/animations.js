             function animate_form($scope) {
				 
			
                // animations 

                // empty field 
                $scope.show_wrong = function () { 
				
				if (!$('#inp' + $scope.num).hasClass('req')) {
					$scope.show_right(true); 
					return false; 
				}
				if (!$('#txt' + $scope.num).hasClass('req')) {
					$scope.show_right(true); 
					return false; 
				}
				
				if ($scope.get_prompt()) { 
					
					$scope.pretty_prompt(); 
				
				}

					if ($scope.isBig) {
						$scope.show_big_wrong(); 
						return false; 
					}
					if ($scope.isAnimating) return false; 
					$scope.isAnimating = true; 
					
                    if ($scope.q > 0) $('#wrong' + $scope.num).css({
                        marginTop: '-100px'
                    });

                    $('#wrong' + $scope.num).animate({
                        width: 100 + 'px'
                    }, {
                        duration: 200,
                        complete: function () {
                            $('#wrong' + $scope.num + ' img').fadeIn(200, function() {
								
								$scope.isAnimating = false; 
							}); 
							
                        }
                    });
                }

                // valid input 
                $scope.show_right = function (flag) {  
					if (flag) {
						if ($scope.get_prompt()) { 
					
							$scope.pretty_prompt(); 
						
						}
					}
				
					if ($scope.isBig) {
						
						$scope.show_big_right(); 
						return false;
					} 
					
					// if ($scope.get_prompt()) {
						// 
					// }
					if ($scope.isAnimating) return false; 
					$scope.isAnimating = true;  
					
                    if ($scope.done) return false;

                    $('#right' + $scope.num).animate({
                        width: 100 + 'px'
                    }, {
                        duration: 200,
                        complete: function () {
                            $('#right' + $scope.num + ' img').fadeIn(200, function() { 
				
									$scope.isAnimating = false; 
								
							});
                        }
                    })
                }

                // invalid input 
                $scope.hide_right = function () {
					
					if ($scope.isAnimating) return false; 
					$scope.isAnimating = true; 
					
					if ($scope.get_prompt()) { 
					
					$scope.pretty_prompt(); 
				
					}
					
					
                    $scope.done = true;
                    $('#right' + $scope.num + ' img').fadeOut(300, function () {
                        $('#right' + $scope.num).animate({
                            width: 0 + 'px'
                        }, {
                            duration: 500, 
							complete: function() {
								$scope.isAnimating = false;  
								$scope.done = false;
								
							}
                        })
                    });

                }




                // animate placeholder change!!! 
                $scope.switch_placeholder = function (txt) { 
				var e; 
				if (txt) {
					e = $('#txt' + $scope.num)
				} else {
				    e = $('#inp' + $scope.num)
				}
				
                    e.animate({
                        opacity: 0
                    }, {
                        duration: 500,
                        complete: function () {

                            $scope.field_data.push({
                                cat: $scope.num,
                                index: $scope.q,
                                val: $scope.curr.value
                            })

                            $scope.curr.value = '';
                            $scope.q++;
                            $scope.placeholder = $scope.data[$scope.num].placeholders[$scope.q];

                            $scope.$apply();
                            $scope.small_progress();
							
							
							if ($scope.data[$scope.num].types[$scope.q] == 't' && !txt) {
								$(this).css({'display': 'none'}); 
								
								$scope.exp_textarea(); 
							} else {
								$(this).animate({
                                opacity: 1
								}, 500)
							}
							

                        }
                    });
                }


                // sliding block animation 
                $scope.pretty_slide = function () {

                    if ($scope.flag) return false;

                    $scope.flag = true;
                    $('#wrong' + $scope.num + ' img').fadeOut(100, function () {
                        $('#wrong' + $scope.num).fadeOut(100, function () {
                            $('#right' + $scope.num).animate({
                                marginRight: '200px',
                                opacity: 0
                            }, {
                                duration: 500,
                                complete: function () {
                                    $('#right' + $scope.num + ' img').css({ 'display': 'none' })
                                    $('#wrong' + $scope.num).css({
                                        'display': 'block',
                                        'width': '0px'
                                    })
                                    $(this).css({
                                        marginRight: '20px',
                                        width: '0px',
                                        opacity: 1
                                    })

                                    $scope.flag = false;
                                }
                            })
                        });
                    });
                }

				
				
				//show dropdown 

                $scope.show_drop = function () {

                    $scope.drop_success = function () {

                        $('.down').addClass('rotate');
                    }

                    $('#wrong' + $scope.num).animate({
 
                        marginTop: -100 * ($scope.values.length+1) + 'px'
                    }, {
                        duration: 300,
                        complete: function () {
                            $scope.show_wrong();
                        }
                    })

                    $('#right' + $scope.num).animate({

                        marginTop: -100 * ($scope.values.length+1) + 'px'
                    }, 300)

                    $('.pretty-dropdown').slideDown(300, function () {

                        

                        $('#inp' + $scope.num).css({
                            'cursor': 'pointer'

                        });

             
                    });
                } 
				
				// expand textarea 
				$scope.exp_textarea = function() { 
				$scope.isAnimating = true; 
					$('#txt' + $scope.num).val(''); 
					
					$('#txt' + $scope.num).fadeIn(400, function() {
						
						$('#txt' + $scope.num).animate({
							height: '195px'
						}, {
							duration: 300, 
							complete: function() {
								
								$scope.isBig = true; 
								$('#wrong' + $scope.num).css({
									'margin-top': '-200px', 
									'height': '200px' 
								})
								
										$('#right' + $scope.num).css({
											'margin-top': '-200px', 
											'height': '200px' 
										})
									
									$scope.isAnimating = false; 
								
							
							}
							
						})
					}); 
				} 
				
				//animations for textarea 
				$scope.show_big_wrong = function() { 
					if ($scope.isAnimating) return false; 
					$scope.isAnimating = true; 
					$('#wrong' + $scope.num).animate({
						width: '100px'
					}, {
						duration: 200, 
						complete: function() {
								
								$('#wrong' + $scope.num + ' img').fadeIn(200, function() {
								$scope.isAnimating = false; 
							})
						}
					})
				
					
				} 
				
				$scope.show_big_right = function() {
					//if ($scope.get_prompt())$scope.hide_pretty_prompt(); 
					if ($scope.isAnimating) return false; 
					$scope.isAnimating = true; 
					$('#right' + $scope.num).animate({
						width: '100px'
					}, {
						duration: 200, 
						complete: function() {
							
							$('#right' + $scope.num + ' img').fadeIn(200, function() {
									$scope.isAnimating = false; 
							})
						}
					})
					
				}
				
				
				// pretty prompt 
				$scope.pretty_prompt = function() {
					if ($scope.get_prompt()) {
						$('#p' + $scope.num).animate({
							marginTop: '0px'
						}, {
							duration: 200, 
							complete: function() {
								$(this).find('span').fadeIn(100); 
							}
						})
					}
					
				} 
				
				$scope.hide_pretty_prompt = function() {
	
						$('#p' + $scope.num).animate({
							marginTop: '-50px'
						}, {
							duration: 300, 
							complete: function() {
								$(this).find('span').fadeOut(300); 
							}
						})
				
				}
				
				// svg animation 
				$scope.animate_check = function () {
					
				
					var cool_check = new Vivus('check' + $scope.num , {  
					
						duration: 50, 
						type: 'async', 
						start:'autostart', 
						onReady: function() { 
							$('#check' + $scope.num).fadeIn(100); 
							$('#t' + $scope.num).fadeIn(200); 
						}
					})
				} 
				
				// make thank-you overlay visible 
				$scope.say_thanx = function() { 
				
					if ($scope.instances >= 1) {
						return false; 
					} 
					
					$scope.instances++; 
					
					$('#thanx' + $scope.num).fadeIn(200, function() {
						$scope.animate_check(); 
					})
				} 


				$scope.collapse_textarea = function() {  
				
				
					$('#wrong' + $scope.num).css({
						'height': '100px', 
						'margin-top': '-100px'
					}) 
					$('#right' + $scope.num).animate({
						height: '100px', 
						marginTop: '-100px'
					}, 250); 
					
					//$('#txt' + $scope.num).css({'position': 'absolute'}); 
					$('#txt' + $scope.num).animate({
						height: '95px'
					}, {
						
						duration: 300, 
						complete: function() {
							$(this).animate({
								opacity: 0
							}, {
								duartion: 300, 
								complete: function() { 
									
									$scope.q++; 
									$scope.placeholder = $scope.data[$scope.num].placeholders[$scope.q]
									
									$scope.$apply(); 
							
									
									
									$('#inp' + $scope.num).val(''); 
									//$('#inp' + $scope.num).css({'position': 'absolute'})  
									$('#inp' + $scope.num).css({
										'display': 'block', 
										'opacity': 0
									})
									//$scope.hide_pretty_prompt(); 
									$('#txt' + $scope.num).css({'display': 'none'})
									$('#inp' + $scope.num).fadeIn(300, function(){
										$(this).animate({opacity: 1}, {
											duration: 300
										})
									})
								}
							})
							
					
						
							
						}
					})
				} 
				
				
				// show file input 
				
				$scope.show_file = function(inp, flag) { 
					
					if (flag) {
						$('#inp' + $scope.num).css({'display': 'none'})
					}
				

					inp.animate({
						opacity: 0
					}, {
						duration: 300, 
						complete: function() {
							$(this).css({
								'display': 'none', 
								'opacity': 1
							}); 
							
							$('#wrap' + $scope.num).css({
								'height': '100px'
							}); 
							$('#f' + $scope.num).fadeIn(300, function() { 
								$(this).on('click', $scope.add_file($(this))); 
							})
					
							
						}
					})
				} 
				
				$scope.add_file = function(inp) {
					
					inp.on('click', function() {
						$(this).on('change', function() {
							$('#f' + $scope.num).animate({
								width: '100%'
							}, {
								duration: 500, 
								complete: function() {
								$(this).fadeOut(300, function() {
									//$scope.change_q(); 
									$scope.q = 8;  
									$scope.placeholder = $scope.data[$scope.num].placeholders[$scope.q]
									
									$scope.$apply();  
									$scope.small_progress(null, 8); 
									
									$('#inp' + $scope.num).fadeIn(300); 
								})
					
								
								}
							})
						})
					})
				}
				
			 }   