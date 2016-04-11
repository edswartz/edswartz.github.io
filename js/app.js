//get AJAX working for photos <check!>
//add weather icons array <check!>
//change FourSquare oauth_token <challenged by Oauth2 for server>
//add news API's (Twitter, NYT, faceBook, reddit) <challenged by Oauth2 for server>
//get map and marker details into spinning globe <challenged by SVG<->CSS >
//add photo details as hover states <challenged by hidden css attribute>




window.onload = function(){
	$(document).ready(function(){
		$("#info").hide();
		})

	$('#location').bind('keyup', function(event){
	 var location = $(event.target).val();
		if(event.keyCode ==13) {
			var tempEl = $('#current_temp');
			$('#location_text').text(location);
				$(document).ready(function(){
					$("#question").hide();
					})
				$(document).ready(function(){
					$("#info").show();
				})
			var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+ location+ '&APPID=2b156fd55f850bb54f53f7b2381058f6'
				$.get(apiUrl, function(r){
					tempEl.text( convert(r.main.temp));
					lng = r.coord.lon;
					lat = r.coord.lat;
					tempEl.text( initMap(r.coord.lat,r.coord.lon))
						r.weather.forEach(function(jdata){
							var icon = "http://openweathermap.org/img/w/" + jdata.icon + ".png"
								var $wDescription = jdata.description;
								var $iconTag = $('<img>');
								$iconTag.attr('src',icon);
								$('#wIcon').empty();
								$('#wDescription').empty();
								$('#wIcon').append($iconTag);
								$('#wDescription').append($wDescription);
						})
						mapPopulate(lng,lat,location)
   			})
       photo(location);
		};
	})

	function convert(kelvin) {
		return Math.round(((kelvin - 273.15)*9/5)+32);
		}


	function initMap(lat,lng)  {
		var map;
		map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:lat, lng: lng},
		zoom: 10
		});
		var panorama = new google.maps.StreetViewPanorama(
	      document.getElementById('pano'), {
	        position: {lat:lat, lng: lng},
	        pov: {
	          heading: 34,
	          pitch: 5
	        }
	      });
	  map.setStreetView(panorama);
	}

// //Code to get map into spinning globe
// 	function mapPopulate(lng,lat,city) {
// 		var mapLng = ((180 +lng) * 1.26)
// 		var mapLat = ((90-lat) * 1.3)
// 			var a = document.getElementById("edGlobe");
// 			var svgDoc = a.contentDocument;
// 			var marker = svgDoc.getElementById("marker");
// 			marker.setAttribute("transform", "translate("+ mapLng + "," + mapLat +")");
// 			var cityEl = svgDoc.getElementById("city");
// 			$(cityEl).text(city)	
// 		$('.globe__worldmap__front').css({
// 					'left': '0', 'top': '0', 'width': '1000px', 'height': '200px', 'overflow': 'visible',
// 				  'background-image':  'url(' + svgDoc +')',
// 					'z-index': 100,
// 				  'background-repeat': 'no-repeat'})
// 	}

	function photo(location){
		$('#photos').empty()
//			var photoObj = {}
		var urlPartOne = "https://api.foursquare.com/v2/venues/explore?near="+ location
		var urlPartTwo = "&section='sights'&venuePhotos=1&oauth_token=5TGCDCKOGROGKIN1MFG5JFRAEBYG2LMUZ1BTWGBESAL2JNCJ&v=20160319"
		var venueUrl = urlPartOne + urlPartTwo;
			$.get(venueUrl,function(resp){
				$.each(resp.response.groups, function(index,value){
//					var hoverArray = [];
					$.each(this.items, function(){

							var $hovertext =this.venue.name;
	//						hoverArray.push($hovertext);


						$( '.hovertext').append($hovertext);
						$.each(this.venue.photos.groups, function(){
							$.each(this.items,function(){
								var $imageTag = $('<img>');
								$imageTag.attr('src',this.prefix + "300x300" + this.suffix);
								$($imageTag).addClass('hover')
								$imageTag.attr('hovertext',$hovertext)
								$('#photos').append($imageTag)
//								$('#photos p').append($hovertext)

// photoObj.photo = $imageTag;
// photoObj.caption = $hovertext;
// $($imageTag).addClass('hover')
//$(#photos).append(photoObj.photo[0]outerHTML)
console.log($hovertext)
//Code to show text on mouseover
										$('.hover').mouseover(function() {
										  $('.hovertext').css("visibility","visible");
										});

										$('.hover').mouseout(function() {
										  $('.hovertext').css("visibility","hidden");
										});
							})
						})
					})
				})
			})

		}

}
