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
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //let days = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    return days[date.getDay()];
  }
}

export default Common;