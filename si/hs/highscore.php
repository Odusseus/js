<html>
<body>

Welcome <?php if(isset($_POST["name"])) echo $_POST["name"]; ?><br>
Score: <?php if(isset($_POST["score"])) echo $_POST["score"]; ?><br>
Country: <?php if(isset($_POST["country"])) echo $_POST["country"]; ?><br>
Token: <?php if(isset($_POST["token"])) echo $_POST["token"]; ?>

</body>
</html>
<?php

include "classes.php";

$scores = new Scores();

if(  isset($_POST["name"]) and isset($_POST["score"]) and isset($_POST["country"]) and isset($_POST["token"])) {
    $score = new Score($_POST["name"], $_POST["score"], $_POST["country"], $_POST["token"]);

    
    $scores->push($score);
    $scores->save();
}

echo "<br>";
echo "1 Dump-----------------";
echo "<br>";
echo json_encode($scores->getList());

echo "<br>";

$nList = $scores->getList();
var_dump($scores->getList());
echo "<br>";
var_dump($nList);
echo "<br>";
echo "<br>";
 foreach( $nList as $nScore){
     echo $nScore["score"];
     echo "<br>";
     echo $nScore["name"];
     echo "<br>";
     echo $nScore["timestamp"];
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

 ?>

