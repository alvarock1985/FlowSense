/**
 * Monoptions model events
 */

'use strict';

import {EventEmitter} from 'events';
var MonoptionsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MonoptionsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Monoptions) {
  for(var e in events) {
    let event = events[e];
    Monoptions.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MonoptionsEvents.emit(event + ':' + doc._id, doc);
    MonoptionsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MonoptionsEvents;
