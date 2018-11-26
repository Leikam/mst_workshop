import * as React from 'react';
import { render } from 'react-dom';

import { TodoStore } from './TodoStore';
import { TodoListView } from './TodoListView';

import { types } from 'mobx-state-tree';

// const store = new TodoStore();
const store = TodoStore.create();

render(<TodoListView store={store} />, document.getElementById('root'));

store.addTodo('Get Coffee');
store.addTodo('Write simpler code');
