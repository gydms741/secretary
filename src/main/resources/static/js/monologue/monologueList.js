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


function getMonologue(monologueId,questionId){
    location.href= "/monologue/getMonologue?monologueId="+monologueId+'&questionId='+questionId;
}



$("#getOthersMonologueList").on("click", function () {
    var list = [];

    $.ajax({
        url: "/restMonologue/getOtherMonologueList",
        method: "get",
        dataType: "json",
        data : {shareStatus:"1",userId:$("#userId").val()},
        headers: { //excess 제어요청 헤더, n : v 형식으로 헤더 추가하면 url의 request header에서 해당 헤더로 값을 얻어올 수 있다.
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        success: function (list){
            console.log(list);
            $("div [name='listSet']").remove();
            document.getElementById('fisrtTab').setAttribute('class', '');
            document.getElementById('secondTab').setAttribute('class', 'active');
            document.getElementById('thirdTab').setAttribute('class', '');
            $.each(list.reverse(),function(i,item){
                console.log(item);
                if (item.imageName!=null) {
                    $(".monologueList").append(
                        "<div name=\"listSet\" class='col-md-4 col-lg-3 item'>"+
                        "</div>"
                    )
                }else{
                    $(".monologueList").append(
                        "<div name=\"listSet\" class='col-md-4 col-lg-3 item'>"+
                        "</div>"

                    )
                }

            })
        }
    
    });
    return list;
});



$("#getMonologueList").click(function(){

    $.ajax({
        url : "/restMonologue/getOtherMonologueList",
        type : "GET",
        data :{userId:$("#userId").val()},
        success: function (list){
            console.log(list);

            $("div [name='listSet']").remove();
            document.getElementById('fisrtTab').setAttribute('class', 'active');
            document.getElementById('secondTab').setAttribute('class', '');
            document.getElementById('thirdTab').setAttribute('class', '');
            document.getElementById('deleteBtn').setAttribute('class', '');
            $.each(list,function(i,item){
                console.log(item);
                if (item.imageName!=null) {
                    $(".listDiary").append(
                        "<div name=\"listSet\" class='col-md-4 col-lg-3 item'>"+
                        "<div class='box' style=\"background-image:url("+item.imageName+"); background-repeat:no-repeat; background-size: cover;\">" +
                        "<div class='cover'>" +
                        "<h3 class='name' onclick=\"getDiary("+item.diaryId+")\">"+item.diaryTitle+"</h3>" +
                        "<p class='title'>"+item.diaryDate+"</p>" +
                        "<img src='"+item.weather+"' width='30px' height='30px'/>" +
                        "<div class='social'><a href='#'><i onclick=\"moveToBin("+item.diaryId+")\" class='fas fa-trash-alt'></i></a></div>" +
                        "</div>" +
                        "</div>"+
                        "</div>"
                    )
                }else{
                    $(".listDiary").append(
                        "<div name=\"listSet\" class='col-md-4 col-lg-3 item'>"+
                        "<div class='box' style=\"background-image:url('/images/icon/book.png'); background-repeat:no-repeat; background-size: cover;\">" +
                        "<div class='cover'>" +
                        "<h3 class='name' onclick=\"getDiary("+item.diaryId+")\">"+item.diaryTitle+"</h3>" +
                        "<p class='title'>"+item.diaryDate+"</p>" +
                        "<img src='"+item.weather+"' width='30px' height='30px'/>" +
                        "<div class='social'><a href='#'><i onclick=\"moveToBin("+item.diaryId+")\" class='fas fa-trash-alt'></i></a></div>" +
                        "</div>" +
                        "</div>"+
                        "</div>"

                    )
                }
            })
        }
    });
})