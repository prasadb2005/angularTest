<?php 
require_once '../includes/db.php'; // The mysql database connection script
$status = '%';
if(isset($_GET['month']) && isset($_GET['year'])){
    $month = $_GET['month'];
    $year = $_GET['year'];
}
$query="select * from transactions where type='2' && month='$month' && year='$year'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}
# JSON-encode the response
echo $json_response = json_encode($arr);
?>