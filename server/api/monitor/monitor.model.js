'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './monitor.events';

var MonitorSchema = new mongoose.Schema({
  stationId:Number,
  isGlobal:String,
  email:String,
  sendTime: Number,
  holdTimeData: Number,
  holdTimeRange: Number,
  rangeMax: Number,
  rangeMin: Number

});

registerEvents(MonitorSchema);
export default mongoose.model('Monitor', MonitorSchema);
