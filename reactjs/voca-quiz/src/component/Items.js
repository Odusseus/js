export default class Items {  
  list = [];

  constructor(){
    this.list = [];
  }

  Add(item){
    this.list.push(item);  
  }

  Delete(id){
    let newList = this.list.filter( item => item.id !== id);
    this.list = newList;
  }

  GetItem(id){
    return this.list.filter( item => item.id === id);
    
  }
}