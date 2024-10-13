import React from 'react';
import KnowledgeCardManager from './components/KnowledgeCardManager';

export const Cards: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">知识卡片管理</h1>
      <KnowledgeCardManager />
    </div>
  );
};

export default Cards;
