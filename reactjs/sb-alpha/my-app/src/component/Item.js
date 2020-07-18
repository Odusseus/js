export default class Item {  
  static maxId = 0;
  id;
  value;
  comment;

  constructor(){
    
  }

  new(value, comment){
    this.value = value;
    this.comment = comment;
    this.id = ++Item.maxId;  
  }
}

//export default Item;