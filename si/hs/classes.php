<?php

date_default_timezone_set('Europe/Amsterdam');

class Score {

    public $name,
           $score,
           $country,
           $token,
           $timestamp;
   
    function __construct($name, $score, $country, $token=123){
        $this->name = htmlspecialchars($name);
        $this->score = intval($score);
        $this->token = htmlspecialchars($token);
        $this->country = ($country);
        $this->timestamp = date("d-m-Y H:i:s");
    }
}

class Scores {

    public 
        $list = [],
        $filename = "score.json";
    
    function __construct(){
        if(file_exists($this->filename)){
            $str = file_get_contents($this->filename);
            $this->list = json_decode($str, true);
        }
    }

    public function save() {
        $str = json_encode($this->list);
        $myfile = fopen($this->filename, "w") or die("Unable to open file!");
        fwrite($myfile, $str);
        fclose($myfile);
    }

    public function delete(){
        unlink($this->filename);
    }

    public function push($score){
       $this->list[] = (array) $score;
    }

    public function getList(){
        array_multisort( array_column($this->list, "score"), SORT_DESC,$this->list); 

        return $this->list;
    }

    public function sortByScore($a, $b) {
        if ($a->score == $b->score) { return 0; }
        return ($a->score < $b->score) ? -1 : 1;
        // if ($a["Score"]["score"] == $b["Score"]["score"]) { return 0; }
        // return ($a["Score"]["score"]<$b["Score"]["score"])?-1:1;
        // if ($a["score"] == $b["score"]) { return 0; }
        // return ($a["score"]<$b["score"])?-1:1;
    }

    public function sortList(){
        usort($this->list, array($this, "sortByScore"));
    }

   
      
}

?>