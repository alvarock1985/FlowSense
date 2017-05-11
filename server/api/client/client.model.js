'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './client.events';

var ClientSchema = new mongoose.Schema({
  stationId: Number,
  sensorId: Number,
  monInterval: Number,
  rangeMin: Number,
  rangeMax: Number,
  isActive: Boolean

});

registerEvents(ClientSchema);
export default mongoose.model('Client', ClientSchema);
