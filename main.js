var timezone;
var Offset;
function clearForm(form) {
	document.getElementById("street").value = "";
	document.getElementById("state").value = "";
	document.getElementById("city").value = "";
	document.forms["forecast_form"]["temprature"].value ="us";
	document.getElementById("street-error").innerHTML = "";
	document.getElementById("city-error").innerHTML = "";
	document.getElementById("state-error").innerHTML = "";
    $("#results").hide();
}

function get_time(epoch_time) {
    var symbol = "AM" ,hour;
    var myoffset =-8;
    var offset = (Offset - myoffset)*3600000;
    var mydate = new Date((epoch_time * 1000)+offset);
    hour = mydate.getHours();
    if (hour > 12) {
		hour = hour - 12;
		symbol = "PM";
	}
	var minutes = mydate.getMinutes();
	if( minutes < 10)
	{
		minutes = "0"+minutes;
	}
	var mytime = hour+":"+minutes+" "+symbol;
	return mytime;
}
function get_month_day(epoch_time) {
    var myoffset =-8;
    var offset = (Offset - myoffset)*3600000;
    var mydate = new Date((epoch_time * 1000)+offset);
	var month = new Array();
	month[0] = "Jan";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Apr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Aug";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov";
	month[11] = "Dec";
	var day = month[mydate.getMonth()];
	var date = mydate.getDate();
	var month_day = day +" "+ date;
	return month_day;
}
function get_day(epoch_time) {
	var mydate = new Date(epoch_time * 1000);
	var day = mydate.getDay();
	var myday;
	switch(day) {
		case 0:
				myday = "Sunday";
				break;
		case 1:
				myday = "Monday";
				break;
		case 2:
				myday = "Tuesday";
				break;
		case 3:
				myday = "Wednesday";
				break;
		case 4:
				myday = "Thursday";
				break;
		case 5:
				myday = "Friday";
				break;
		case 6:
				myday = "Saturday";
				break;
				
	}
	return myday;
}

function get_precipitation(precIntensity) {
	if ( precIntensity >= 0 && precIntensity < 0.002 )
	{
		var precipitation = "None";
	}
	else if ( precIntensity >= 0.002 && precIntensity < 0.017 )
	{
		var precipitation = "Very Light";
	}
	else if ( precIntensity >= 0.017 && precIntensity < 0.1 )
	{
		var precipitation = "Light";
	}
	else if ( precIntensity >= 0.1 && precIntensity < 0.4 )
	{
		var precipitation = "Moderate";
	}
	else if ( precIntensity >= 0.4 )
	{
		var precipitation = "Heavy";
	}
	return precipitation;
}

function val_check(var_value)
{
    if(var_value == undefined)
        return false;
    return true;
}
function get_image_url(icon) {
	var url ;
	switch(icon){
		case 'clear-day':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/clear.png';
				break;
		case 'clear-night':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/clear_night.png';
				break;
		case 'rain':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/rain.png';
				break;
		case 'snow':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/snow.png';
				break;
		case 'sleet':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/sleet.png';
				break;
		case 'wind':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/wind.png';
				break;
		case 'fog':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/fog.png';
				break;
		case 'cloudy':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/cloudy.png';
				break;
		case 'partly-cloudy-day':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/cloud_day.png';
				break;
		case 'partly-cloudy-night':
				url = 'http://cs-server.usc.edu:45678/hw/hw8/images/cloud_night.png';
				break;
	}
	return url;
}

