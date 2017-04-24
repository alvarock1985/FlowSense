/**
 * Station model events
 */

'use strict';

import {EventEmitter} from 'events';
var StationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
StationEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Station) {
  for(var e in events) {
    let event = events[e];
    Station.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    StationEvents.emit(event + ':' + doc._id, doc);
    StationEvents.emit(event, doc);
  };
}

export {registerEvents};
export default StationEvents;
