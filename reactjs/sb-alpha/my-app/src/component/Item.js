export default class Item {  
  static maxId = 0;
  id;
  value;
  comment;

  constructor(value, comment){
    this.value = value;
    this.comment = comment;
    this.id = ++Item.maxId;
  }
}