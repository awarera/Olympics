<?php
include('db_connection.php');
include('db_functions.php');

// We will get some data from the database; we should already have a database connection

$query = "SELECT * from olympics";
$fixedQuery = "SELECT * from olympics";

if (isset($_GET["times"])) {
	$sev = $_GET['times'];
	// We only need to look for certain values
	switch($sev) {
	case 1:
		$query = "SELECT city, lat, lan FROM olympics GROUP BY city, lat, lan HAVING COUNT(city) > 0";
		break;
	case 2:
		$query = "SELECT city, lat, lan FROM olympics GROUP BY city, lat, lan HAVING COUNT(city) > 1";
		break;
	case 3:
		$query = "SELECT city, lat, lan FROM olympics GROUP BY city, lat, lan HAVING COUNT(city) > 2";
		break;
	default:
	}
}	

if (isset($_GET["search"])) {
	$input = $_GET["search"];
	$query = "SELECT * FROM olympics WHERE city = '$input' ";
}	



// this captures all the results as an array in PHP...
$results = db_assocArrayAll($dbh,$query);
$otherResults = db_assocArrayAll($dbh,$fixedQuery);

// ...however, we want a Javascript array, for the rest of the Javascript to use

echo "<script type='text/javascript'>";
echo "var myData = ".json_encode($results,JSON_NUMERIC_CHECK);
echo "; var myData2 = ".json_encode($otherResults,JSON_NUMERIC_CHECK);
echo "</script>";
?>