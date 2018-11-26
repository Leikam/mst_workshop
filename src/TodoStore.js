import { observable, computed, action } from "mobx";
import { types } from "mobx-state-tree";

// export class TodoStore {
//     @observable todos = [];

//     @computed
//     get unfinishedTodoCount() {
//         console.log("Computed amount of todo's left");
//         return this.todos.filter(todo => !todo.done).length;
//     }

//     addTodo(title) {
//         this.todos.push(new Todo(title));
//     }

//     @action
//     markAllCompleted() {
//         this.todos.forEach(todo => {
//             todo.done = true;
//         });
//     }
// }

// class Todo {
//     id = Math.random(); // pseudo key
//     @observable title;
//     @observable done = false;

//     constructor(title) {
//         this.title = title;
//     }

//     toggle() {
//         this.done = !this.done;
//     }
// }

const Todo = types
  .model("Todo", {
    id: types.optional(types.number, Math.random()),
    title: types.string,
    done: types.optional(types.boolean, false)
  })
  .actions(self => {
    return {
      toggle: () => {
        self.done = !self.done;
      }
    };
  });

export const TodoStore = types
  .model("TodoStore", {
    todos: types.optional(types.array(Todo), [])
  })
  .actions(self => {
    return {
      addTodo: title => {
        self.todos.push(Todo.create({ id: Math.random(), title: title }));
      },
      markAllCompleted: () => {
        self.todos.forEach(todo => {
          todo.done = true;
        });
      }
    };
  })
  .views(self => {
    return {
      get unfinishedTodoCount() {
        console.log("Computed amount of todo's left");
        return self.todos.filter(todo => !todo.done).length;
      }
    };
  });

// const todoStoreImpl = MyTodoStore.create();
