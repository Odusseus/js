class AppData {
  items;
  
  constructor(items){
    this.setItems(items);
  }

  setItems(items){
    this.items = items;
  }

  getItems(){
    return this.items;
  }
}

export default AppData;