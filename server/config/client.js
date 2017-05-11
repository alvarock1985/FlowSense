'use strict';
import client from '../api/client/client.model';
import unirest from 'unirest';

export default function startClients(_interval){
  console.log("starting clients");
  var _interval = _interval;
  var newInterval = '';
  var runClientsInt;

  function checkInterval(client, numero){
    var _interval = numero;
    var newInterval = client.monInterval;
    if(_interval === newInterval){
      console.log("interval for client is same,  no changes required");
      return false;
    }else{
      var interval = newInterval;
      console.log("interval has changed starting new monitor with "+newInterval+" seconds of interval");
      return true;

    }

  }

  function runClient(client){
    var sensorId = client.sensorId;
    var isActive = client.isActive;
    var min = client.rangeMin;
    var max = client.rangeMax;
    var interval = client.monInterval;
    console.log("Client: running client at: "+interval+" seconds of interval");
    var dataValue = Math.round((Math.random()*max)+min);
    if(isActive){
      console.log("sendind data for sensor id: "+sensorId)
      var url = 'http://mon.acmeapps.xyz:8080/EmuSensor/webapi/datasensors/add/proto'
      unirest.post(url)
      .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
      .send({ "data": dataValue, "sensorId": sensorId })
      .end(function (response) {
              //console.log(response.status);
      });
    }else{
      console.log("Client for sensor: "+sensorId+" is disabled");
    }
  }

  function getData(){
    var dataClients;
    client.find({})
    .then(data =>{
      dataClients = data;
    })
    if(data!==undefined){
      return dataClients;
    }else{
      return undefined;
      console.log("Client: loading Data");
    }
  }

  function clientStart(intervl){
      var clients;
      var newClients;
      var initData = setInterval(function(){
        console.log("Client: getting initial data");
        client.find({})
        .then(data => {
          clients = data;
        })
        if(clients!==undefined){
          console.log("Client: data load complete!");
          clearInterval(initData);
          console.log(clients);
        }else{
          console.log("Client: loading data");
        }
      }, 1000);

      var clientCheck = setInterval(function(){
        if(clients!==undefined){
          client.find({})
          .then(data => {
            newClients = data;
          })
          if(newClients!==undefined){
            if(newClients.length===clients.length){
              console.log("Client: values are the same: "+newClients.length);

            }else{
              console.log("Client: values changed: "+newClients.length);
              clients = newClients;
              execClient();
            }
          }
        }else{

        }
      }, 5000);

      function execClient(){
        var start = setInterval(function(){
          if(clients!==undefined){
            clients.forEach(function(client){
              runClientsInt = setInterval(function(){
                runClient(client)
              }, client.monInterval*1000);
            })
            clearInterval(start);
          }else{
            console.log("Client: starting parameters");
          }

        }, 1000);

      };

      execClient();
      //client.find({})
      //.then(data => {

      //   data.forEach(function(client){
      //     var intClient = setInterval(function(){runClient(client)}, intervl);
      //     var intCheck = setInterval(function(){
      //       if(newInterval === client.monInterval){
      //         console.log("Client for Station ID: "+client.sensorId+" interval is same");
      //       }else{
      //         console.log("Client for Station ID: "+client.sensorId+" interval has changed to: "+client.monInterval);
      //         newInterval = client.monInterval;
      //         console.log("Client: creating new interval for sending data");
      //         clearInterval(intClient);
      //         var newIntClient = setInterval(function(){runClient(client)}, newInterval*1000);
      //       }
      //     }, 10000);
      //
      //
      //   })
      //})




  }


  clientStart(_interval);

}
