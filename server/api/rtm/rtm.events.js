/**
 * Rtm model events
 */

'use strict';

import {EventEmitter} from 'events';
var RtmEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RtmEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Rtm) {
  for(var e in events) {
    let event = events[e];
    Rtm.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    RtmEvents.emit(event + ':' + doc._id, doc);
    RtmEvents.emit(event, doc);
  };
}

export {registerEvents};
export default RtmEvents;
