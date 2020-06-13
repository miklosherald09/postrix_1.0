export const INIT_PRINTER = 'INIT_PRINTER'
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';


export function initPrinter() {

  console.log('enabling bluetooth...')
  // try to enable bluetooth
  BluetoothManager.enableBluetooth().then((r)=>{
    var paired = [];
    if(r && r.length>0){
      for(var i=0;i<r.length;i++){
        try{
          paired.push(JSON.parse(r[i])); // NEED TO PARSE THE DEVICE INFORMATION
        }catch(e){
          //ignore
        }
      }
    }
      console.log(JSON.stringify(paired))
  },(err)=>{
    console.log(err)
  });

  console.log('initialize printer')
  // try to connect to printer
  return {
    type: INIT_PRINTER,
  }
}