function create_data_row(time,summary,cloud_cover,temprature,wind,humidity,visibility,pressure,id)
{
	var output = "",heading = "", data = "";
    var table = "";
	var id = "acc"+id;
    
    
   	/*heading = "<p><span class=\"col-md-3\">Wind</span><span class=\"col-md-3\">Humidity"+
    	"</span><span class=\"col-md-3\">Visibility</span><span class=\"col-md-3\">Pressure</span></p>";
    
    data ="<p><span class=\"col-md-3\">"+wind+"</span><span class=\"col-md-3\">"+humidity+
    "</span><span class=\"col-md-3\">"+visibility+"</span><span class=\"col-md-3\">"+pressure+"</span></p>";
    
    table = "<tr class=\"hiddenRow\"><td colspan=\"5\" class=\"well\" ><div class=\"accordian-body collapse hiddenRow \" id="+id+
    "><div class=\"panel\"><div class=\"panel-body\">"+heading+
    "</div><div class=\"hiddenRow\">"+data+"</div></div></div></td></tr>";*/
    
    heading = "<th>Wind</th><th>Humidity</th><th>Visibility</th><th>Pressure</th>";
    
    data ="<td>"+wind+"</td><td>"+humidity+"</td><td>"+visibility+"</td><td>"+pressure+"</td>";
    
    table = "<tr><td class=\"hiddenRow well inner\" colspan=\"5\">"+
        "<div class=\"accordion-body collapse  inner-table\" id="+id+"><table class=\"table\" >"+
        "<thead><tr>"+heading+
        "</tr><thead><tbody class=\"inner-body\" ><tr>"+data+"</tr></tbody></table></div></td></tr>";

    
	output += "<tr>" +
	"<td>"+time+"</td>"+
	"<td><img class=\"img-responsive hourly-img\" src="+summary+" /></td>"+
	"<td>"+cloud_cover+"</td>" +
	"<td>"+temprature+"</td>" +
	"<td><a data-toggle=\"collapse\" href=\"#"+id+"\" class=\"accordion-toggle\" ><span class=\"glyphicon glyphicon-plus \"></span></a></td>"+
    table+"</tr>";
    
	$('#hourly').append(output);
    $('.hourly-img').attr({height:80});
    $('.hourly-img').attr({width:80});
    $('.heading-inner').css("background-color","white");
    $('.inner').css("padding-top","0px");
    $('.inner').css("padding-bottom","0px");
    $('.inner-table').css("margin","20px");
    $('.inner-body').css("background-color","#f5f5f5");
}

function create_data_row_daily(day,month_day,summary,details,min_daily,max_daily,sunrise_daily,sunset_daily,humidity,wind,visibility,pressure,i,city)
{
	var output = "";
	var id ="day"+i;
    var cont_div = "content-"+id;
	var modal_id = "modal"+id;
	output= "<p>"+day+"<br/>"+month_day+"<br/></p>"+
			"<img class=\"weekly-image\" src="+summary+" \><br/>Min<br/>Temp<br/><h3><b>"+
			min_daily+"<b></h3><br/>Max<br/>Temp<br/><h3><b>"+max_daily+"</b></h3>";
    var mymodal = "<div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header head1\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><h4 class=\"modal-title pull-left\">Weather in "+city+" on "+month_day+"</h4></div><div class=\"modal-body\"><img height=120 width=120 src="+summary+" /><br/><h3><span class=\"day\">"+day+":</span><span class=\"summary\">"+details+"</span></h3><br/><div class=\"row\"><div class=\"col-sm-4 content\"><h4><b>Sunrise Time</b></h4><h4>"+sunrise_daily+"</h4></div><div class=\"col-sm-4 content\" ><h4><b>Sunset Time</b></h4><h4>"+sunset_daily+"</h4></div><div class=\"col-sm-4 content\" ><h4><b>Humidity</b></h4><h4>"+humidity+ "</h4></div></div><div class=\"row\" ><div class=\"col-sm-4 content\" ><h4><b>Wind Speed</b></h4><h4>  "+wind+ "</h4></div><div class=\"col-sm-4 content\" ><h4><b>Visibility</b></h4><h4>  "+visibility+ "</h4></div><div class=\"col-sm-4 content\" ><h4><b>Pressure</b></h4><h4>  "+pressure+ "</h4></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\">Close</button></div></div></div>";
	$('#'+modal_id).html(mymodal);
    $('#'+cont_div).html(output);
	//document.getElementById(cont_div).innerHTML = output;
    //document.getElementById(modal_id).innerHTML = mymodal;
    $(".weekly-image").attr({height:50,width:50});
    $(".title").css("color","black");
    $(".content").css("color","black");
    $(".head1").css("color","black");
    $(".day").css("color","black");
	$(".summary").css("color","#FFA500");
}

