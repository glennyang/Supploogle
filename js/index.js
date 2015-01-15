
var bounds;
var ne;
var sw;
var listings;
var map;
/*var markers = {
    '3528Vanness':[49.236958, -123.029286],
    '7800Bennett':[49.161017, -123.139208]
}*/


$( document ).ready(function() {
    initialize();
    /*$.getJSON(url, function(listing_object){
        listings = listing_object;
    });*/
    /*$('#home_menu').click(function(){
        var selected_id = $('#home_menu').children('.selected').attr('id');
        var selectd_hidden = $('#hidden_'+selected_id);
        var all_hidden = $('.hidden_menu');
        selectd_hidden.siblings().animate({"left":"-1000px"}, 100).removeClass('visible');
        if (selectd_hidden.hasClass('visible')){
            selectd_hidden.animate({"left":"-1000px"}, 200).removeClass('visible');
        } else {
            selectd_hidden.animate({"left":"0px"}, 200).addClass('visible');
        }
    });*/
});

function initialize() {
    var mapProp = {
        //center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControl: false
    };
    map=new google.maps.Map(document.getElementById("map_canvas"),mapProp);
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position:pos,
                content: 'Location found using HTML5'
            });
            map.setCenter(pos);
        },function(){
            handleNoGeolocation(true);
        },options);
    }else{
        alert("Your browser doesn't support Geolocation");
    }
    google.maps.event.addListener(map, 'bounds_changed', function(){
        bounds = map.getBounds();
        ne = bounds.getNorthEast();
        sw = bounds.getSouthWest();
        console.log("NorthEast"+ne+"SouthWest"+sw);
    });
    /*for(var key in markers){
        var data = markers[key];
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(data[0], data[1]),
            map: map,
            //icon: image,
            title: key
        });
    }*/
    var markers = [];
    for(i=0; i<data.photos.length; i++){
        var dataPhoto = data.photos[i];
        var lat_lng = new google.maps.LatLng(dataPhoto.latitude, dataPhoto.longitude);
        var new_marker = new google.maps.Marker({
            position:lat_lng,
            map:map
        });
        markers.push(new_marker);
        
    }
    var markerCluster = new MarkerClusterer(map, markers);
}
function handleNoGeolocation(errorFlag){
    if(errorFlag){
        var content = 'Error: THe Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t suppport geolocation.';
    }
    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}
google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center); 
});

function show_menu(arg){
    /*$('#'+arg).css('background-color','#00adef');
    $('#'+arg).siblings().css('background-color', '#fff');*/
    var target = $('#home_menu_'+arg);
    var all_hidden = $('.hidden_menu');
    if(target.hasClass('selected')){
        target.removeClass('selected');
        target.children().children().attr('src','images/'+arg+'1_icon.png');
    }else{
        target.addClass('selected');
        target.children().children().attr('src','images/'+arg+'2_icon.png');
        target.siblings().removeClass('selected');
        var args = ['search','filter','layers'];
        target.siblings().each(function (idx, el) {
            for(i=0;i<args.length;i++){
                if(el.id.indexOf(args[i])>-1){
                    $('#'+el.id).children().children().attr('src','images/'+args[i]+'1_icon.png');
                    break;
                }
            }
        });
    }
    var selected_id = $('#home_menu').children('.selected').attr('id');
    if(typeof selected_id != "undefined"){
        var selectd_hidden = $('#hidden_'+selected_id);
        selectd_hidden.siblings().animate({"left":"-1000px"}, 100).removeClass('visible');
        if (selectd_hidden.hasClass('visible')){
            selectd_hidden.animate({"left":"-1000px"}, 200).removeClass('visible');
        } else {
            selectd_hidden.animate({"left":"0px"}, 200).addClass('visible');
        }
    }else{
        all_hidden.animate({"left":"-1000px"}, 100).removeClass('visible');
    }
        
                      //$('#home_menu_'+arg).children().children().attr('src','images/'+arg+'2_icon.png');
    //target.siblings().removeClass('selected');
    //$('#home_menu_'+arg).siblings().children().children().attr('src','images/'+arg+'1_icon.png');
    
}
