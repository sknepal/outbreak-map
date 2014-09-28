var map;
var count=-1;
var bounds = [];
var zoombounds = [];
    $(document).ready(function(){
      map = new GMaps({
        div: '#themap',
  	lat: 28.2639,
  	lng: 83.9722,
	zoom: 7
      });
map.setCenter(28.2639, 83.9722);
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

	ebolaMark(6.4280550, -9.429498999999964000, 'Liberia', 'red', 'Ebola');
	ebolaMark(8.460555000000000000, -11.779889000000026000, 'Sierra Leone', 'red', 'Ebola');
	ebolaMark(9.945587000000000000, -9.696644999999990000, 'Guinea', 'red', 'Ebola');
	
	ebolaMark(-0.228021000000000000, 15.827659000000040000, 'Congo', 'yellow', 'Ebola');
	ebolaMark(9.081999000000000000, 8.675277000000051000, 'Nigeria', 'yellow', 'Ebola');
	ebolaMark(7.369721999999999000, 12.354722000000038000, 'Cameroon', 'yellow', 'Polio');
	ebolaMark(5.152149000000000000, 46.199615999999990000, 'Somalia', 'yellow', 'Polio');
	ebolaMark(42.039604200000000000, 9.012892599999986000, 'Corsica (France)', 'yellow', 'Schistosomiasis');
	ebolaMark(33.223191000000000000, 43.679291000000035000, 'Iraq', 'yellow', 'Polio');
	ebolaMark(1.650801000000000000, 10.267894999999953000, 'Equatorial Guinea', 'yellow', 'Polio');
	ebolaMark(9.145000000000001000, 40.489673000000040000, 'Ethiopia', 'yellow', 'Polio');
	ebolaMark(34.802074999999990000, 38.996814999999970000, 'Syria', 'yellow', 'Polio');
	ebolaMark(23.885942000000000000, 45.079162000000000000, 'Arabian Peninsula (Saudi Arabia)', 'yellow', 'MERS (Middle East Respiratory Syndrome)');

	ebolaMark(12.769012600000000000, -85.602364299999970000, 'Central America', 'green', 'Chikungunya');
	ebolaMark(-8.783195000000000000, -55.491477000000030000, 'South America', 'green', 'Chikungunya');
	ebolaMark(-13.759029000000000000, -172.104629000000000000, 'Samoa', 'green', 'Chikungunya');
	ebolaMark(20.154019500000000000, -76.085601000000000000, 'Caribbean', 'green', 'Chikungunya');
	ebolaMark(6.887457400000000000, 158.215071699999950000, 'Federated States of Micronesia', 'green', 'Measles');
	ebolaMark(-14.3333, -170, 'American Samoa', 'green', 'Chikungunya');
	ebolaMark(36.204824000000000000, 138.252924000000000000, 'Japan', 'green', 'Dengue');
	ebolaMark(4.210484000000000000, 101.975766000000020000, 'Malaysia', 'green', 'Sarcocystosis');
	ebolaMark(12.879721000000000000, 121.774016999999960000, 'Phillippines', 'green', 'Measles');
	ebolaMark(14.058324000000000000, 108.277199000000000000, 'Vietnam', 'green', 'Measles');
	ebolaMark(18.735693000000000000, -70.162650999999980000, 'Dominican Republic', 'green', 'Cholera');
	ebolaMark(21.5, -80, 'Cuba', 'green', 'Cholera');
	ebolaMark(23.634501000000000000, -102.552783999999970000, 'Mexico', 'green', 'Cholera');
	ebolaMark(18.971187000000000000, -72.285215000000000000, 'Haiti', 'green', 'Cholera');
	ebolaMark(35.861660000000000000, 104.195396999999960000, 'China', 'green', 'Avian Flu (H7N9)');
	ebolaMark(26.820553000000000000, 30.802498000000014000, 'Egypt', 'green', 'Maleria');
	ebolaMark(-6.369028000000000000, 34.888822000000005000, 'Tanzania', 'green', 'Dengue');
	
	share.open();
    });



function ebolaMark(lat, lng, title, color, disease){
	 var marker2 = map.addMarker({
	      	lat: lat,
	      	lng: lng,
	      	title: title,
		icon: "img/" + color + ".png",
	      	infoWindow: {
	       	 content: disease + " in " + title }
	    	});	
	zoombounds.push(marker2.getPosition());
}

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

