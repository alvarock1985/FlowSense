'use strict';

import client from '../api/client/client.model';
import unirest from 'unirest';
import winston  from 'winston';
import md5 from 'blueimp-md5';

export default function clientVersion2(){
  var clientsConfig;
  var newClientsConfig;
  var intervals = [];
  var setupCheck = false;
  var clientLogger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'client/assets/logs/client.log' })
    ]
  });

  clientLogger.log('info', "Starting Clients");
  clientLogger.remove(winston.transports.Console);
  clientLogger.level = 'info';

  function loadConfig(){
    client.find({})
    .then(data =>{
      clientsConfig = data;
    })
  }
  function runClients(client){
    clientLogger.log('info', 'Starting to send client data for sensor: '+client.sensorId);
    var sensorId = client.sensorId;
    var isActive = client.isActive;
    var min = client.rangeMin;
    var max = client.rangeMax;
    var interval = client.monInterval+1000;
    clientLogger.log('info',"Client: running client at: "+interval/1000+" seconds of interval" );
    var runClients = setInterval(function(){
      var dataValue = Math.round((Math.random()*max)+min);
      if(isActive){
        clientLogger.log('info', "sendind data for sensor id: "+sensorId);

        var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/add/proto'
        unirest.post(url)
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send({ "data": dataValue, "sensorId": sensorId })
        .end(function (response) {
                //console.log(response.status);
        });
      }else{
        clientLogger.log('info', "Client for sensor: "+sensorId+" is disabled");
      }
    }, interval);
    intervals.push(runClients);

  }
  function checkChanges(){
    var checkChangesInt = setInterval(function(){
      newClientsConfig= [];
      client.find({})
      .then(data => {
        newClientsConfig = data;
        //console.log(newClientsConfig);
      })
      //console.log(clientsConfig);
      if(newClientsConfig!==undefined){
        var clientsConfigHash = md5(clientsConfig);
        var newClientsConfigHash = md5(newClientsConfig);
        if(clientsConfigHash!==newClientsConfigHash){
          console.log("client config has changed");
          clientsConfig = newClientsConfig;
          intervals.forEach(clearInterval);
          startUp();
        }else{
          console.log("client config is same");
        }
      }else{
        clientLogger.log('info', 'There is no configuration for clients');
      }
    }, 5000);
    intervals.push(checkChangesInt);
  }

  function setupConfig(){
    var setupInt = setInterval(function(){
      loadConfig();
      if(clientsConfig!==undefined){
        clientLogger.log('info', 'Finished loading configurations')
        setupCheck = true;
        clearInterval(setupInt);
      }else{
        clientLogger.log('info', 'Loading configuration...')
      }
    }, 1000);


  }

  function startClients(){
    if(setupCheck){
      for(var i in clientsConfig){
        runClients(clientsConfig[i]);
      }
      checkChanges();
    }
  }

  function startUp(){
    var startConfig = setInterval(function(){
      if(setupCheck){
        clientLogger.log('info', 'Starting clients...');
        startClients();
        clearInterval(startConfig);
      }else{
        clientLogger.log('info', 'Loading clients config...');
      }
    }, 1000);
  }
  setupConfig();
  startUp();
}
