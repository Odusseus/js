class Common {
  static InverseDateString(dateString){
    if(dateString == undefined){
      return null;
    }

    let elements = dateString.split('-');
    let newDateString = null;
    if(elements.length !== 3){
      return null;
    }
    return `${elements[2]}-${elements[1]}-${elements[0]}`;
  }
}

export default Common;