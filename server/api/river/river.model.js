'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './river.events';

var RiverSchema = new mongoose.Schema({
  name: String,
});

registerEvents(RiverSchema);
export default mongoose.model('River', RiverSchema);
