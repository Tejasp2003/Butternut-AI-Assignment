import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const TodoItem = ({ todo, toggleComplete, updateTodo, deleteTodo }) => {
  return (
    <li
      className={`flex items-center justify-between bg-white/50 p-4 rounded-3xl shadow-lg transform transition-transform duration-300 cursor-pointer mb-4 hover:bg-slate-300 w-full ${
        todo.completed ? "line-through blur-[0.8px] p-3" : ""
      }`}
    >
      <div
        className={`w-5 h-5 border-2 border-black rounded-full flex-shrink-0 ${
          todo.completed ? "bg-black" : "bg-transparent"
        }`}
        onClick={() => toggleComplete(todo)}
      ></div>
      <span className="text-gray-800 capitalize font-bold text-xl ml-4">
        {todo.task}
      </span>
      <div className="flex items-center justify-center sm:space-x-2 text-gray-800 ml-auto space-x-0">
        <FaEdit
          className="text-2xl text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out cursor-pointer sm:mr-4 mr-1"
          onClick={() => updateTodo(todo)}
        />
        <MdDelete
          className="text-2xl text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out cursor-pointer"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>
    </li>
  );
};

export default TodoItem;
