<?php 
require_once '../includes/db.php'; // The mysql database connection script
$id = '%';

if(isset($_GET['id'])){
    $id = $_GET['id'];
}
$query="DELETE FROM  angularcode_task.transactions WHERE transactions.id ='$id'";
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