import { useState } from "react";

import NavBar from "./NavBar";
import "../../index.css";

interface TaskListType {
  task: string;
  date: string;
  done?: boolean;
}

const Todo = () => {
  const [inputText, setInputText] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [taskList, setTaskList] = useState<TaskListType[]>([
    {
      task: "Walk the dog",
      date: "28-06-2025",
      done: false,
    },
  ]);

  const handleInput = (value: string) => {
    setInputText(value);
  };

  const handleClick = () => {
    if (inputText.trim()) {
      setTaskList((prev) => [...prev, { task: inputText, date, done: false }]);
    }
    setInputText("");
    setDate("");
  };

  const handleDate = (e: string) => {
    const [year, month, day] = e.split("-");
    const reversedDate = `${day}-${month}-${year}`;
    setDate(reversedDate);
  };

  const handleTaskDone = (index: number) => {
    setTaskList((prev) =>
      prev.map((task, i) => (i === index ? { ...task, done: true } : task))
    );
  };

  return (
    <div className="bg-gray-900/10 min-h-screen">
      <NavBar />
      <div className="mx-[10%] my-[5%]">
        <div className="p-5 rounded-2xl shadow-lg shadow-blue-500 flex flex-col transition-all duration-100 hover:-translate-y-1.5">
          <input
            type="text"
            placeholder="Add your task"
            className="p-4 mb-8 w-2xl text-3xl border-b-2 shadow-amber-50 focus:outline-none"
            value={inputText}
            onChange={(e) => handleInput(e.target.value)}
            required
            aria-label="Add your task"
            name="User Input"
          />
          <input
            type="date"
            className="max-w-fit mb-5 text-3xl font-light focus:outline-none"
            onChange={(e) => handleDate(e.target.value)}
            value={date ? date.split("-").reverse().join("-") : ""}
            required
          />
          <button
            className="max-w-fit text-white text-2xl rounded-full shadow-md shadow-blue-500 bg-blue-500 p-4 transition-all duration-100 hover:-translate-y-1.5 cursor-pointer "
            onClick={() => handleClick()}
          >
            Add Task
          </button>
        </div>

        <table className="min-w-full max-w-4xl mx-auto text-xl table-fixed">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="px-2 py-6 font-bold text-left w-32">Status</th>
              <th className="px-2 py-6 font-bold text-left w-48">Deadline</th>
              <th className="px-2 py-6 font-bold text-left" colSpan={4}>
                Task
              </th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((task, index) => (
              <tr key={index}>
                <td className="px-2 py-6 w-32">
                  <input
                    type="button"
                    className={`px-2 py-1 text-white rounded-full shadow-md shadow-green-100 transition-all duration-100 hover:-translate-y-1.5 hover:cursor-pointer
            ${task.done ? "bg-gray-500" : "bg-blue-500"}
          `}
                    value={"Done"}
                    onClick={() => handleTaskDone(index)}
                    disabled={task.done}
                  />
                </td>
                <td className={`px-2 py-6 ${task.done ? "line-through" : ""}`}>
                  {task.date}
                </td>
                <td
                  className={`px-2 py-6 ${task.done ? "line-through" : ""}`}
                  colSpan={4}
                >
                  {task.task}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Todo;