$(document).ready(function(){
	$("#submit").click(function(){
		var error = false;
        $("#street").change(function(){
           if( $.trim($("#street").val()) == "" )
           {
                $("#street-error").text("Please enter the street address");
			    error =true;   
           }
            else{
                $("#street-error").text("");
			    error = false; 
            }
        });
        $("#city").change(function(){
           if( $.trim($("#city").val()) =="" )
           {
                $("#city-error").text("Please enter the city");
			    error =true;   
           }
            else{
                $("#city-error").text("");
                error = false;   
            }
        });
        $("#state").change(function(){
           if( $.trim($("#state").val()) == "" )
           {
                $("#state-error").text("Please select a state");
			    error =true;   
           }
           else{
               $("#state-error").text("");
               error = "false";
           }
        });
		if($.trim($("#street").val()) =="" || $("#street").val() == null)
		{
			console.log(" Street address not present");
			$("#street-error").text("Please enter the street address");
			error =true;
		}
		else{
			$street = $("#street").val();
		}
		if($.trim($("#city").val())=="" || $("#city").val() == null)
		{
			console.log(" City not provided");
			$("#city-error").text("Please enter the city");
			error = true;
		}
		else{
			$city = $("#city").val();
		}
		if($.trim($("#state").val())=="" || $("#state").val() == null)
		{
			console.log(" State not provided");
			$("#state-error").text("Please select a state");
			error = true;
		}
		else{
			$state = $("#state").val();
		}
		
		$degree = document.forms["forecast_form"]["temprature"].value;
		var unit;
		if($degree == "si")
		{
			unit = " °C";
			visibility_unit =" km";
			wind_unit =" m/s";
			pressure_unit =" hPa";
		}
		else{
			unit = " °F";
			visibility_unit =" mi";
			wind_unit =" mph";
			pressure_unit = " mb";
		}
		if(error == false)
		{
			console.log("Values are "+$street+", "+$city+", "+$state+","+$degree);
			var request = $.ajax({
				url: "http://sumancsci571-env.elasticbeanstalk.com/",
				type: "GET",
				data: {street: $street, city: $city, state: $state, degree: $degree},
				dataType: 'json',
				success: function(data)
				{
					console.log("Ajax call Successful");
                    // Cleaning up the second tab and graph before another call
                    document.getElementById("hourly-cleanup").innerHTML="";
                    document.getElementById("map-canvas").innerHTML="";
                    // Fetching the timezone from the data object
                    timezone = data.timezone;
                    Offset = data.offset;
					var summary = data['currently'].summary;
					var temperature = parseInt(data['currently'].temperature);
					var icon = data['currently'].icon;
					var url = get_image_url(icon);
					
					var tempratureMax = parseInt(data['daily']['data'][0].temperatureMax);
					var tempratureMin = parseInt(data['daily']['data'][0].temperatureMin);
					var precIntensity = data['currently'].precipIntensity;
					var precipitation = get_precipitation(precIntensity);
					var chance_of_rain = (parseInt(data['currently'].precipProbability*100))+" %";
					var wind_speed = ((data['currently'].windSpeed).toFixed(2))+wind_unit;
					var dew_point = (data['currently'].dewPoint).toFixed(2)+unit;
					var humidity = (parseInt(data['currently'].humidity*100))+" %";
					var visibility = val_check((data['currently'].visibility))?(data['currently'].visibility).toFixed(2)+visibility_unit:"NA";
					var sunrise = data['daily']['data'][1].sunriseTime;
					var sunset = data['daily']['data'][1].sunsetTime;
					var sunrise_hour = get_time(sunrise);
					var sunset_hour = get_time(sunset);
					$("#icon").attr({src:url});
					$("#summary").html("<p>"+summary+" in "+$city+"</p><span id=\"temp-bold\">"+
						temperature+"<sup id=\"t\">"+unit+"</sup></span><p><span id=\"l\">L: "+
						tempratureMin+"</span><span id=\"seperator\"> | </span><span id=\"h\" >H:"+
						tempratureMax+"</span><a id=\"facebook-share\" ><img class=\"img-responsive pull-right\" width=\"40\" height=\"40\" src=\"http://cs-server.usc.edu:45678/hw/hw8/images/fb_icon.png\"></a>"
						+"</p>");
                    var city_state = $city+","+$state;
                    var summary_fb = summary+","+temperature+unit;
					$("#temp-bold").css("font-size","400%");
					$("#temp-bold").css("vertical-align","super");
					$("#h").css("color", "green");
					$("#t").css("font-size","14px");
					$("#l").css("color","blue");
					$("#seperator").css("color","black");
					$("#precipitation_daily").text(precipitation);
					$("#rain-daily").text(chance_of_rain);
					$("#wind-daily").text(wind_speed);
					$("#dew-daily").text(dew_point);
					$("#humidity-daily").text(humidity);
					$("#visibility-daily").text(visibility);
					$("#sunrise-daily").text(sunrise_hour);
					$("#sunset-daily").text(sunset_hour);
				    $("#facebook-share").click(function(){
                        FB.ui({
                             method: 'feed',
                             redirect_uri: 'http://www-scf.usc.edu/~sumankas/assignment8/index.html',
                             picture: url,
                             caption: 'Weather Information from Forecast.io',
                             link: 'http://forecast.io',
                             name: 'Current Weather in '+city_state,
                            description: summary_fb,
                            /*method: 'share_open_graph',
                            action_type: 'og.likes',
                            action_properties: JSON.stringify({
                            object:'http://www-scf.usc.edu/~sumankas/assignment8/index.html'*/
                            }, function(response){
                                // Debug response (optional)
                                console.log(response);
                                if(response == null)
                                {
                                    alert("Not Posted");
                                }
                                else{
                                    alert("Posted Successfully");
                                }
                            }); 
                    });
                    console.log(summary,icon,tempratureMax,tempratureMin,precipitation);
					/** Function for Hourly weather Updates **/
					var json_hourly = data['hourly'];
					$("#temp-unit").text(unit);
					for( var i= 1; i < 25 ;i++)
					{
						var time = get_time(data['hourly'].data[i].time);
						var summary = get_image_url(data['hourly'].data[i].icon);
						var cloud_cover = parseInt((data['hourly'].data[i].cloudCover)*100)+" %";
						var temprature = (data['hourly'].data[i].temperature).toFixed(2);
						var wind = (data['hourly'].data[i].windSpeed)+wind_unit;
						var humidity = parseInt(data['hourly'].data[i].humidity)+" %";
						var visibility = val_check(data['hourly'].data[i].visibility)?(data['hourly'].data[i].visibility).toFixed(2)+visibility_unit:"NA";
						var pressure = data['hourly'].data[i].pressure + pressure_unit;
						create_data_row(time,summary,cloud_cover,temprature,wind,humidity,visibility,pressure,i);
					}
					// Displaying the data for the week 
					for( var i= 1; i < 8 ;i++)
					{
						var day = get_day(data['daily'].data[i].time);
						var month_day = get_month_day(data['daily'].data[i].time);
						var summary = get_image_url(data['daily'].data[i].icon);
						var details = (data['daily'].data[i].summary);
						var cloud_cover = parseInt((data['daily'].data[i].cloudCover)*100)+" %";
						var wind = (data['daily'].data[i].windSpeed)+wind_unit;
						var humidity = parseInt(data['daily'].data[i].humidity)+" %";
						var visibility = val_check(data['daily'].data[i].visibility)?(data['daily'].data[i].visibility).toFixed(2)+visibility_unit:"NA";
						var pressure = data['daily'].data[i].pressure + pressure_unit;
						var max_daily = parseInt(data['daily'].data[i].temperatureMax)+"°";
						var min_daily = parseInt(data['daily'].data[i].temperatureMin)+"°";
						var sunrise_daily = get_time(data['daily'].data[i].sunriseTime);
						var sunset_daily = get_time(data['daily'].data[i].sunsetTime);
						              create_data_row_daily(day,month_day,summary,details,min_daily,max_daily,sunrise_daily,sunset_daily,humidity,wind,visibility,pressure,i,$city);
					}
                    $("#results").show(); 
                    /***  Handling the openLayers Map **/
					var openWeatherAPIkey = "55ffd0285f33d0f7bb65f66c27071886";
					var longitude = data.longitude;
					var lattitude = data.latitude;
                    map = new OpenLayers.Map("map-canvas");
                    var mapnik         = new OpenLayers.Layer.OSM();
                    var fromProjection = new OpenLayers.Projection("EPSG:4326");
                    var toProjection   = new OpenLayers.Projection("EPSG:900913");
                    var position       = new OpenLayers.LonLat(longitude,lattitude).transform( fromProjection, toProjection);
                    var zoom           = 6; 
                    map.addLayer(mapnik);
                    map.setCenter(position, zoom );
                    var precipitation = new OpenLayers.Layer.XYZ(
                        "Precipitation forecasts",
                        "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png",
                        {
                            numZoomLevels: 6, 
                            isBaseLayer: false,
                            opacity: 0.6,
                            sphericalMercator: true
                        }
                    );

                    var clouds = new OpenLayers.Layer.XYZ(
                        "Clouds forecasts",
                        "http://${s}.tile.openweathermap.org/map/clouds/${z}/${x}/${y}.png",
                        {
                            numZoomLevels: 6, 
                            isBaseLayer: false,
                            opacity: 0.7,
                            sphericalMercator: true
                        }
                    );
					map.addLayer(precipitation);
	                map.addLayer(clouds);
				},
				error: function ( jqXHR, textStatus,errorThrown){
						console.log(textStatus);
						console.log(errorThrown);
						//alert("Error");
				} 
			});
			
		}
	});
});