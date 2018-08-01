module.exports = function () {
  //create a variable that will keep track of the total bill
  var callCost = 0;
  var smsCost = 0;
  var warning = 0;
  var critical = 0;
  var calls = 0;
  var smses = 0;
  var total = 0;
  var recording = [];

  function billType(billItemType){
  if (billItemType === 'call') {
      calls += callCost;
      recording.push({
        billType:'call',
        billValue: callCost,
        billTime:Date.now()
      })
  }
      else if  (billItemType === 'sms') {
      smses += smsCost;
      recording.push({
      billType:'sms',
      billValue: smsCost,
      billTime:new Date()
    })
    }
    total = calls+smses
  }
// function to add

  // setter functions
  function setCallCost(value){
    if (value !== undefined) {
      callCost = parseFloat(value);
    }
  }
  function setSmsCost(value){
    if (value !== undefined) {
      smsCost = parseFloat(value);
    }
  }
  function warningLevel(value){
    if (value !== undefined) {
      warning = parseFloat(value);
    }
  }
  function criticalLevel(value){
    if (value !== undefined) {
      critical = parseFloat(value);
    }
  }
  // getter functions
  function getCalls(){
    return calls.toFixed(2)
  }

  function getSmses(){
    return smses.toFixed(2)
  }

  function getTotals(){
    return total.toFixed(2)

  }

  function isCritical(){
    return total >= critical;
  }


  function colorchange(){
    if (total >= critical){
        // adding the danger class will make the text red
      return "danger";
    }  // waring class makes the text orange
    else if (total >= warning){
      return "warning";
    }
  }
  // takes current object in itteration(1 instance of array) matches it to pass type.
function getRecords(item){
  if(item){
    return recording.filter(function(current){
      if(current.billType === item){

        return current;
      }
    })
  }
  return recording;

}
  return {
    //function aliases (remember to write () to call funtions)
    billItem:     billType,
    callsTotal:   getCalls,
    smsTotal:     getSmses,
    totalBill:    getTotals,
    colour:        colorchange,
    callCost:     setCallCost,
    smsCost:      setSmsCost,
    critical:     criticalLevel,
    warning:      warningLevel,
    overCritical: isCritical,
    records:      getRecords,
  }

}
