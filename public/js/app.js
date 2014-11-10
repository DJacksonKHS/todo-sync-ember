/*global Ember, EmberPouch, PouchDB, Todos:true */
window.Todos = Ember.Application.create({});

var db = new PouchDB('todo');

/*
db.sync('http://localhost:3000/db/todo', {
	live: true
});
*/

Todos.ApplicationAdapter = EmberPouch.Adapter.extend({
	db: db
});
