let assert = require("assert");
let SettingsBill = require("../settings-bill.js");

describe('Checks settings bill for call', function() {
      it('sets call cost value', function() {
        var newInstance = SettingsBill()
        newInstance.callCost(5);
        newInstance.billItem('call');
        newInstance.billItem('call')
        assert.equal(newInstance.callsTotal(), 10)
      });

      it('sets sms cost value', function() {
        var newInstance = SettingsBill()
        newInstance.smsCost(2);
        newInstance.billItem('sms');
        newInstance.billItem('sms')
        assert.equal(newInstance.smsTotal(), 4)
      });
      it('checks total value', function() {
        var newInstance = SettingsBill()
        newInstance.callCost(5);
        newInstance.smsCost(2);
        newInstance.billItem('call');
        newInstance.billItem('call');
        newInstance.billItem('sms');
        newInstance.billItem('sms');
        assert.equal(newInstance.totalBill(), 14)
      });
      it('checks value is over critical level to stop further additions', function() {

          var newInstance = SettingsBill()
          newInstance.callCost(5);

          for (var i = 0; i < 10; i++) {
            newInstance.billItem('call');

          }
          newInstance.critical(50);
          assert.equal(newInstance.overCritical(), true)


        });
        it('checks value is not over critical level and allows further additions', function() {

            var newInstance = SettingsBill()
            newInstance.callCost(4);

            for (var i = 0; i < 10; i++) {
              newInstance.billItem('call');

            }
            newInstance.critical(50);
            assert.equal(newInstance.overCritical(), false)


          });
          it('checks color changes to warning at set level', function() {

              var newInstance = SettingsBill()
              newInstance.callCost(3);

              for (var i = 0; i < 10; i++) {
                newInstance.billItem('call');

              }

              newInstance.critical(50);
              newInstance.warning(30);
              assert.equal(newInstance.colour(), 'warning');



            });
            it('checks color changes to danger at set level', function() {

                var newInstance = SettingsBill()
                newInstance.callCost(5);

                for (var i = 0; i < 10; i++) {
                  newInstance.billItem('call');

                }

                newInstance.critical(50);
                assert.equal(newInstance.colour(),'danger');



              });

      });
