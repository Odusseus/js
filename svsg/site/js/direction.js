var Svsg = Svsg || {};
Svsg.Direction = {
    direction : function(directionEnum) {
        this.current = 0;
        this.directionEnum = directionEnum;
        this.setCurrentDirection = function(){
            for(var key in this.directionEnum){
                var element = this.directionEnum[key];
                if(element.value == this.current){
                    return element;
                }
            }
            return undefined;
        };
        
        this.next = function() {
            this.current++;
            this.currentDirection = this.setCurrentDirection();
        };
        this.currentDirection = this.setCurrentDirection();
    }
};