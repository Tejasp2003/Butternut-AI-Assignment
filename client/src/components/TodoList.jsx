import EmptyTasksMessage from "./EmptyTasksMessage";
import TodoItem from "./TodoItem";


const TodoList = ({ todos, toggleComplete, updateTodo, deleteTodo }) => {

 
  
    return (
      <ul className="w-full sm:w-[700px]">
        
        
        {todos.length === 0 ? (
          <EmptyTasksMessage />
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))
        )}
      </ul>
    );
  };
  
  export default TodoList;
  