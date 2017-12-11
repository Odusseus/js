<?php

require_once("constant.php");
require_once("common.php");

date_default_timezone_set('Europe/Amsterdam');

class Score {

    public $name,
           $score,
           $country,
           $token,
           $timestamp,
           $ip;
   
    function __construct($score, $name, $country, $token){
        $this->score = intval($score);
        $this->name = htmlspecialchars($name);
        $this->country = ($country);
        $this->token = htmlspecialchars($token);
        $this->timestamp = date("d-m-Y H:i:s");
        $this->ip = get_client_ip();
    }
}

class Scores {

    public 
        $list = [],
        $filename = "score.json";
    
    function __construct(){
        if(file_exists($this->filename)){
            $str = file_get_contents($this->filename);
            $this->list = json_decode($str);
        }
    }

    public function cut($max){

        if($max > count($this->list)){
            return;
        }

        array_multisort( array_column($this->list, "score"), SORT_DESC,$this->list); 
        
        $newList = [];

        for ($i = 0; $i < $max; $i++) {
            $newList[] = $this->list[$i];
        } 
        $this->list = $newList;
    }

    public function getJson(){
        return json_encode($this->list);
    }

    public function save() {
        $this->cut(MAXHIGGSCORES);
        $str = json_encode($this->list);
        $myfile = fopen($this->filename, "w") or die("Unable to open file!");
        fwrite($myfile, $str);
        fclose($myfile);
    }

    public function delete(){
        unlink($this->filename);
    }

    public function push($score){
        $this->list[] = $score;
    }

    public function getHighestScore(){
        $highScore = null;
        foreach($this->list as $list)
        {
            if(is_null($highScore)){
                $highScore = $list;
            } else {
                if($highScore->score < $list->score){
                    $highScore = $list;
                }
            }
        }
        
        return $highScore;
    }

    public function getList(){
        return $this->list;
    }

    public function getSortList(){
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

class ScoreShort {
    
        public $score,
               $name,
               $country,
               $timestamp;
       
        function __construct($score){
            $this->score = $score->score;
            $this->name = $score->name;
            $this->country = $score->country;
            $this->timestamp = $score->timestamp;
        }
    }

class ScoreShorts {
        
            public $list = [],
                   $scores;

            function __construct($scores){
                foreach( $scores->list as $score){
                    $newScoreShort = new ScoreShort($score);
                    $this->push($newScoreShort);
                 }
            }

            public function getList(){
                return $this->list;
            }
            public function getJsonList(){
                $this->getSortList();
                return json_encode($this->list);
            }

            public function push($scoreShort){
                $this->list[] = $scoreShort;
            }

            public function getSortList(){
                array_multisort( array_column($this->list, "score"), SORT_DESC,$this->list); 
                return $this->list;
            }
        
            public function sortByScore($a, $b) {
                if ($a->score == $b->score) { return 0; }
                return ($a->score < $b->score) ? -1 : 1;
            }
        
            public function sortList(){
                usort($this->list, array($this, "sortByScore"));
            }
        }

?>