$(function() {
    $('body').append(menuHTML);
    $('body').append(calHTML);
    $('body').append(timHTML);
    $('body').append(uniHTML);
    $('body').append(cloHTML);
    $('body').append(weaHTML);
    
    $.fn.drags = function(extra,opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 900).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
    $('#TRIGGER').click(function() {
        $('#DASHmenu').css('margin-top', '0px');
        $('#DASHclose').click(function() {
            $('#DASHmenu').css('margin-top', '-1000px');
        });
        
        //START ---CALCULATOR
        $('#DASHcal').click(function() {
                $('#DASHcalwin').css('opacity', '1');
                $('#DASHcalwin').css('display', 'block');
                $('#DASHmenu').css('margin-top', '-1000px');
                $('.DASHwin').drags();
                $('#DASHcalcontent').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHcalclose').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHcalclose').click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $('.DASHwin').css('opacity', '0');
                    $('.DASHwin').css('z-index', '10');
                });
                var DASHcalequation = "";
                var keys = $('div.keys span');
                $('#DASHcalwin input.screen').keyup(function() {
                    DASHcalequation = $('#DASHcalwin input.screen').val();
                });
                for (i=0;i<keys.length;i++) {
                    $(keys[i]).click(function(e) {
                        if (e.target.id == '=') {
                            $("#DASHcalwin input.screen").val(eval(DASHcalequation));
                        } else {
                            DASHcalequation += e.target.id;
                            $("#DASHcalwin input.screen").val(DASHcalequation);
                        }
                    });
                }
                $('span#c').click(function() {
                    DASHcalequation = "0";
                    $("#DASHcalwin input.screen").val(DASHcalequation);
                });
                $("#DASHcalwin input.screen").click(function() {
                    $("#DASHcalwin input.screen").focus();
                });
        });
        //END ---CALCULATOR
        
        
        //START ---UNIT CONVERTER
        $('#DASHuni').click(function() {
                $('#DASHuniwin').css('display', 'block');
                $('#DASHuniwin').css('opacity', '1');
                $('#DASHmenu').css('margin-top', '-1000px');
                $('.DASHwin').drags();
                $('#DASHunicontent').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHuniclose').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHuniclose').click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $('#DASHuniwin').css('opacity', '0');
                    $('#DASHuniwin').css('z-index', '10');
                });
        });
        //END ---UNIT CONVERTER
        
        //START ---TIMER
        $('#DASHtim').click(function() {
                $('#DASHtimwin').css('display', 'block');
                $('#DASHtimwin').css('opacity', '1');
                $('#DASHmenu').css('margin-top', '-1000px');
                $('.DASHwin').drags();
                $('#DASHtimcontent').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHtimclose').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHtimclose').click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $('#DASHtimwin').css('opacity', '0');
                    $('#DASHtimwin').css('z-index', '10');
                });
            
        });
        //END ---UNIT CONVERTER
        
        //START ---CLOCK
        $('#DASHclo').click(function() {
                var mode = "am/pm";
                var months = {
                    0: 'Jan',
                    1: 'Feb',
                    2: 'Mar',
                    3: 'Apr',
                    4: 'May',
                    5: 'Jun',
                    6: 'Jul',
                    7: 'Aug',
                    8: 'Sep',
                    9: 'Oct',
                    10: 'Nov',
                    11: 'Dec'
                    
                }
                function displayTime() {
                    var h = new Date().getHours();
                    var m = new Date().getMinutes();
                    var d = new Date().getDate();
                    var mo = months[new Date().getMonth()];
                    var y = new Date().getFullYear();
                    if (mode == "am/pm") {
                        if (h <= 12) {
                            if (m <= 9) {
                                $('#DASHcloface').text(h + ':0' + m + ' am');
                            } else {
                                $('#DASHcloface').text(h + ':' + m + ' am');
                            }
                        } else {
                            if (m <= 9) {
                                $('#DASHcloface').text(h-12 + ':0' + m + ' pm');
                            } else {
                                $('#DASHcloface').text(h-12 + ':' + m + ' pm');
                            }
                        }
                    } else {
                        if (m <= 9) {
                            $('#DASHcloface').text(h + ':0' + m);
                        } else {
                            $('#DASHcloface').text(h + ':' + m);
                        }
                    }
                    $('#clodate').text(d+' '+mo+' '+y);
                } 
                $('#clockMode').click(function() {
                    if (mode == "am/pm") {
                        mode = "24h";
                        $('#clockMode').html('24h');
                        displayTime();
                    } else {
                        mode = "am/pm";
                        $('#clockMode').html('AM/PM');
                        displayTime();
                    }
                });
                displayTime();
                var update = setInterval(displayTime, 1000);
                $('#DASHclowin').css('display', 'block');
                $('#DASHclowin').css('opacity', '1');
                $('#DASHmenu').css('margin-top', '-1000px');
                $('.DASHwin').drags();
                $('#DASHclocontent').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHcloclose').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHcloclose').click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $('#DASHclowin').css('opacity', '0');
                    $('#DASHclowin').css('z-index', '10');
                });
        });
        //END ---CLOCK
        
        //START ---WEATHER
        $('#DASHwea').click(function() {
                $('#DASHweawin').css('display', 'block');
                $('#DASHweawin').css('opacity', '1');
                $('#DASHmenu').css('margin-top', '-1000px');
                $('.DASHwin').drags();
                $('#DASHweacontent').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHweaclose').mousedown(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#DASHweaclose').click(function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $('#DASHweawin').css('opacity', '0');
                    $('#DASHweawin').css('z-index', '10');
                });
            $('input[name=locationCo]').click(function() {
                $('input[name=locationCo]').focus();
            });
            $('input[name=locationCo]').focus(function() {
                $(this).css('background','#03cbe3');
            });
            $('input[name=locationCo]').blur(function () {
                $(this).css('background','inherit');
            });
            $('input[name=locationCi]').click(function() {
                $('input[name=locationCi]').focus();
            });
            $('input[name=locationCi]').focus(function() {
                $(this).css('background','#03cbe3');
            });
            $('input[name=locationCi]').blur(function () {
                $(this).css('background','inherit');
            });
            $('input[name=weasubmit]').click(function(e) {
                e.preventDefault();
                e.stopPropagation();
                $('#DASHwealoc').css('opacity', '0');
                $('#wearesult').css('margin-top', '0');
                var country = $('input[name=locationCo]').get(0).value.replace(' ','_');
                var city = $('input[name=locationCi]').get(0).value.replace(' ','_');
                $.ajax({
                    url: "http://api.wunderground.com/api/c251813e62bfddc6/geolookup/conditions/q/" + country + "/" + city + ".json",
                    dataType: "jsonp",
                    success: function(parsed_json) {
                        $('#temp').html(parsed_json['current_observation']['temp_c'] + ' &#176C');
                        $('#weastr').html(parsed_json['current_observation']['weather']);
                        $('#weahum').html(parsed_json['current_observation']['relative_humidity'] + ' humidity');
                        $('#DASHweatitle').html(parsed_json['location']['city']);
                    }
                });
            });
            $('#newwea').click(function() {
                $('#DASHwealoc').css('opacity', '1');
                $('#wearesult').css('margin-top', '160');
            });
        });
        //END ---WEATHER
    
});

