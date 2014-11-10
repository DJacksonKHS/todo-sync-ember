/*global Ember, Todos */
(function () {
	'use strict';

	Todos.Router.map(function () {
		this.resource('todos', { path: '/' }, function () {
			this.route('active');
			this.route('completed');
		});
	});

	Todos.TodosRoute = Ember.Route.extend({
		model: function () {
			return this.store.find('todo');
		},

		afterModel: function (recordArray) {
			// This tells PouchDB to listen for live changes and
			// notify Ember Data when a change comes in.
			new PouchDB('todo').changes({
				since: 'now',
				live: true
			}).on('change', function () {
				recordArray.update();
			});
		}
	});

	Todos.TodosIndexRoute = Todos.TodosRoute.extend({
		templateName: 'todo-list',
		controllerName: 'todos-list'
	});

	Todos.TodosActiveRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return !todo.get('isCompleted');
			});
		}
	});

	Todos.TodosCompletedRoute = Todos.TodosIndexRoute.extend({
		model: function () {
			return this.store.filter('todo', function (todo) {
				return todo.get('isCompleted');
			});
		}
	});
})();
