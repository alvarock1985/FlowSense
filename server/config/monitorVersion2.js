'use strict';
import monitor from '../api/monitor/monitor.model';
import sendEmail from './mailer';
import unirest from 'unirest';
import winston from 'winston';
import md5 from 'blueimp-md5';

export default function monitorV2(){


  winston.add(winston.transports.File, { filename: 'client/assets/logs/monitorV2.log' });
  winston.log('info', "Starting monitor");
  winston.remove(winston.transports.Console);
  winston.level = 'info';

  var sensors;
  var globalConfig;
  var newGlobalConfig;
  var stationsConfig = [];
  var newStationsConfig = [];
  var difStations = [];
  var disSensors = [];
  var setup = false;
  var stations;
  var newStations = [];
  var newSensors = [];
  var isGlobalConfig = false;
  var isDifStations = false;
  var isNewStations = false;
  var intervals = [];
  function getGlobalConfig(){
    winston.log('info', "Getting global config")
    monitor.find({})
    .then(data =>{
      for(var i in data){
        if(data[i].isGlobal==='true'){
          globalConfig = data[i];
          isGlobalConfig = true;
        }
      }

    })
  }

  function getStationsConfig(){
    winston.log('info', "Getting stations configuration" )

    monitor.find({})
    .then(data => {
      stationsConfig = [];
      for(var i in data){
        if(data[i].isGlobal==='false'){
          stationsConfig.push(data[i]);
        }
      }
    })

  }

  function loadStations(){

    var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations';
    winston.log('info', "getting stations data")

    unirest.get(url)
    .end(function(response){
      difStations = [];
      newStations = [];
      stations = response.body;
      //console.log(stationsConfig);
      if(stationsConfig.length){
        for(var i in stations){
          for(var m in stationsConfig){
            if(stations[i].id===stationsConfig[m].stationId){
              difStations.push(stations[i]);
            }else{
              newStations.push(stations[i]);
            }
          }
        }
      }else{
        newStations = stations;
      }


      //console.log(difStations);
      isDifStations = true;
      isNewStations = true;


    })

    var url2 = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors';
    unirest.get(url2)
    .end(function(response){
      sensors = response.body;
      for(var i in sensors){
        for(var m in stationsConfig){
          if(sensors[i].stationid===stationsConfig[m].id){
            difSensors.push(sensors[i]);
          }else{
            newSensors.push(sensors[i]);
          }
        }
      }
    })

  }

  function sendAlarms(config, station){
    winston.log('info', 'Sending alarms for station'+station.description);
    var subject;
    var message;
    var emailId = config.email;


    var _interval = (config.sendTime*60000);

      var sendAlarmI = setInterval(function(){
        if(station.status==="FAIL"){

          message = "Station: "+station.description+" has failed";
          subject= 'Station failed';
          console.log(message);
          sendEmail(subject, message, emailId);

        }else if(station.status==="WARN"){

          message = "Station: "+station.description+" is on Warning condition";
          subject= 'Station warning';
          console.log(message);
          sendEmail(subject, message, emailId);
        }
      }, _interval);
      intervals.push(sendAlarmI);
  }


  function checkData(config, station){
    winston.log('info', "CheckData: starting to check data flow with max tolerance of: "+config.holdTimeData);

    var localSensors = [];
    var dataSensor;

    for(var i in sensors){
      if(station.id===sensors[i].stationid){
        localSensors.push(sensors[i]);
      }
    }


    var checkDataInt = setInterval(function(){
      for(var i in localSensors){
        var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/last/1/'+localSensors[i].id;
        unirest.get(url)
        .end(function(response){
          dataSensor = response.body;
          var date = new Date();
          if(dataSensor!==undefined){
            var timestamp = dataSensor[0].timestamp;
            var dateSensor = new Date(timestamp);
            var lastDateSensor = dateSensor.getTime()+(4*60*60000);
            var currentTime = date.getTime();
            var compare = currentTime - (config.holdTimeData*60000);
            if(lastDateSensor<compare ){
              winston.log('info', "The station: "+station.description+" is not sending data setting sensor as FAIL");
              var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/updateStatus";
              //console.log(localSensors[i].id)
              unirest.post(url)
              .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
              .send({ "id": localSensors[i].id, "status": "FAIL" })
              .end(function (response) {
                //console.log(response.status);
              });
            }else{
              winston.log('info', "The station: "+station.description+" is sending data correctly setting sensor as OK");
              var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/updateStatus";
              unirest.post(url)
              .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
              .send({ "id": localSensors[i].id, "status": "OK" })
              .end(function (response) {
                //console.log(response.status);
              });
            }
          }
        })
      }
    }, 120000);
    intervals.push(checkDataInt);
  }

  function checkRange(config, station){
    winston.log('info', "Starting to check ranges with ranges "+config.rangeMin+" as min and "+config.rangeMax+" as max for station: "+station.description )
    winston.log('info', "CheckRange: checking every: "+config.holdTimeRange+" minutes");

    var localSensors = [];
    var localData = [];
    var dataSensors;
    var dataAvg =0;
    var dataSum =0;
    for(var i in sensors){
      if(station.id===sensors[i].stationid){
        localSensors.push(sensors[i]);
      }
    }
    var checkRangeInt = setInterval(function(){

      for(var i in localSensors) {
        //localData = [];
        //dataSum = 0;
        //dataAvg = 0;

        var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/last/5/'+localSensors[i].id;
        unirest.get(url)
        .end(function(response){
          dataSensors = response.body;
        })
        if(dataSensors!==undefined){

          for(var m in dataSensors){
            localData.push(dataSensors[m].data);
          }
        }
        var value = localData.length;
        dataSum = localData.reduce((a,b)=> a+b, 0);
        dataAvg = Math.round(dataSum/value);
        //console.log(localData);
        //console.log("AVG for station: "+station.description+" on sensor: "+localSensors[i].id+" is "+dataAvg);
        if(dataAvg <= config.rangeMax && dataAvg >= config.rangeMin){
          winston.log('info',"Station: "+station.description+" is in range" );
          var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/updateStatus";
          //console.log(localSensors[i].id)
          unirest.post(url)
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
          .send({ "id": localSensors[i].id, "status": "OK" })
          .end(function (response) {
            //console.log(response.status);
          });

        }else{
          winston.log('info',"Station: "+station.description+" is out of range" );
          var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/updateStatus";
          //console.log(localSensors[i].id)
          unirest.post(url)
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
          .send({ "id": localSensors[i].id, "status": "FAIL" })
          .end(function (response) {
            //console.log(response.status);
          });

        }
      }
    }, 120000);
    intervals.push(checkRangeInt);
  }


  function checkChanges(){
    var checkChangesInt2 = setInterval(function(){
      //console.log("hola");
      //newGlobalConfig = [];
      newStationsConfig = [];
      monitor.find({})
      .then(data =>{
        //console.log(data);
        for(var i in data){
          if(data[i].isGlobal==='true'){
            newGlobalConfig = data[i];
            isGlobalConfig = true;
          }
        }
      })
      monitor.find({})
      .then(data => {
        newStationsConfig = [];
        for(var i in data){
          if(data[i].isGlobal==='false'){
            newStationsConfig.push(data[i]);
          }
        }
      })
      //console.log(newStationsConfig);
      if(newGlobalConfig!==undefined||newStationsConfig.length>0){
        //console.log("chequeando!");
        var globalConfigHash = md5(globalConfig);
        var stationsConfigHash = md5(stationsConfig);
        var newGlobalConfigHash = md5(newGlobalConfig);
        var newStationsConfigHash = md5(newStationsConfig);
        if(globalConfigHash!==newGlobalConfigHash){
          winston.log('info', "Global Config has changed, restarting..." );
          //console.log("Global Config has changed, restarting..." );
          globalConfig = newGlobalConfig;
          intervals.forEach(clearInterval);
          startUp();
        }else if(stationsConfigHash!==newStationsConfigHash){
          winston.log('info', "Stations config has changed, restarting...");
          //console.log("Stations config has changed, restarting...");
          stationsConfig = newStationsConfig;
          intervals.forEach(clearInterval);
          startUp();
        }else{
          winston.log('info', "All configs are the same" );
          //console.log("All configs are the same");
        }
      }
    }, 5000);
    intervals.push(checkChangesInt2);
  }

  function updateStationStatus(station){
    var sensorsLocal;
    var updateInterval = setInterval(function(){
      unirest.get('http://mon.acmeapps.xyz:8080/EmuSensor/webapi/sensors/'+station.id)
      .end(function(response){
        sensorsLocal = response.body;
        var failCount = 0;
        for(var m in sensorsLocal){
          if(sensorsLocal[m].status==='FAIL'){
            failCount++;
          }
        }

        if(failCount===sensorsLocal.length){
          winston.log('info', "station: "+station.description+" is on FAIL");

          var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/updateStatus";
          //console.log(localSensors[i].id)
          unirest.post(url)
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
          .send({ "id": station.id, "status": "FAIL" })
          .end(function (response) {
            //console.log(response.status);
          });
        }else if(failCount>=1&&failCount<sensorsLocal.length){
          winston.log('info',"station: "+station.description+" is on warning" );

          var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/updateStatus";
          //console.log(localSensors[i].id)
          unirest.post(url)
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
          .send({ "id": station.id, "status": "WARN" })
          .end(function (response) {
            //console.log(response.status);
          });
        }else {
          winston.log('info', "station: "+station.description+" is OK");

          var url = "http://mon.acmeapps.xyz:8080/EmuSensor/webapi/stations/updateStatus";
          //console.log(localSensors[i].id)
          unirest.post(url)
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
          .send({ "id": station.id, "status": "OK" })
          .end(function (response) {
            //console.log(response.status);
          });
        }
      });
    }, 120000);
    intervals.push(updateInterval);


  }
  function startMonitor(){
    if(setup){
      for(var i in newStations){
          sendAlarms(globalConfig,newStations[i]);
          checkData(globalConfig, newStations[i]);
          checkRange(globalConfig,newStations[i]);
          updateStationStatus(newStations[i]);
        }
      for(var i in difStations){
        for(var m in stationsConfig){
          if(difStations[i].id===stationsConfig[m].stationId){
            sendAlarms(stationsConfig[m], difStations[i]);
            checkData(stationsConfig[m], difStations[i]);
            checkRange(stationsConfig[m], difStations[i]);
            updateStationStatus(difStations[i]);
          }
        }
      }

    }
  }

  var setupConfig = setInterval(function(){
    loadStations();
    getGlobalConfig();
    getStationsConfig();
    //console.log(newStations);
    if(newStations.length>0){
      winston.log('info', "Finished loading globalConfig");
      setup = true;
      clearInterval(setupConfig);
    }else{
      winston.log('info', "Loading globalConfig");
      //console.log("loading globalconfig")
    }
  },1000);




  function startUp(){
    var startConfig = setInterval(function(){
      if(setup){
        winston.log('info',"Starting monitor...");
        //console.log("startint monitor");
        startMonitor();
        //checkData();
        checkChanges();
        clearInterval(startConfig);
      }else{
        //console.log("loading monitor");
        winston.log('info', "Loading configurations on monitors")
      }
    }, 1000);
  }

  startUp();
}
