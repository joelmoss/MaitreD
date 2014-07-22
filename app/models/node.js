import DS from 'ember-data';

var at = DS.attr;

export default DS.Model.extend({
  name: at('string')
});
