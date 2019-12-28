class Common {
  static InverseDateString(dateString){
    if(dateString === undefined){
      return null;
    }

    let elements = dateString.split('-');
    if(elements.length !== 3){
      return null;
    }
    return `${elements[2]}-${elements[1]}-${elements[0]}`;
  }

  static GetDay(date){
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }
}

export default Common;