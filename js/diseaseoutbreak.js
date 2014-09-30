//v2.0 - 30 sep 2014

var map;
var count = 0;
var loaded = false;
var bounds = [];
var zoombounds = [];
var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1ajIS1HjWaFAn6kw4cbEt6BVvHoKQdTqRPh0TUkudGqs&output=html';

$(document).ready(function(){
 map = new GMaps({
        div: '#themap',
  	lat: 28.2639,
  	lng: 83.9722,
	zoom: 7
      });
map.setCenter(28.2639, 83.9722);

    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true } )
  
 function showInfo(data, tabletop) {
for (i=0;i<data.length;i++){
	addOutbreak(data[i].lat, data[i].lng, data[i].location, data[i].condition, data[i].disease, data);
	}
}

function addOutbreak(lat, lng, location, condition, disease, data){
	 var marker2 = map.addMarker({
	      	lat: lat,
	      	lng: lng,
	      	title: location,
		icon: "img/" + condition + ".png",
	      	infoWindow: {
	       	 content: disease + " in " + location }
	    	});	
	zoombounds.push(marker2.getPosition());
count++;
if (count == data.length) loaded = true; 
}

map.addControl({
		position: 'top_right',
		content: 'View All',
		style: {
          		margin: '5px',
          		padding: '1px 6px',
          		order: 'solid 1px #717B87',
          		background: '#fff'
        	},
		events: {
          		click: function(){
				
				map.fitLatLngBounds(zoombounds);		
				//map.setCenter(25, 25);
				//map.setZoom(2.1);	
		}
	}
	});

      map.addControl({
        position: 'top_right',
        content: 'Locate Me',
        style: {
          margin: '5px',
          padding: '1px 6px',
          border: 'solid 2px #717B87',
          background: '#fff'
        },
        events: {
          click: function(){
            GMaps.geolocate({
              success: function(position){
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
 			var marker1 = map.addMarker({
        			lat: lat,
        			lng: lng,
				icon: "img/iamhere.png",
        			title: 'You are here',
        			infoWindow: {
            			content: 'You are here'}
    			});
			bounds.push(marker1.getPosition());
			zoombounds.push(marker1.getPosition());
			map.removeControl({
				position: 'top_right',
				content: 'Locate Me'
			});
			find_closest_marker(lat, lng);
              },
              error: function(error){
                alert('Geolocation failed: ' + error.message);
              },
              not_supported: function(){
                alert("Your browser does not support geolocation");
              },
  	always: function() {
		
		share.open();
  		}
            });
          }
        }
      });

	
	
	share.open();
    });





function rad(x) {return x*Math.PI/180;}

function find_closest_marker(lat, lng) {
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for( i=0;i<map.markers.length; i++ ) {
        var mlat = map.markers[i].position.lat();
        var mlng = map.markers[i].position.lng();
	if (mlat!=lat && mlng!=lng) {

        	var dLat  = rad(mlat - lat);
        	var dLong = rad(mlng - lng);
        	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        	var d = R * c;
        	distances[i] = d;
        	if ( closest == -1 || d < distances[closest] ) {
            	closest = i;
        	}
	}
    }	
bounds.push(map.markers[closest].getPosition());
path = [[lat, lng], [map.markers[closest].position.lat(), map.markers[closest].position.lng()]];
      Polyline = map.drawPolyline({
        path: path,
        strokeColor: '#2A6496',
        strokeOpacity: 1,
        strokeWeight: 3
      });
map.fitLatLngBounds(bounds);
if (map.markers[closest].infoWindow.content!='You are here'){
	document.getElementById("info").innerHTML =  "<h3> You are closest to <a href='https://www.google.com/search?&q=" + map.markers[closest].infoWindow.content + "' class=\"highlight\">" + map.markers[closest].infoWindow.content + "</a> </strong> (~" + Math.floor(distances[closest]) + " km(s) away from you). </h3>"; 
}
}

   
    
