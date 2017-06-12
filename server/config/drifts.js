'use strict';


import sendEmail from './mailer';
import unirest from 'unirest';
import winston from 'winston';
import monitor from '../api/monitor/monitor.model';

export default function drifts(){
  var sensors = [];
  var stations = [];
  var globalConfig;
  var drift;
  function getGlobalConfig(){

    monitor.find({})
    .then(data =>{
      for(var i in data){
        if(data[i].isGlobal==='true'){
          globalConfig = data[i];
          //isGlobalConfig = true;
        }
      }

    })
  }
  function getSensors(){
    var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors';
    unirest.get(url)
    .end(function(response){
        sensors = response.body;
    })
  }

  function getDrifts(config, id){


      unirest.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/drift/'+id)
      .end(function(response){
        drift = response.body;
        //console.log("Drift para sensor "+id+" "+drift);
        //console.log('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/drift/'+id);
      })

      if(drift!==undefined){
        sendAlerts(config, drift, id);
      }

  }

  function sendAlerts(config, drift, id){

    var emailId = config.email;
    if(drift.bbool===1){
      if(sensors[id]!==undefined){
        console.log("hay un drift en sensor "+sensors[id].id);
        message = "Drift detectado en sensor id: "+sensors[id].id;
        subject= 'Drift detectado';
        console.log(message);
        sendEmail(subject, message, emailId);
      }


    }else{
      if(sensors[id]!==undefined){
        console.log("todo normal en sensor "+sensors[id].id);
      }

    }
  }

  var setupBol = false;
  function setup(){

    var getSensorsInt = setInterval(function(){
      getSensors();
      getGlobalConfig();
      if(sensors.length>=1){

        setupBol = true;
        startDrift();
        clearInterval(getSensorsInt);
      }else{
        console.log("drift: cargando config");
      }
    }, 1000)
  }

  function startDrift(){
    if(setupBol){
      var startInt = setInterval(function(){

        for(var i in sensors){
          getDrifts(globalConfig,sensors[i].id);
        }
        //getDrifts(globalConfig, );
      }, 60000);
    }
  }

  setup();

}
