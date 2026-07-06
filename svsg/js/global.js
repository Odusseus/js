var Svsg = Svsg || {};
Svsg.Global = {
    template : function(){
        //this.init = undefined;
        this.goInitialization =  undefined;
        this.initializationField = 0;
        this.initializationReady = undefined;
    
        this.size = 1;
        this.maxFields = 1;
        this.queens = [];
        this.queensTarget = [];
        this.boardTarget = null;
        this.shadok = undefined;
        this.try = 0;
        this.isRequestToStop = false;
        this.modulusOutput = 200;
        
        // Gibi
        this.gibi = undefined;
        this.basisChain = undefined;
        this.gibiTry = 0;
        this.isGibiRequestToStop = false;
        this.statusGibi = Svsg.Enum.status.NOTFOUND;
        this.downCount = 0;
        //this.gibiBoardTarget = null;
        
        this.init = function(){
            this.goInitialization =  undefined;
            this.initializationField = 0;
            this.initializationReady = undefined;
        
            this.size = 1;
            this.maxFields = this.size * this.size;
            this.queens = [];
            this.queensTarget = [];
            this.boardTarget = null;
            this.shadok = undefined;
            this.try = 0;
            
            this.gibi = undefined;
            this.basisChain =  undefined; 
            this.gibiTry = 0;    
            this.isGibiRequestToStop = false;    
            this.statusGibi = Svsg.Enum.status.NOTFOUND;
            this.downCount = 0;
     
            return this;
        };
    },
};