<?php 
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['month']) && isset($_GET['year'])){
    $month = $_GET['month'];
    $year = $_GET['year'];
    $type = $_GET['type'];
    $productName = $_GET['productName'];
    $amount = $_GET['amount'];
}
$query="INSERT INTO angularcode_task.transactions 
    
(`id`, `type`, `productName`, `amount`, `date`, `month`, `year`) 
VALUES 
('', '$type', '$productName', '$amount', CURRENT_TIMESTAMP, '$month', '$year')";
var_dump($query);
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