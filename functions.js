import AsyncStorage from '@react-native-community/async-storage'
import { USER_TYPE_STAFF, USER_TYPE_ADMIN, USER_TYPE_ROOT } from './constants/constants'

export function dump(obj) {
	var out = '';
	for (var i in obj) {
	out += i + ": " + obj[i] + "\n";
	}
	alert(out);
}

export function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
    if(array[i][attr] === value) {
        return i;
    }
  }
  return -1;
}

// USE TO PROPERLY PRESENT ITEMS IN ROW DIRECTION
export function formatData(data, numColumns){
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;

	}

  return data;
};

export function formatDate(date, format=0) {

  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var monthShortNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sept", "Oct",
    "Nov", "Dec"
  ];
 
  date = parseInt(date)
  d = new Date(date),
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = '' + d.getFullYear(),
  hours = '' + d.getHours(),
  minutes = ''+ d.getMinutes()
  ampm = hours >= 12 ? 'pm' : 'am';

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  if(format){
    switch(format){
      case 1: {
        return monthShortNames[month-1]+' '+day+', '+year+' '+hours+':'+minutes;
      }
      case 2: {
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        strTime = hours + ':' + minutes + ' ' + ampm;
        return monthShortNames[month-1]+' '+day+', '+year+ ', ' + strTime;
      }
      case 3: {
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        strTime = hours + ':' + minutes + ' ' + ampm;
        return monthShortNames[month-1]+' '+day+', '+year;
      }
    }
  }

  return [year, month, day].join('-');
}

export function csvJSON(csv){

  //var csv is the CSV file with headers
  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

export function linkPermission(link, userType){
  // always use to restrict usertype 
  switch(link){

    case 'Home':{
      return true
    }

    case 'Items':{
      if(userType == USER_TYPE_STAFF){
        return false
      }
    }

    case 'Transactions':{
      return true
    }
    
    case 'Reports':{
      return true
    }
    
    case 'Settings':{
      return true
    }

    case 'Settings_Basic':{
      return true
    }

    case 'Settings_Items':{
      if(userType == USER_TYPE_STAFF){
        return false
      }
    }

    case 'SettingsPrinter':{
      return true
    }

    case 'ReportSetup':{
      if(userType == USER_TYPE_STAFF){
        return false
      }
    }

    default:
      return true
  }
}

export function toggleElements(array, value) {
  var index = array.indexOf(value);

  if (index === -1) {
      array.push(value);
  } else {
      array.splice(index, 1);
  }

  return array
}

export function appendShelveButtonBox(items, activeShelve){

  // remove unnescessary empty items
  var data = items.filter((v, i, x) => {
    return v.empty != true
  });
  
  numColumns = 4
  numberOfFullRows = Math.floor(data.length / numColumns)
  numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)

  if(activeShelve.id == 1)
    isButton = false
  else
    isButton = true

  if(data.length == 0 || numberOfElementsLastRow == 0){
    i = 0
    while(i < numColumns){
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true, isButton: isButton })
      isButton = false,
      i++
    }
  }
  else{
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true, isButton: isButton })
      numberOfElementsLastRow++
      isButton = false
    }
  }

  return data
}

export function appendAddChargeButton(data, logged){

  // add create button
  data.push({type: 'ADD_BUTTON'})
  numColumns = 4


  // add empty box to correct list display
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, type: 'EMPTY' });
    numberOfElementsLastRow++
	}

  return data;
}

export function appendTransactionEmptyBox(data){
  if(data.length){

    // remove empty boxes
    console.log('posx1')
    filtered = data.filter((v) => {
      console.log('filter: ')
      console.log(v)
      return v.empty != true  
    })
    console.log('posx2')
    console.log(filtered)
    const numberOfFullRows = Math.floor(filtered.length / numColumns);

    let numberOfElementsLastRow = filtered.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      filtered.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return filtered
  }
  else
    return [];
}
  
export const storeData = async (name, val) => {
  try {
    await AsyncStorage.setItem(name, val)
  } catch (e) {
    // saving error
  }
}

export const getData = async (name) => {
  try {
    const value = await AsyncStorage.getItem(name)
    if(value !== null) {
      // value previously stored
      return value
    }
  } catch(e) {
    // error reading value
  }
}

