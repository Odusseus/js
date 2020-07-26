export default class Item {
  id;
  value;
  comment;

  constructor(id, value, comment){
    this.value = value;
    this.comment = comment;
    this.id = id;
  }
}