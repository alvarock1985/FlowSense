'use strict';
import http from 'http';
import unirest from 'unirest';
import sendEmail from './mailer';




export default function statusMonitor(interval){
  var url ='http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations'
  var stations = [];
  var interval = interval;
  var newInterval = ''
  var isSame = false;
  var emailId = 'test@example.com';

  var checkInterval = function(){
    unirest.get('http://localhost:3000/api/monoptions/58fd301fd650ab36e5aee2d1')
    .end(function(response){
      var newInterval = response.body.interval*60000;
      emailId = response.body.emailId;
      console.log(emailId);
      if(newInterval===interval){
        console.log("interval is same no changes required");
        isSame = true;
      }else{
        interval = newInterval;
        console.log("interval has changed starting new monitor with "+(newInterval/1000)+" seconds of interval");
        isSame = false;
        clearInterval(startMonitor);
        var newMonitor = setInterval(monitor, newInterval);
      }
    });
  }
  var monitor = function(){
    var subject = '';
    var message = '';
    console.log(emailId)

    unirest.get(url)
    .end(function(response){
      stations = response.body;
      for(var i in stations){
        if(stations[i].status=== 'FAIL'){
          console.log("Station: "+stations[i].description+" is failed")
          message = "Station: "+stations[i].description+" is failed";
          subject= 'Station failed';
          console.log(emailId);
          //sendEmail(subject, message, emailId);
        }else if(stations[i].status=== 'WARN'){
          console.log("Station: "+stations[i].description+" is on warning")
          message = "Station: "+stations[i].description+" is on warning";
          subject= 'Station warning';
          //sendEmail(subject, message, emailId);
        }
      }
    })
  }

  var startMonitor = setInterval(monitor, 10000);

  var checkStatus = setInterval(checkInterval, 10000);
}
