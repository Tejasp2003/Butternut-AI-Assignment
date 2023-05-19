const EmptyTasksMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">No tasks found</h1>
      <p className="text-lg text-gray-500">Add a new task to get started</p>
    </div>
  );
};

export default EmptyTasksMessage;
