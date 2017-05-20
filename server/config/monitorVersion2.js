'use strict';
import monitor from '../api/monitor/monitor.model';
import sendEmail from './mailer';

export default function monitorV2(){
  console.log("Monitor: starting monitor");
  var globalConfig;
  var stationsConfig = [];
  var setup = false;
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

  

  var setupConfig = setInterval(function(){
    getGlobalConfig();
    getStationsConfig();
    if(globalConfig!==undefined){
      console.log("Monitor: finished loading globalConfig");
      setup = true;
      clearInterval(setupConfig);
    }else{
      console.log("Monitor: loading globalConfig");
    }
  },1000);


}
