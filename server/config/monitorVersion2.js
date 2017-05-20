'use strict';
import monitor from '../api/monitor/monitor.model';
import sendEmail from './mailer';
import unirest from 'unirest';

export default function monitorV2(){
  console.log("Monitor: starting monitor");
  var globalConfig;
  var stationsConfig = [];
  var setup = false;
  var stations;
  function getGlobalConfig(){
    console.log("Monitor: getting global config");
    monitor.find({})
    .then(data =>{
      for(var i in data){
        if(data[i].isGlobal==='true'){
          globalConfig = data[i];
        }
      }

    })
  }

  function getStationsConfig(){
    console.log("Monitor: getting stations configuration");
    monitor.find({})
    .then(data => {
      for(var i in data){
        if(data[i].isGlobal==='false'){
          stationsConfig.push(data[i]);
        }
      }
    })

  }

  function loadStations(){
    var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations';
    console.log("Monitor: getting stations data");
    unirest.get(url)
    .end(function(response){
      stations = response.body;

    })

  }

  function sendAlarms(config, station){
    var subject;
    var message;
    var emailId = config.email;
    var _interval = (config.sendTime*1000);
    console.log(_interval);
      var sendAlarmI = setInterval(function(){
        if(station.status==="FAIL"){
          console.log(message);
          message = "Station: "+station.description+" has failed";
          subject= 'Station failed';
          sendEmail(subject, message, emailId);

        }else if(station.status==="WARN"){
          console.log(message);
          message = "Station: "+station.description+" is on Warning condition";
          subject= 'Station warning';
          sendEmail(subject, message, emailId);
        }
      }, _interval);
  }

  function startMonitor(){
    if(setup){
      for(var i in stations){
          sendAlarms(globalConfig,stations[i]);
      }
    }
  }

  var setupConfig = setInterval(function(){
    loadStations();
    getGlobalConfig();
    getStationsConfig();
    if(globalConfig!==undefined&&stations!==undefined&&stationsConfig!==undefined){
      console.log("Monitor: finished loading globalConfig");
      setup = true;
      clearInterval(setupConfig);
    }else{
      console.log("Monitor: loading globalConfig");
    }
  },1000);

  var startConfig = setInterval(function(){
    if(setup){
      startMonitor();
      var _interval = (globalConfig.sendTime*1000);
      console.log("Monitor: sending time is: "+_interval);
      clearInterval(startConfig);
    }else{
      console.log("Monitor: loading configurations on monitors")
    }
  },1000);

}
