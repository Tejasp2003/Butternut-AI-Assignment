import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import EditTodoModal from "./EditTodoModal";

const TodoItems = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [updatedTask, setUpdatedTask] = useState("");
  const [sortType, setSortType] = useState("Default");

  useEffect(() => {
    fetchTodos();
  }, []);


  useEffect(() => {
    sortTodos();
  }, [sortType]);


  const fetchTodos = async () => {
    const response = await axios.get("/todos");
    setTodos(response.data);
  };

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const addTodo = async () => {
    if (task.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }

    const response = await axios.post("/todos", { task });
    setTodos([...todos, response.data]);
    setTask("");
    toast.success("Task added successfully!");
  };

  const updateTodo = (todo) => {
    setEditTodo(todo);
    setUpdatedTask(todo.task);
  };

  const handleTaskChange = (event) => {
    setUpdatedTask(event.target.value);
  };

  const saveUpdatedTodo = async () => {
    if (updatedTask.trim() === "") {
      toast.error("Task cannot be empty");
      return;
    }

    const updatedTodo = {
      ...editTodo,
      task: updatedTask,
    };

    const response = await axios.put(`/todos/${editTodo.id}`, updatedTodo);
    setTodos(
      todos.map((todo) => (todo.id === editTodo.id ? response.data : todo))
    );
    setEditTodo(null);
    setUpdatedTask("");
    toast.success("Task updated successfully!");
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    await fetchTodos();
    toast.success("Task deleted successfully!");
  };

  const toggleComplete = async (todo) => {
    if (todo.completed === false) {
      toast.success("Task completed successfully!");
    } else {
      toast.error("Task marked uncompleted!");
    }

    const updatedTodo = { ...todo, completed: !todo.completed };
    await axios.put(`/todos/${todo.id}`, updatedTodo);
    await fetchTodos();
  };

  const cancelEdit = () => {
    setEditTodo(null);
    setUpdatedTask("");
  };

  const sortTodos = () => {
    let sortedTodos = [...todos];
    if (sortType === "alphabetical") {
      sortedTodos.sort((a, b) => a.task.localeCompare(b.task)); // Sort tasks alphabetically
    } else if (sortType === "descending") {
      sortedTodos.sort((a, b) => b.task.localeCompare(a.task)); // Sort tasks alphabetically in descending order
    } else {
      sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
    }
    setTodos(sortedTodos);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <div className="flex justify-center items-center mb-4">
        <TodoInput
          task={task}
          handleInputChange={handleInputChange}
          addTodo={addTodo}
        />
      </div>
      <div className="sm:flex flex-col items-center bg-gray-100/30 rounded-2xl p-6 shadow-lg w-full sm:w-[750px]">
        <select
          className="py-2 px-3 rounded-xl border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent self-end mb-4 cursor-pointer font-bold"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="descending">Descending</option> 
        </select>
        

        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
      {editTodo && (
        <EditTodoModal
          updatedTask={updatedTask}
          handleTaskChange={handleTaskChange}
          saveUpdatedTodo={saveUpdatedTodo}
          cancelEdit={cancelEdit}
        />
      )}
    </div>
  );
};

export default TodoItems;
