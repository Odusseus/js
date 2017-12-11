<html>
<body>

Welcome <?php if(isset($_POST["name"])) echo $_POST["name"]; ?><br>
Score: <?php if(isset($_POST["score"])) echo $_POST["score"]; ?><br>
Country: <?php if(isset($_POST["country"])) echo $_POST["country"]; ?><br>
Token: <?php if(isset($_POST["token"])) echo $_POST["token"]; ?>

</body>
</html>
<?php

include "classe.php";

$scores = new Scores();

//$actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
//echo "actual_link " . $actual_link . "<br>";

$ip = getenv('HTTP_CLIENT_IP')?:
getenv('HTTP_X_FORWARDED_FOR')?:
getenv('HTTP_X_FORWARDED')?:
getenv('HTTP_FORWARDED_FOR')?:
getenv('HTTP_FORWARDED')?:
getenv('REMOTE_ADDR');

echo $ip;

if(  isset($_POST["name"]) and isset($_POST["score"]) and isset($_POST["country"]) and isset($_POST["token"])) {

    $score = new Score($_POST["score"], $_POST["name"], $_POST["country"], $_POST["token"]);
    if($score->score > $scores->getHighestScore()->score){
        $scores->push($score);
        $scores->save();
    }
}

echo "<br>";
echo "1 Dump-----------------";
echo "<br>";
echo json_encode($scores->getList());
echo "<br>";

$nList = $scores->getList();
//var_dump($scores->getList());
//echo "<br>";
//var_dump($nList);
echo "<br>";
echo "<br>";
 foreach( $nList as $nScore){
    //echo $nScore["score"];
    echo $nScore->score;
     echo "<br>";
     echo $nScore->name;
     echo "<br>";
     echo $nScore->timestamp;
     echo "<br>";
     echo "------------<br>";
 }

// echo "<br>";
// echo "2-----------------";
// echo "<br>";
//  var_dump($scores->getList()[0]);
//  echo "<br>";
//  echo $scores->getList()[0]["name"];
//  echo "<br>";
//  echo "-----------------";
//  echo "<br>";
//  foreach($scores->getList() as $newScore){
//      echo $newScore["score"];
//      echo $newScore["name"];
//      echo $newScore["timestamp"];
//      echo "<br>";
//  }

echo "<br>";
echo "highestScore";
echo "<br>";
$highestScore = $scores->getHighestScore();
echo $highestScore->score;
echo $highestScore->name;



 ?>

