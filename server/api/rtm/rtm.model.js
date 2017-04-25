'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './rtm.events';

var RtmSchema = new mongoose.Schema({
  values: Number

});

registerEvents(RtmSchema);
export default mongoose.model('Rtm', RtmSchema);
