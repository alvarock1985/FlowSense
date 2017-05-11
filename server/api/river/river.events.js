/**
 * River model events
 */

'use strict';

import {EventEmitter} from 'events';
var RiverEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RiverEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(River) {
  for(var e in events) {
    let event = events[e];
    River.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    RiverEvents.emit(event + ':' + doc._id, doc);
    RiverEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RiverEvents;
