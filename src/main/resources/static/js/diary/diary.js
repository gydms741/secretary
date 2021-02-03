
$(function(){

    $("#deleteBtn").on("click", function(){
        $('.deleteActive').show();
        $('#deleteDiary').show();
        $('.deleteUnactive').show();
    });

    $(".deleteUnactive").on("click", function (){
        $('.deleteActive').hide();
        $('#deleteDiary').hide();
        $('.deleteUnactive').hide();
    })

    $("#getDiaryList").click(function(){

        $.ajax({
            url : "/restDiary/getDiaryList",
            type : "GET",
            data :{userId:$("#userId").val()},
            success: function (list){
                console.log(list);
                $("div[name='thumbnails']").remove();
                document.getElementById('fisrtTab').setAttribute('class', 'active');
                document.getElementById('secondTab').setAttribute('class', '');
                document.getElementById('thirdTab').setAttribute('class', '');
                document.getElementById('deleteBtn').setAttribute('class', '');
                $.each(list,function(i,item){
                    console.log(item);
                    if (item.shareStatus=='1') {
                        $("#for").prepend(
                            "<div name='thumbnails' class='col-md-4 thumbnail' style='float: left; padding: 2px; width:30%; height: 200px'> " +
                            "<a href='/diary/getDiary?diaryNo=" + item.diaryId + "'>" +
                            "<p name='backImage' style=\"background-image: url(" + item.fileName + "); background-repeat: no-repeat;\">" +
                            "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='" + item.diaryId + "' style='float: left' hidden/>" +
                            "<input type='hidden' name='diaryId' value='" + item.diaryId + "'/>" +
                            "<input type='hidden' class='diaryText' value='" + item.diaryText + "'/>" +
                            "제목 : <span >" + item.diaryTitle + "</span><br>" +
                            "날짜 : <span>" + item.diaryDate + "</span><br>" +
                            "날씨 :  <img src='" + item.weather + "' width='20' height='20'/><br>" +
                            "위치 : <span>" + item.location + "</span><br/><br/>" +
                            "<span style=\"float: bottom; text-align: right\">&#9964;</span>\n" +
                            "</p>" +
                            "</a>" +
                            "</div>"
                        )
                    }else{
                        $("#for").prepend(
                            "<div name='thumbnails' class='col-md-4 thumbnail' style='float: left; padding: 2px; width:30%; height: 200px'> " +
                            "<a href='/diary/getDiary?diaryNo=" + item.diaryId + "'>" +
                            "<p name='backImage' style=\"background-image: url(" + item.fileName + "); background-repeat: no-repeat;\">" +
                            "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='" + item.diaryId + "' style='float: left' hidden/>" +
                            "<input type='hidden' name='diaryId' value='" + item.diaryId + "'/>" +
                            "<input type='hidden' class='diaryText' value='" + item.diaryText + "'/>" +
                            "제목 : <span >" + item.diaryTitle + "</span><br>" +
                            "날짜 : <span>" + item.diaryDate + "</span><br>" +
                            "날씨 :  <img src='" + item.weather + "' width='20' height='20'/><br>" +
                            "위치 : <span>" + item.location + "</span><br/><br/>" +
                            "</p>" +
                            "</a>" +
                            "</div>"
                        )
                    }
                })
            }
        });
    })

    $('#deleteDiary').click(function (){
        var confirm_val = confirm("정말 삭제하시겠습니까?");

        if(confirm_val){

            var checkArr = [];
            $("input[name=deleteActive]:checked").each(function (i){
                checkArr.push($(this).val());
            });
            $.ajax({
                url : "/restDiary/moveToBin",
                type : "POST",
                data : JSON.stringify(checkArr),
                contentType : "application/json",
                success: function (list){
                    console.log(list);
                    $("div[name='thumbnails']").remove();
                    document.getElementById('fisrtTab').setAttribute('class', '');
                    document.getElementById('secondTab').setAttribute('class', '');
                    document.getElementById('thirdTab').setAttribute('class', '');
                    document.getElementById('deleteBtn').setAttribute('class', 'active');

                    $.each(list,function(i,item){
                        console.log(item);
                        $("#for").prepend(
                            "<div name='thumbnails' class='col-md-4 thumbnail' style='float: left; padding: 2px; width:30%; height: 200px'> " +
                            "<a href='/diary/getDiary?diaryNo="+item.diaryId+"'>"+
                            "<p name='backImage' style=\"background-image: url("+item.fileName+")\">" +
                            "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='"+item.diaryId+"' style='float: left' hidden/>" +
                            "<input type='hidden' name='diaryId' value='"+item.diaryId+"'/>" +
                            "<input type='hidden' class='diaryText' value='" + item.diaryText + "'/>" +
                            "제목 : <span >"+item.diaryTitle+"</span><br>" +
                            "날짜 : <span>"+item.diaryDate+"</span><br>" +
                            "날씨 :  <img src='"+item.weather+"' width='20' height='20'/><br>" +
                            "위치 : <span>"+item.location+"</span>" +
                            "</p>"+
                            "</a>"+
                            "</div>"
                        )

                    })
                }
            });
        }
    });

    $("#getOthersDiaryList").on("click", function () {
        var list = [];

        $.ajax({
            url: "/restDiary/getOthersDiaryList",
            method: "get",
            dataType: "json",
            data : {shareStatus:"1",userId:"user02"},
            headers: { //excess 제어요청 헤더, n : v 형식으로 헤더 추가하면 url의 request header에서 해당 헤더로 값을 얻어올 수 있다.
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            success: function (list){
                console.log(list);
                $("div[name='thumbnails']").remove();
                document.getElementById('fisrtTab').setAttribute('class', '');
                document.getElementById('secondTab').setAttribute('class', '');
                document.getElementById('deleteBtn').setAttribute('class', '');
                document.getElementById('thirdTab').setAttribute('class', 'active');
                $.each(list,function(i,item){
                    console.log(item);
                    $("#for").prepend(
                        "<div name='thumbnails' class='col-md-4 thumbnail' style='float: left; padding: 2px; width:30%; height: 200px'> " +
                        "<a href='/diary/getDiary?diaryNo="+item.diaryId+"'>"+
                        "<p name='backImage' style=\"background-image: url("+item.fileName+")\">" +
                        "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='"+item.diaryId+"' style='float: left' hidden/>" +
                        "<input type='hidden' name='diaryId' value='"+item.diaryId+"'/>" +
                        "<input type='hidden' class='diaryText' value='" + item.diaryText + "'/>" +
                        "제목 : <span >"+item.diaryTitle+"</span><br>" +
                        "날짜 : <span>"+item.diaryDate+"</span><br>" +
                        "날씨 :  <img src='"+item.weather+"' width='20' height='20'/><br>" +
                        "위치 : <span>"+item.location+"</span>" +
                        "</p>"+
                        "</a>"+
                        "</div>"
                    )

                })
            }
            //     )$("#for").prepend(
            //         "<div class='block' th:each='"+list+"' style='float: left'> " +
            //         "<p>" +
            //         "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' th:value='${diary.diaryId}' style='float: left' hidden/>" +
            //         "<input type='hidden' name='diaryId' th:value='${diary.diaryId}'/>" +
            //         "제목 : <span th:text='${diary.diaryTitle}'>제목</span><br>" +
            //         "날짜 : <span th:text='${diary.diaryDate}'>날짜</span><br>" +
            //         "날씨 :  <img th:src='${diary.weather}' width='20' height='20'/><br>" +
            //         "위치 : <span th:text='${diary.location}'>위치</span>" +
            //         "</p>" +
            //         "</div>"
            // }
        });
        return list;
    });


    $('#deleteDiary').click(function (){
        var confirm_val = confirm("정말 삭제하시겠습니까?");

        if(confirm_val){

            var checkArr = [];
            $("input[name=deleteActive]:checked").each(function (i){
                checkArr.push($(this).val());
            });
            $.ajax({
                url : "/restDiary/moveToBin",
                type : "POST",
                data : JSON.stringify(checkArr),
                contentType : "application/json",
                success: function (list){
                    console.log(list);
                    $("div[name='thumbnails']").remove();
                    $.each(list,function(i,item){
                        console.log(item);
                        $("#for").prepend(
                            "<div name='thumbnails' class='col-md-4 thumbnail' style='float: left; padding: 2px; width:30%; height: 200px'> " +
                            "<a href='/diary/getDiary?diaryNo="+item.diaryId+"'>"+
                            "<p name='backImage' style=\"background-image: url("+item.fileName+")\">" +
                            "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='"+item.diaryId+"' style='float: left' hidden/>" +
                            "<input type='hidden' name='diaryId' value='"+item.diaryId+"'/>" +
                            "<input type='hidden' class='diaryText' value='" + item.diaryText + "'/>" +
                            "제목 : <span >"+item.diaryTitle+"</span><br>" +
                            "날짜 : <span>"+item.diaryDate+"</span><br>" +
                            "날씨 :  <img src='"+item.weather+"' width='20' height='20'/><br>" +
                            "위치 : <span>"+item.location+"</span>" +
                            "</p>"+
                            "</a>"+
                            "</div>"
                        )

                    })
                }
            });
        }
    });

    $("#getTagDiaryList").on("click", function () {
        var list = [];

        $.ajax({
            url: "/restDiary/getTagDiaryList",
            method: "get",
            dataType: "json",
            data : {userId:"윤도영"},
            headers: { //excess 제어요청 헤더, n : v 형식으로 헤더 추가하면 url의 request header에서 해당 헤더로 값을 얻어올 수 있다.
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            success: function (list){
                console.log(list);
                $("div[name='thumbnails']").remove();
                document.getElementById('fisrtTab').setAttribute('class', '');
                document.getElementById('secondTab').setAttribute('class', 'active');
                document.getElementById('deleteBtn').setAttribute('class', '');
                document.getElementById('thirdTab').setAttribute('class', '');
                $.each(list,function(i,item){
                    console.log(item);
                    $("#for").prepend(
                        "<div name='thumbnails' id='thisTag' value='" + item.fileName + "' class='col-md-4 thumbnail' style='float: left'> " +
                        "<a href='#'>"+
                        "<p name='backImage' style=\"background-image: url("+item.fileName+")\">" +
                        "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='"+item.diaryId+"' style='float: left' hidden/>" +
                        "<input type='hidden' name='diaryId' value='"+item.diaryId+"'/>" +
                        "<input type='hidden' class='diaryText' value='" + item.fileName + "'/>" +
                        "태그 : <span>"+item.fileName+"</span><br>" +
                        "</p>"+
                        "</a>"+
                        "</div>"
                    )
                })
            }
        });
        return list;
    });

    $(document).on("click","#thisTag", function (){
        $.ajax({
            url: "/restDiary/getTagedList",
            method: "GET",
            dataType: "json",
            data: {tag: $(this).attr('value')},
            contentType: "application/json",
            success: function(list){
                console.log(list);
                $("div[name='thumbnails']").remove();
                $.each(list,function(i,item) {
                    $('#for').prepend(
                        "<div name='thumbnails' class='col-md-4 thumbnail tagList' style='float: left'> " +
                        "<a href='/diary/getDiary?diaryNo="+item.diaryId+"'>"+
                        "<p name='backImage' style=\"background-image: url("+item.fileName+")\">" +
                        "<input type='checkbox' class='deleteActive' name='deleteActive' id='deleteActive' value='"+item.diaryId+"' style='float: left' hidden/>" +
                        "<input type='hidden' name='diaryId' value='"+item.diaryId+"'/>" +
                        "<input type='hidden' class='diaryText' value='" + item.fileName + "'/>" +
                        "태그 : <span>"+item.fileName+"</span><br>" +
                        "제목 : <span>"+item.diaryTitle+"</span><br>" +
                        "날짜 : <span>"+item.diaryDate+"</span><br>" +
                        "날씨 :  <img src='"+item.weather+"' width='20' height='20'/><br>" +
                        "위치 : <span>"+item.location+"</span>" +
                        "</p>"+
                        "</a>"+
                        "</div>"
                    )

                })
            }
        });

    });

    $(function geoFindMe() {

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
            const coordsObj = {
                latitude,
                longitude
            };
            var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ longitude + "&appid=7d9ec3e89f78fa3eef02069216cce88c&units=metric";

            //saveCoords(coordsObj);
            getWeather(latitude, longitude);

        }


        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if(!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = '';
            navigator.geolocation.getCurrentPosition(success, error);
        }

        function getWeather(lat, lon){
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7d9ec3e89f78fa3eef02069216cce88c&units=metric`
            )
                .then(function(response){
                    return response.json();
                })
                .then(function(json){
                    console.log(json);
                    const temparature = String(json.main.temp).substring(0,2);  //온도
                    const place = json.name;   // 사용자 위치
                    var icon = json.weather[0].icon;

                    $('#temparature').append(`${temparature}`)
                    $('#location').append(`${place}`)
                    $('#location1').attr("value", `${place}`)

                    $(".pic").removeClass("pic").addClass(icon);
                    var imgURL = "/images/weather/" + icon + ".png";
                    $('#img').attr("src", imgURL);
                    $('#weather').attr("value", imgURL);
                });


        }
    });
})



// $(document).ready(function() {
//     $('.tabs .tab-links a').on('click', function(e) {
//         var currentAttrValue = jQuery(this).attr('href');
//         // Show/Hide Tabs
//         $('.tabs ' + currentAttrValue).show().siblings().hide();
//
//         // Change/remove current tab to active
//         $(this).parent('li').addClass('active').siblings().removeClass('active');
//
//         e.preventDefault();
//     });
// });

function filter(){
    var value, name, item, i;
    value = document.getElementById("value").value.toUpperCase();
    item = document.getElementsByClassName("thumbnail");
    console.log(value);
    console.log(item);

    for(i=0; i< item.length; i++){
        name = item[i].getElementsByClassName("diaryText");
        if(name[0].value.toUpperCase().indexOf(value) > -1){
            item[i].style.display = "flex";
        }else{
            item[i].style.display = "none";
        }
    }
}



function back(){
    history.go(-1);
}