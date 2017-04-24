'use strict';
import http from 'http';
import unirest from 'unirest';
import sendEmail from './mailer';




export default function statusMonitor(interval){
  var url ='http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations'
  var stations = [];
  var interval = interval;


  setInterval(function(){
    var subject = "";
    var message = "";
    unirest.get(url)
    .end(function(response){
        stations = response.body;
        for(var i in stations){
          if(stations[i].status === 'FAIL'){
            subject = "Station Failed";
            message= "station: "+stations[i].description+" is on FAILED condition";
            sendEmail(subject, message);
            console.log("station: "+stations[i].description+" is on FAILED condition");
          }else if(stations[i].status === 'WARN'){
            console.log("station: "+stations[i].description+"is on WARNING condition");
          }
        }
    })



  }, interval )
}
