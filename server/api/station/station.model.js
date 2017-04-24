'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './station.events';

var StationSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(StationSchema);
export default mongoose.model('Station', StationSchema);
