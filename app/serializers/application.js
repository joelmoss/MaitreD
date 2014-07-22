import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  extractArray: function(store, type, payload) {
    var nodes = _.map(payload, function(url, name) {
      return {id: name, name: name};
    });

    return this._super(store, type, { nodes: nodes });
  }
});
