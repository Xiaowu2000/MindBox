import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold text-center text-red-800 bg-yellow-200 p-6 rounded-lg shadow-lg">
        欢迎使用 React + TypeScript + Tailwind CSS + Vite
      </div>
      <button className="mt-4 bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded">
        Tailwind按钮
      </button>
    </div>
  );
}

export default App;