$(document).ready(
    function() {
        var minute = 00;
        var second = 00;
        var millisecond = 000;
        var startFn;
        var startColon = true;
        var colon = ':';
        var playing = false;
        function resetAll() {
            minute = 00;
            second = 00;
            millisecond = 00;
            window.clearInterval(startFn);
            startColon = true;
            colon = ':';
            $('#watch').html('00' + colon + '00' + colon + '000');
        }
        function startAll() {
            millisecond ++;
            if (millisecond == 230) {
                second ++;
                millisecond = 000;
            }
            if(second == 60){
                minute ++;
                second = second%60;
            }
            if(second >= 10 && minute >= 10) {
                $('#watch').html(minute + colon + second + colon + millisecond);
            } else if(second < 10 && minute < 10) {
                $('#watch').html('0' + minute + colon + '0' + second + colon + millisecond);
            } else if(second < 10 && minute >= 10) {
                $('#watch').html(minute + colon + '0' + second + colon + millisecond);
            } else if(second >= 10 && minute < 10) {
                $('#watch').html('0' + minute + colon + second + colon + millisecond);
            }
        }
        function reset() {
            window.clearInterval(startFn);
            colon = ':';
            $('#watch').html(minute + colon + second + colon + millisecond);
        }
        $('#play').click(
            function() {
                if (!playing) {
                    $('#play').attr('src','../img/pause.png');
                    startFn = window.setInterval(startAll, 1);
                    playing = true;
                } else {
                    $('#play').attr('src','../img/play.png');
                    reset();
                    playing = false;
                }
            });
        $('#stop').click(
            function() {
                resetAll();
            }
        );
    });
});