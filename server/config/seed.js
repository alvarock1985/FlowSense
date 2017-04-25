/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import Monoption from '../api/monoptions/monoptions.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    Monoption.find({})
      .then(() => {
        Monoption.create({
          interval: 30000 ,
          emailId : 'test@example.com'
        })
        .then(() => console.log('finished polulating monitor options'))
        .catch(err => console.log('error polulating monitor options', err));
      })

    User.find({})
      .then(() => {
        User.create( {
          provider: 'local',
          role: 'admin',
          name: 'Admin',
          email: 'admin@example.com',
          password: 'Unab2017!'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
