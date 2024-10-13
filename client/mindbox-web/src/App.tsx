import { useState } from "react";
import KnowledgeCardManager from './KnowledgeCardManager';

function App() {
  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold text-center text-red-800 bg-yellow-200 p-6 rounded-lg shadow-lg mb-4">
        欢迎使用 React + TypeScript + Tailwind CSS + Vite
      </div>
      <KnowledgeCardManager />
    </div>
  );
}

export default App;
