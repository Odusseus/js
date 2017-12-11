<?php

include "classe.php";

$scores = new Scores();

$scoreShorts = new ScoreShorts($scores);

echo $scoreShorts->getJsonList();

 ?>

