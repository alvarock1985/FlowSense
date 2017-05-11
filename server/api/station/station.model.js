'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './station.events';

var StationSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean,
  lat: Number,
  lon: Number,
  status: String,
  type: String,
});

registerEvents(StationSchema);
export default mongoose.model('Station', StationSchema);
