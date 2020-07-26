export default class Item {  
  static maxId = 0;
  id;
  value;
  comment;
  isCompleted;

  constructor(value, comment){
    this.value = value;
    this.comment = comment;
    this.id = ++Item.maxId;
    this.isCompleted = false;  
  }
}