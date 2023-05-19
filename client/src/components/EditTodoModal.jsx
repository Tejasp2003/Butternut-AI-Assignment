const EditTodoModal = ({
  updatedTask,
  handleTaskChange,
  saveUpdatedTodo,
  cancelEdit,
}) => {
  return (
    <div className="flex fixed top-0 left-0 right-0 bottom-0 items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 m-3">
        <input
          type="text"
          value={updatedTask}
          onChange={handleTaskChange}
          className="rounded-lg py-2 px-4 border border-gray-300 mb-2 w-full"
          placeholder="Update task.."
        />
        <button
          onClick={saveUpdatedTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out"
        >
          Save
        </button>
        <button
          onClick={cancelEdit}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 transition-colors duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTodoModal;
