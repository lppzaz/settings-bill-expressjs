module.exports = function () {
    // create a variable that will keep track of the total bill
    let callCost = 0;
    let smsCost = 0;
    let warning = 0;
    let critical = 0;
    let calls = 0;
    let smses = 0;
    let total = 0;
    let recording = [];

    function billType (billItemType) {
        if (isCritical()) {
            return;
        }

        if (billItemType === 'call') {
            calls += callCost;
            recording.push({
                billType: 'call',
                billValue: callCost,
                billTime: Date.now()
            });
        } else if (billItemType === 'sms') {
            smses += smsCost;
            recording.push({
                billType: 'sms',
                billValue: smsCost,
                billTime: new Date()
            });
        }
        total = calls + smses;
    }
    // function to add

    // setter functions
    function setCallCost (value) {
        if (value !== undefined) {
            callCost = parseFloat(value);
        }
    }
    function setSmsCost (value) {
        if (value !== undefined) {
            smsCost = parseFloat(value);
        }
    }
    function warningLevel (value) {
        if (value !== undefined) {
            warning = parseFloat(value);
        }
    }
    function criticalLevel (value) {
        if (value !== undefined) {
            critical = parseFloat(value);
        }
    }
    // getter functions
    function getCalls () {
        return calls.toFixed(2);
    }

    function getSmses () {
        return smses.toFixed(2);
    }

    function getTotals () {
        return total.toFixed(2);
    }

    function isCritical () {
        return total >= critical;
    }

    function colorchange () {
        if (total >= critical) { // adding the danger class will make the text red
            return 'danger';
        } else if (total >= warning) { // waring class makes the text orange
            return 'warning';
        }
    }
    // takes current object in itteration(1 instance of array) matches it to pass type.
    function getRecords (item) {
        if (item) {
            return recording.filter(function (current) {
                if (current.billType === item) {
                    return current;
                }
            });
        }
        return recording;
    }
    function call () {
        return callCost;
    }
    function sms () {
        return smsCost;
    }
    function warn () {
        return warning;
    }
    function crit () {
        return critical;
    }
    function reset () {
        // settings
        callCost = 0;
        smsCost = 0;
        warning = 0;
        critical = 0;
        // totals
        calls = 0;
        smses = 0;
        total = 0;
    }
    return {
    // function aliases (remember to write () to call funtions)
        billItem: billType,
        callsTotal: getCalls,
        smsTotal: getSmses,
        totalBill: getTotals,
        colour: colorchange,
        callCost: setCallCost,
        smsCost: setSmsCost,
        critical: criticalLevel,
        warning: warningLevel,
        overCritical: isCritical,
        records: getRecords,
        getCall: call,
        getSms: sms,
        getWarn: warn,
        getCrit: crit,
        resetClear: reset
    };
};
