'use strict';
import http from 'http';
import unirest from 'unirest';
import sendEmail from './mailer';




export default function statusMonitor(_interval){
  var url ='http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations'
  var stations = [];
  var interval = _interval;
  var newInterval = ''
  var isSame = false;
  var emailId = 'test@example.com';

  var checkInterval = function(){
    unirest.get('http://localhost:8080/api/monoptions')
    .end(function(response){
      console.log(response.body);
      if(response.body.length){
        var newInterval = response.body[0].interval*60000;
        emailId = response.body[0].emailId;
        console.log(emailId);
        if(newInterval===interval){
          console.log("interval is same no changes required");

        }else{
          interval = newInterval;
          console.log("interval has changed starting new monitor with "+(newInterval/1000)+" seconds of interval");
          isSame = false;
          clearInterval(startMonitor);
          var newMonitor = setInterval(monitor, newInterval);
        }

      }else{
        console.log("loading...");
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

  var dummyData = function(){
    var dataValue = Math.round((Math.random()*30)+1);
    var dataId = '';
    var timestamp = '';
    var sensorId = 55;

    console.log(dataValue);
    var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/add/proto'
      unirest.post(url)
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .send({ "data": dataValue, "sensorId":55 })
      .end(function (response) {
        console.log(response.status);
});


  }


  var startMonitor = setInterval(monitor, 10000);
  var insertDummy = setInterval(dummyData, 5000);
  var checkStatus = setInterval(checkInterval, 10000);
}
