'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './monoptions.events';

var MonoptionsSchema = new mongoose.Schema({
  interval: Number
});

registerEvents(MonoptionsSchema);
export default mongoose.model('Monoptions', MonoptionsSchema);
