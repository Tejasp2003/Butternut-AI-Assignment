const TodoInput = ({ task, handleInputChange, addTodo }) => {
  return (
    <div className="flex flex-col sm:flex-row mb-4 justify-between">
      <input
        type="text"
        value={task}
        onChange={handleInputChange}
        className="rounded-3xl py-2 px-4 mr-2 text-gray-800 bg-white/60 h-16 w-full sm:w-[650px] border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out font-extrabold text-lg"
        placeholder="Enter task..."
      />
      <button
        onClick={addTodo}
        className="bg-blue-500/50 hover:bg-blue-700 text-white font-extrabold py-2 px-6 transition-colors duration-300 ease-in-out rounded-2xl mt-2 sm:mt-0"
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;
