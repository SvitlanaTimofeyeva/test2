function animate_form($scope) {

                // empty field 
                $scope.show_wrong = function () { 
				
                if (!$('#inp' + $scope.num).hasClass('req')) {
                    if ($scope.data.patterns[$scope.q] != 'name') {
                        $scope.show_right(true);
                    } else {
                        $scope.show_right(true, true);
                    }
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
                $scope.show_right = function (flag, flag2) {  
					if (flag) {
						if ($scope.get_prompt()) { 
					
							$scope.pretty_prompt(); 
						}
					} 
				
					if ($scope.isBig) {
						
						$scope.show_big_right(); 
						return false;
					} 
					

					if ($scope.isAnimating) return false; 
					$scope.isAnimating = true;  
					
                    if ($scope.done) return false;

                    if (!flag2) {
                        $('#right' + $scope.num).animate({
                            width: 100 + 'px'
                        }, {
                            duration: 200,
                            complete: function () {
                                $('#right' + $scope.num + ' img').fadeIn(200, function () {

                                    $scope.isAnimating = false;
                                });
                            }
                        })
                    } else {
                        $('#right' + $scope.num).css({
                            'height': '300px',
                            'margin-top': '-300px'
                        });

                        setTimeout(function () {
                            $('#right' + $scope.num).animate({
                                width: 100 + 'px'
                            }, {
                                duration: 200,
                                complete: function () {
                                    $('#right' + $scope.num + ' img').fadeIn(200, function () {

                                        $scope.isAnimating = false;
                                    });
                                }
                            })

                        },300)

                    }
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

							if ($('#inp' + $scope.num).inputmask) {
								$('#inp' + $scope.num).css({'color': '#8a97bb'}); 
								$('#inp' + $scope.num).inputmask('remove'); 
								
							} 
							$('#inp' + $scope.num).maskMoney('destroy'); 
							
                            $scope.field_data.push({
                                cat: $scope.num,
                                index: $scope.q,
                                val: $scope.curr.value
                            })

                            // get data!!! 
                            if ($scope.data.detail != '01') {
                                $scope.add_generic($scope.curr.value);
                            } 

                            $scope.curr.value = '';
                            $scope.q++;
                            $scope.placeholder = $scope.data.placeholders[$scope.q];

         
                            $scope.$apply();

                                $scope.small_progress();

							if ($scope.data.types[$scope.q] == 't' && !txt) {
								$(this).css({'display': 'none'}); 
								
								$scope.exp_textarea();

							} else {
								$(this).animate({
                                opacity: 1
								}, {
									
									duration: 500, 
									complete: function() {
											if ($scope.data.detail == '00' && $scope.q == 11 && !$scope.phone_is_focused) {
												$scope.phone_is_focused = true;  
												$scope.add_patterns('phone', $('#inp' + $scope.num))
												
												console.log('click')
												$('#inp' + $scope.num).trigger('click'); 
										}
								    }
								})
							}
                        }
                    })
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

					if ($('#p' + $scope.num).text().length > 120) { 
					$('#p' + $scope.num).css({'height': '70px'})
					}  else if ($scope.data.info[$scope.q] == 'radio') { 
					
							$scope.show_radio(); 

					} else {
							$('#p' + $scope.num).css({'height': '50px'})
					}
							
						$('#p' + $scope.num).animate({
							marginTop: '0px'
						}, {
							duration: 200, 
							complete: function() {
								$(this).find('span').fadeIn(200); 
							}
						})
					}
					
				} 
				
				$scope.hide_pretty_prompt = function() {
					var m = '-50px'; 
					if ($('#p' + $scope.num).text().length > 120) { 
						
						m = '-70px'
					} else if ($scope.data.info[$scope.q] == 'radio') {
						m = '-50px'; 
						//$('#thanx' + $scope.num).css({'margin-top': '-46px'})
						$('#switch' + $scope.num).fadeOut(200); 
						
					}
	
						$('#p' + $scope.num).animate({
							marginTop: m
						}, {
							duration: 300, 
							complete: function() {
								$(this).find('span').fadeOut(200); 
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
					}, 300); 
					
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
								    $scope.placeholder = $scope.data.placeholders[$scope.q]

								    $scope.$apply();
								    if ($scope.data.info[$scope.q] == 'leadership-pic') {
								  
								        $scope.show_file($('#txt' + $scope.num)); 
								    } else {
								
								     
								        if ($scope.data.info[$scope.q] == 'leadership-pic') {
								            $scope.change_q();
								        }

								        $('#inp' + $scope.num).val('');
								        $('#inp' + $scope.num).css({
								            'display': 'block',
								            'opacity': 0
								        })

								        $('#txt' + $scope.num).css({ 'display': 'none' })
								        $('#inp' + $scope.num).fadeIn(300, function () {
								            $(this).animate({ opacity: 1 }, {
								                duration: 300
								            })
								        })
								    }
								}
							})
						}
					})
				} 
				
				
				// show file input 
				
				$scope.show_file = function(inp, flag) { 
					
			
				    if ($scope.data.detail == '05') {
				        $scope.small_progress(null, 3); 
						$('#f' + $scope.num).find('span').text('Add leadership picture'); 
				    }
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
				 
				        inp.on('click', function () {
                        
				            $(this).on('change', function() {
				                $('#f' + $scope.num).animate({
				                    width: '100%'
				                }, {
				                    duration: 500, 
				                    complete: function() {
				                        $(this).fadeOut(300, function() {

				                            //add file data!!! 
				                            var file = document.forms['form' + $scope.num]['f' + $scope.num].files[0];
				                            
				                            $scope.add_filedata(file)
				                            if ($scope.data.detail == '00') {

				                                $scope.q = 8;
				                            } else {
				                                $scope.q = 4;
				                            
				                                $('#inp' + $scope.num).val('');
				                            }

				                            $scope.placeholder = $scope.data.placeholders[$scope.q]
				                            $scope.$apply();  
				                            $scope.small_progress(null, $scope.q); 
									
				                            $('#inp' + $scope.num).css({'opacity': 1})
				                            $('#inp' + $scope.num).fadeIn(300);
				                            $scope.isBig = false; 

				                        })
				                    }
				                })
				            })
				        })
				    } 
				
				// show radio 
				
				$scope.show_radio = function() {
				    $('#switch' + $scope.num).fadeIn(200);
				    $scope.handle_radio(); 
				}

				$scope.handle_radio = function () {
				    $('.rad.y').on('click', function () {

				        if (!$(this).hasClass('rad-sel')) $(this).addClass('rad-sel');

				        $('#switch' + $scope.num).find('.n').removeClass('rad-sel');

				        $('#p' + $scope.num).css({
				            'background-color': 'rgb(216, 219, 228)'
				        })

				    });

				    $('.rad.n').on('click', function () {

				        if (!$(this).hasClass('rad-sel')) $(this).addClass('rad-sel');

				        $('#switch' + $scope.num).find('.y').removeClass('rad-sel');

				        $('#p' + $scope.num).css({
				            'background-color': 'rgb(182, 195, 230)'
				        })
				    })
				}
}

module.exports = animate_form; 