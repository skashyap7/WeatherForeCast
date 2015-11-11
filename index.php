<?php
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET,POST');
	header('Content-Type: Application/json');
	$street = $city = $degree = $state = "";
	/*$street = " 2717 orchard avenue";
	$city ="Los Angeles";
	$state ="California";
	echo("hello world");
	getLocation($street,$city,$state,$degree);*/
	
	if(isset($_GET["street"]))
	{
		$street = validate_data($_GET["street"]);
	}
	if(isset($_GET["city"]))
	{
		$city = validate_data($_GET["city"]);
	}
	if(isset($_GET["state"]))
	{
		$state = validate_data($_GET["state"]);
	}
	if(isset($_GET["degree"]))
	{
		$degree = validate_data($_GET["degree"]);
		getLocation($street,$city,$state,$degree);
	}
	function validate_data($input)
	{
		$input = trim($input);
		$input = stripslashes($input);
		$input = htmlspecialchars($input);
		return $input;
	}
	function getLocation($street,$city,$state,$degree)
	{
		$address = $street.",".$city.",".$state;
		$geo_api_key ="AIzaSyCo1QU56_MFxG2l-TPSUXYP9LrGAYWI5SY";
		$request = urlencode($address)."&key=".$geo_api_key;
		$url = "https://maps.google.com/maps/api/geocode/xml?address=".$request;
		$xml = file_get_contents($url);
		$xml_parsed = simplexml_load_string($xml) or die("Could not parse the xml!");
		// Fetching the Lattitude and Longitude
		$lattitude = $xml_parsed->result[0]->geometry->location->lat;
		$longitude = $xml_parsed->result[0]->geometry->location->lng;
		if($lattitude == "" || $longitude == "")
		{
			echo "Sorry ! No coordinates found !";
			return;
		}
		// Fetching the weather conditions
		$api_key = "97095deb5cae4727d053bf3b9c79ee77";
		$weather = "https://api.forecast.io/forecast/".$api_key."/".$lattitude.",".$longitude."?units=".$degree."&exclude=flags";
		$json = file_get_contents($weather);
		echo $json;
	}
?>

