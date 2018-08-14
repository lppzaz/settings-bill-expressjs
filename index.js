'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');
const moment = require('moment');
const app = express();
const settingsBill = SettingsBill();
const PORT = process.env.PORT || 3100;

app.use(express.static('public'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        'formattedDate': function () {
            return moment(this.billTime).fromNow();
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    let totals = {
        callsTotal: settingsBill.callsTotal(),
        smsTotal: settingsBill.smsTotal(),
        allTotal: settingsBill.totalBill(),
        colorclass: settingsBill.colour()
    // CritLevel: settingsBill.overCritical()
    };
    let amounts = {
        callCost: settingsBill.getCall(),
        smsCost: settingsBill.getSms(),
        warningLevel: settingsBill.getWarn(),
        criticalLevel: settingsBill.getCrit()
    };
    res.render('home', {totals, amounts});
});

// CALCULATE
app.post('/calculate', function (req, res) {
    // grab bill item from radio button
    let billItemType = req.body.billType;
    // using data from the form
    settingsBill.billItem(billItemType);
    res.redirect('/');
});

// SETTINGS

app.post('/settings', function (req, res) {
    // collect data from the form
    let call = req.body.callCost;
    let sms = req.body.smsCost;
    let warn = req.body.warningLevel;
    let crit = req.body.criticalLevel;

    // set data
    settingsBill.callCost(call);
    settingsBill.smsCost(sms);
    settingsBill.warning(warn);
    settingsBill.critical(crit);

    // saving user values on screen

    res.redirect('/');
});
// create route to reset fields

app.get('/reset', function (req, res) {
    settingsBill.resetClear();

    res.redirect('/');
});

// create route for records of actions
app.get('/actions', function (req, res) {
    var Records = settingsBill.records();
    res.render('actions', {records: Records});
});
app.get('/actions/:item', function (req, res) {
    var itemz = req.params.item;
    var Records = settingsBill.records(itemz);
    res.render('actions', {records: Records});
});

app.listen(PORT, function () {
    console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});
