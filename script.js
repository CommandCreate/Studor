$(document).ready(function() {
    var delmode = false;
    var timeNow = new Date();
    var day = timeNow.getDay();
    //day starts from 0 as sunday 
    var hour = timeNow.getHours();
    var revmode = false;
    var timingfn,book;
    var currentTab = 't1';
    var currentBookN;
    var createdNotes = [];
    var count = 0;
    var noteList = [{"name":"science", "content":"this is a science book"},{"name":"math", "content":"this is a math book"},{"name":"english", "content":"this is an english book"}];
    function checkLog() {
        if(count < 15) {
            count++;
        } else {
            count = 0;
            $("#console").html("");
        }
    }
    var notes = {
        'math': {
            't1': 'Hi this is tab 1',
            't2': 'Hey, i"m tab 2',
            't3': 'Oh, hello i"m 3',
            't4': 'I am number 4',
            't5': 'Muahahahha 5'
        },
        'science':{
            't1': 'Hi this is tab 1',
            't2': 'Hey, i"m tab 2',
            't3': 'Oh, hello i"m 3',
            't4': 'I am number 4',
            't5': 'Muahahahha 5'
        },
        'english': {
            't1': 'Hi this is tab 1',
            't2': 'Hey, i"m tab 2',
            't3': 'Oh, hello i"m 3',
            't4': 'I am number 4',
            't5': 'Muahahahha 5'
        }
    };
    var cardflipped = false;
    var cardSets = {
        'math':{
            'setlength':'2',
            'cards':[['Define Pythagoras Theorem','a^2 + b^2 = c^2 <br> when c is the hypotneuse'],['You happy? <br> math flashcards is hard','Woo hoo, you found the other side of card 2']]
        },
        'science':{
            'setlength':'2',
            'cards':[['State 2nd Law of Motion','F = M*A'],['State 1st Law of Motion','Inertia']]
        },
        'english':{
            'setlength':'2',
            'cards':[['Is characters construction important?','Sorry I ran out of ideas :P'],['Yeah, this is card 2, randomly made up','Woo hoo, you found the other side of card 2']]
        }
    }
    if(!localStorage.firsttime) {
        localStorage.firsttime = true;
        console.log("is first time");
        checkLog();
        $("#console").append("<p class=\"logs\">>_ is first time</p>"); 
        checkLog();
        $("#console").append("<p class=\"logs\">>_ set firsttime to true</p>");
    } else if(localStorage.firsttime && localStorage.firsttime == false) {
        localStorage.firsttime = true;
        console.log("is first time");
        checkLog();
        $("#console").append("<p class=\"logs\">>_ is first time</p>"); 
        checkLog();
        $("#console").append("<p class=\"logs\">>_ set firsttime to true</p>");
    } else {
        noteList = JSON.parse(localStorage.notes);
        console.log("not first time");
        console.log(localStorage.notes);
        console.log(typeof localStorage.notes);
        console.log(typeof noteList);
        console.log(noteList);
        checkLog();
        $("#console").append("<p class=\"logs\">>_ not first time</p>");
        checkLog();
        $("#console").append("<p class=\"logs\">>_ loading saved note data</p>");
        checkLog();
        $("#console").append("<p class=\"logs\">>_ loading saved generated data</p>");
        checkLog();
        $("#console").append("<p class=\"logs\">>_ loading saved list data</p>");
    }
    if (localStorage.cards) {
        cardSets = JSON.parse(localStorage.cards);
    } else {
        localStorage.cards = JSON.stringify(cardSets);
    }
    
    $("#overide").click(
        function() {
            localStorage.notes = [{"name":"science", "content":"this is a science book"},{"name":"math", "content":"this is a math book"},{"name":"english", "content":"this is an english book"}];
            localStorage.generated = [];
            console.log("noteList = default");
            console.log("generated deleted");
            console.log("OVERIDED");
            checkLog();
            $("#console").append("<p class=\"logs\">>_ generated data resetted</p>");
            checkLog();
            $("#console").append("<p class=\"logs\">>_ noteList = default</p>");
            checkLog();
            $("#console").append("<p class=\"logs\">>_ OVERIDED</p>");
    });
    
    if(localStorage.generated) {
        createdNotes = JSON.parse(localStorage.generated);
        console.log(createdNotes);
        for(i=0;i<createdNotes.length;i++) {
            $('#bookLi').append(createdNotes[i]);
        }
        console.log("created notes added");
        checkLog();
        $("#console").append("<p class=\"logs\">>_ created notes added</p>");
    } else {
        localStorage.generated = createdNotes;
    }
    
    function initSize() {
        $('.Usidebar').css('height', $(document).height());
        $('.VPORT').css('height', $(document).height());
        $('.VPORT').css('width',$(document).width() - 100 + 'px');
        $('#books').css('width',$(document).width() - 100 + 'px');
        $('#books').css('height', $(document).height());
        $('#editor').css('width',$(document).width() - 105 + 'px');
        $('#editor').css('height', $(document).height());
        $('#textarea').css('width',$(document).width() - 600 + 'px');
        $('#textarea').css('min-height', $(document).height());
        $('#editor #option').css('margin-left', $(document).width() - 300 + 'px');
        $('#editor').css('width',$(document).width() - 305 + 'px');
        $('#subEditor').css('height', $('#calendar').height());
        $('#setting').css('height', $(document).height());
        $('#setviewer').css('height', $(document).height());
        $('#setviewer').css('width', $(document).width());
        $('#centerCard').css('margin-left',$(document).width() -1100 + 'px');
        $('#centerCardBACK').css('margin-left',$(document).width() -1100 + 'px');
        $('#fakeCardR').css('margin-left',$(document).width() - 350 + 'px');
        $('#globalInput').css('margin-top',($(document).height() - 200)/2 + 'px');
        $('#editcardset').css('margin-left',$(document).width() -1100 + 'px');
    }
    
    initSize();
    $(window).resize(function() {
        initSize();
    });
    
    var cardlist = [];
    function mapNote() {
//        for (books in notes) {
//            for (tabs in notes[books]) {
//                cardlist = notes[books][tabs].match(/(hello:world)/)
//            }
//        }
//        console.log(cardlist);
        console.log('Mapping notes for flashcards');
    }
    function GI(label,callback) {
        $('#GIName').text(label);
        $('#globalInput').fadeIn(250);
        $('#globalInput input').keydown(function(e) {
            var cancel = false;
            if (e.keyCode == 13) {
                var GIinput = $('#globalInput input').val();
                $('#globalInput').fadeOut(250);
                callback(GIinput,cancel);
            } else if (e.keyCode == 27) {
                cancel = true;
                $('#globalInput').fadeOut(250);
                callback(GIinput,cancel);
            }
        });
    }
    function save() {
        console.log("currently on editor = " + $("#textarea").text());
        var saveContent = $("#textarea").text();
        console.log("content saved is = " + saveContent);
        noteList[currentBookN].content = saveContent;
        localStorage.notes = JSON.stringify(noteList); 
        console.log(localStorage.notes);
        mapNote();
        console.log("content saving");
        checkLog();
        localStorage.generated = createdNotes;
        $("#console").append("<p class=\"logs\">>_ content saved</p>");
    }
    $('.book').click(function(ev) {
        if (!revmode) {
            $('#editor').css('display','block');
            $('#editor').animate({'margin-left':'0','opacity':'1'},250);
            timingfn = setTimeout(function() {
                $('#editor #option').animate({'margin-top':'0'}, 250);
            }, 250);
            book = ev.target.getAttribute('data-book');
            var orderN = parseInt(ev.target.getAttribute("data-order"));
            currentBookN = orderN;
            console.log("active book = " + currentBookN);
            checkLog();
            $("#console").append("<p class=\"logs\">>_ active book is book " + noteList[currentBookN].name + "</p>");
            console.log(typeof orderN);
            console.log(typeof currentBook);
            $('#textarea').html(noteList[orderN].content);
            console.log("current content = " + noteList[orderN].content);
            currentTab = "t1";
        } else if (delmode == true){
            var orderN = parseInt(ev.target.getAttribute("data-order"));
            noteList.splice(orderN,1);
            console.log(noteList);
            $(ev.target).remove();
            checkLog();
            $("#console").append("<p class=\"logs\">>_ book " + data + " is deleted</p>");
        }
        $('.tabI').click(function(event) {
            $('#textarea').html(notes[book][event.target.getAttribute("data-tab")]);
            currentTab = event.target.getAttribute("data-tab");
        });
    });
     $("#bookLi").on("click", ".book", function(ev){
          if (!revmode) {
            $('#editor').css('display','block');
            $('#editor').animate({'margin-left':'0','opacity':'1'},250);
            timingfn = setTimeout(function() {
                $('#editor #option').animate({'margin-top':'0'}, 250);
            }, 250);
            book = ev.target.getAttribute('data-book');
            var orderN = ev.target.getAttribute("data-order");
            currentBookN = orderN;
            $('#textarea').html(noteList[orderN].content);
            currentTab = "t1";
        } else if (delmode == true) {
            var orderN = parseInt(ev.target.getAttribute("data-order"));
            noteList.splice(orderN,1);
            createdNotes.splice(orderN,1);
            console.log(noteList);
            $(ev.target).remove();
        }
        $('.tabI').click(function(event) {
            $('#textarea').html(notes[book][event.target.getAttribute("data-tab")]);
            currentTab = event.target.getAttribute("data-tab");
        });  
    });
    $('.menu li:first-child').click(function() {
        save();
        $('#setting').fadeOut(250);
        if ($('#textarea').is(':hidden')) {
            $('#calendar').fadeOut(250);
            $('#notes').fadeIn(250);
            $(this).css('background-color','#228DFF');
            $('.menu li:nth-child(3)').css('background-color','inherit');
            $('.menu li:nth-child(2)').css('background-color','inherit');
            $('#flashcards').fadeOut(250);
        } else {
            timingfn = setTimeout(function() {
                $('#editor').css('display','none');
            }, 250);
            $('#editor').animate({'margin-left':'300','opacity':'0'},250);
            $('#editor #option').animate({'margin-top':'-180px'}, 250);
        }
    });
    
    $("#textarea").keyup(function() {
        save();
    });
    
    $('#remove').click(function() {
        if (revmode) {
            $('.book').css('background','#f3f3f3');
            revmode = false;
        } else {
            $('.book').css('background','url(remove.png) no-repeat center #f3f3f3');
            revmode = true;
        }
    });
    
    $("#textarea").popline();
    $('.popline-justify-button').click(function(ev) {
        ev.stopPropagation();
        $(this).css('background','none');
        $('body').click(function(ev) {
            $('.popline-justify-button').css('background','url(popline/menu.png) no-repeat center');
        });
    });
    $('.popline-link-button').click(function(ev) {
        ev.stopPropagation();
        $(this).css('background','url(popline/link.png) no-repeat left');
        $('body').click(function(ev) {
            $('.popline-link-button').css('background','url(popline/link.png) no-repeat center');
        });
    });
    
    $('#img').click(function() {
        $('.hiddenForms input').trigger('click');
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#textarea').append('<img src="' + e.target.result + '"/>');
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('.hiddenForms input').change(function() {
        readURL(this);
        save();
    });
    $('#add').click(function() {
        GI('New book name: ',function(data,cancel) {
            if (!cancel) {
                var orderN = parseInt(noteList.length);
                $('#bookLi').append('<li class="book created" data-book="'+data+'" data-order="' + orderN + '" ><p>'+data+'</p></li>');
                createdNotes.push('<li class="book created" data-book="'+data+'" data-order="' + orderN + '" ><p>'+data+'</p></li>');
                noteList.push({'name':data,'content':null});
                checkLog();
                $("#console").append("<p class=\"logs\">>_ created book called" + data + "</p>");
                localStorage.generated = JSON.stringify(createdNotes);
                console.log(localStorage.generated);
                console.log("new book = " + noteList[noteList.length-1].name);
                save();
            }
        });
    });
    $("#remove").click(
        function() {
            if(delmode == true) {
                delmode = false;
                checkLog();
                $("#console").append("<p class=\"logs\">>_ delete mode is off </p>");
                console.log("del is false");
            } else if (delmode == false) {
                delmode = true;
                console.log("del is true");
                checkLog();
                $("#console").append("<p class=\"logs\">>_ delete mode is on </p>");
            }
    });
    $('.menu li:nth-child(3)').click(function() {
        day = timeNow.getDay();
        //day starts from 0 as sunday 
        hour = timeNow.getHours();
        $('#flashcards').fadeOut(250);
        $('#calendar').fadeIn(250);
        $('#notes').fadeOut(250);
        $('#setting').fadeOut(250);
        $(this).css('background-color','#228DFF');
        $('.menu li:first-child').css('background-color','inherit');
        $('.menu li:nth-child(2)').css('background-color','inherit');
    });
    $('.menu li:nth-child(2)').click(function() {
        if ($('div#setviewer').is(':hidden')) {
            $('#flashcards').fadeIn(250);
            $('#calendar').fadeOut(250);
            $('#notes').fadeOut(250);
            $('#setting').fadeOut(250);
            $(this).css('background-color','#228DFF');
            $('.menu li:first-child').css('background-color','inherit');
            $('.menu li:nth-child(3)').css('background-color','inherit');
        } else {
            $('div#flashcards div#sets').fadeIn(250);
            $('div#flashcards div#setviewer').fadeOut(250);
        }
    });
    
    var week = {
            time:{
                monday: [9,10,12,13,15,16],
                tuesday: [9,11,12,13,14,15],
                wednesday: [8,10,11,14,15],
                thursday: [10,11,12,13,15,16,17],
                friday: [9,11,12,14]
            },
            mon:["math", "SnE", "science", "programming", "english", "math"],
            tue:["programming", "math", "english", "SnE", "science", "science"],
            wed:["english", "math", "SnE", "science", "math"],
            thu:["programming", "science", "SnE", "programming", "science", "math", "english"],
            fri:["english", "science", "SnE", "math"],
            colours: [["math", "#f7483b"], ["science", "#8fcc00"], ["english", "#03c8fa"], ["SnE", "#9b59b6"], ["programming", "#34495e"]]
        }
        var currentSubNumber;
        var totalSubjectN = week['colours'].length;
        var monSn = week['mon'].length;
        var tueSn = week['tue'].length;
        var wedSn = week['wed'].length;
        var thuSn = week['thu'].length;
        var friSn = week['fri'].length;
        for(i=0;i < monSn;i++) {
            $("#monday").append("<li class=\"subjects " + week.mon[i] + " " + week['time'].monday[i] + "\">" + week.mon[i] + "<p class=\"time\">" + week['time'].monday[i]+"</li>");
        }
        for(i=0;i < tueSn;i++) {
            $("#tuesday").append("<li class=\"subjects " + week.tue[i] + " " + week['time'].tuesday[i] + "\">" + week.tue[i] + "<p class=\"time\">" + week['time'].tuesday[i]+"</li>");
        }
        for(i=0;i < wedSn;i++) {
            $("#wednesday").append("<li class=\"subjects " + week.wed[i] + " " + week['time'].wednesday[i] + "\">" + week.wed[i] + "<p class=\"time\">" + week['time'].wednesday[i]+"</li>");
        }
        for(i=0;i < thuSn;i++) {
            $("#thursday").append("<li class=\"subjects " + week.thu[i] + " " + week['time'].thursday[i] + "\">" + week.thu[i] + "<p class=\"time\">" + week['time'].thursday[i]+"</li>");
        }
        for(i=0;i < friSn;i++) {
            $("#friday").append("<li class=\"subjects " + week.fri[i] + " " + week['time'].friday[i] + "\">" + week.fri[i] + "<p class=\"time\">" + week['time'].friday[i]+"</li>");
        }
        for (i=0;i<totalSubjectN;i++) {
            console.log("worked?");
            $("." + week['colours'][i][0]).css("background-color", week['colours'][i][1]);
        }
        function findTime(date) {
            console.log("finding time");
            for(i=0;i<date.length;i++) {
                var t = i++;
                if (hour >= date[i]) {
                    currentSubNumber = i;
                    console.log(currentSubNumber);
                }
            }
        }
        function reset() {
            $(".subjects").css("opacity", "0.4");
            hour = timeNow.getHours();
        }
        day = timeNow.getDay();
        //day starts from 0 as sunday 
        hour = timeNow.getHours();
        function findSubject() {
            reset();
            console.log("subject finding");
            if (day == 1) {
                findTime(week['time'].monday);
                $("#monday li." + week['time'].monday[currentSubNumber]).css("opacity", "1");
                console.log("Current subject is: " + week.mon[currentSubNumber]);
                console.log(week['time'].monday[currentSubNumber]);
                $("#currentSubAlert").html(week.mon[currentSubNumber]);
            } else if(day == 2) {
                findTime(week['time'].tuesday);
                $("#tuesday li." + week['time'].tuesday[currentSubNumber]).css("opacity", "1");
                console.log("Current subject is: " + week.tue[currentSubNumber]);
                console.log(week['time'].tuesday[currentSubNumber]);
                $("#currentSubAlert").html(week.tue[currentSubNumber]);
            } else if(day == 3) {
                findTime(week['time'].wednesday);
                $("#wednesday li." + week['time'].wednesday[currentSubNumber]).css("opacity", "1");
                console.log("Current subject is: " + week.wed[currentSubNumber]);
                console.log(week['time'].wednesday[currentSubNumber]);
                $("#currentSubAlert").html(week.wed[currentSubNumber]);
            } else if(day == 4) {
                findTime(week['time'].thursday);
                $("#thursday li." + week['time'].thursday[currentSubNumber]).css("opacity", "1");
                console.log("Current subject is: " + week.thu[currentSubNumber]);
                console.log(week['time'].thursday[currentSubNumber]);
                $("#currentSubAlert").html(week.thu[currentSubNumber]);
            } else if(day == 5) {
                findTime(week['time'].friday);
                $("#friday li." + week['time'].friday[currentSubNumber]).css("opacity", "1");
                console.log("Current subject is: " + week.fri[currentSubNumber]);
                console.log(week['time'].friday[currentSubNumber]);
                $("#currentSubAlert").html(week.fri[currentSubNumber]);
            } else if (day == 6){
                console.log("What are you doing here on Saturday?");
                $("#currentSubAlert").html("saturday");
            } else {
                $("#currentSubAlert").html("sunday");
                console.log("What are you doing here on Sunday?");
            }
        }
        findSubject();
    
//    var delSubMode = false;
//    var sureHTML = '<p>Sure?</p><button class="subSureYes"></button><button class="subSureNo"></button>';
//    $('#delSub').click(function() {
//        if (delSubMode) {
//            $('.subSure').css('opacity','0');
//            delSubMode = false;
//            $('.subSure').html('');
//            $('.subSure').css('background','url(can.png) no-repeat center #FF483D');
//        } else {
//            $('.subSure').css('opacity','1');
//            delSubMode = true;
//            $('.subSure').click(function() {
//                var subjectClicked = $(this).parent().attr('data-subject');
//                $(this).html(sureHTML); 
//                $(this).css('background','#f3f3f3');
//                $('.subSureYes').click(function() {
//                    $('.subjectI[data-subject="'+subjectClicked+'"]').fadeOut('250');
//                });
//                $('.subSureNo').click(function() {
//                    $('.subSure').css('opacity','0');
//                    delSubMode = false;
//                    $('.subSure').html('');
//                    $('.subSure').css('background','url(can.png) no-repeat center #FF483D');
//                });
//            });
//        }
//    });
//    
//    $('#addSub').click(function() {
//        $('#subEditor').css('margin-right','0');
//        $('#subEName').val('');
//    });
//    $('.subjectI').click(function(e) {
//        $('#subEditor').css('margin-right','0');
//        $('#subEName').val($(e.target).attr('data-subject'));
//    });
//    $('#subESub').click(function(e) {
//        e.preventDefault();
//        $('#subEditor').css('margin-right','-550px');
//    });
//    
//    $('#subETime').pickatime();
    
    $('#Msetting').click(function() {
        $('#calendar').fadeOut(250);
        $('#notes').fadeOut(250);
        $('.menu li:nth-child(3)').css('background-color','#3E4147');
        $('.menu li:nth-child(1)').css('background-color','#3E4147');
        $('#setting').fadeIn(250);
    });
    
    var currentSet = '';
    var currentCard = 1;
    
    function loadSet(name) {
        currentSet = name;
        currentCard = 0;
        $('#setName').text(name);
        $('#totalcard').text(cardSets[name].setlength);
        $('#currentcard').text('1');
        $('#CCContent').html(cardSets[name].cards[0][0]);
        $('#CCBContent').html(cardSets[name].cards[0][1]);
    }
    
    function previouscard() {
        if (currentCard != 0) {
            currentCard -= 1
        }
        $('#CCContent').html(cardSets[currentSet].cards[currentCard][0]);
        $('#CCBContent').html(cardSets[currentSet].cards[currentCard][1]);
        $('#currentcard').text(currentCard+1);
    }
    function nextcard() {
        if (currentCard != cardSets[currentSet].setlength - 1) {
            currentCard += 1
        }
        $('#CCContent').html(cardSets[currentSet].cards[currentCard][0]);
        $('#CCBContent').html(cardSets[currentSet].cards[currentCard][1]);
        $('#currentcard').text(currentCard+1);
    }
    
    $('.fcSetCover').click(function(e) {
        $('div#flashcards div#sets').fadeOut(250);
        $('div#flashcards div#setviewer').fadeIn(250);
        loadSet(e.target.getAttribute('data-name'));
    });
    
    $('#centerCard').click(function() {
        $('#centerCard').fadeOut(250);
        $('#centerCardBACK').fadeIn(250);
    });
    $('#centerCardBACK').click(function() {
        $('#centerCard').fadeIn(250);
        $('#centerCardBACK').fadeOut(250);
    });
    
    $('#fakeCardL').click(function() {
        previouscard();
        console.log(cardSets[currentSet].cards[currentCard-1][0]);
    });
    $('#fakeCardR').click(function() {
        nextcard();
        console.log(cardSets[currentSet].cards[currentCard][0]);
    });
    
    function newcard(s1,s2) {
        var tempNC = [];
        GI('[new card] Term: ',function(term,Tcancel) {
            if (!Tcancel) {
                GI('[new card] Defenition: ',function(def,Dcancel) {
                    if (!Dcancel) {
                        tempNC[0] = term;
                        tempNC[1] = def;
                        cardSets[currentSet]['cards'].push(tempNC);
                        localStorage.cards = JSON.stringify(cardSets);
                    }
                });
            }
        });
    }
    
    $('#addSet').click(function() {
        console.log("worked?");
        newcard();
    });
    
});