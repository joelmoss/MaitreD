import Ember from 'ember';

var Router = Ember.Router.extend({
  location: MaitrDENV.locationType
});

Router.map(function() {
  this.resource('nodes');
});

export default Router;
