import React, { useState, useEffect } from 'react';

interface KnowledgeCard {
  id: number;
  title: string;
  content: string;
}

const KnowledgeCardManager: React.FC = () => {
  const [cards, setCards] = useState<KnowledgeCard[]>([]);
  const [newCard, setNewCard] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cards');
      if (!response.ok) {
        throw new Error('网络响应不正常');
      }
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('获取卡片失败:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });
      if (!response.ok) {
        throw new Error('网络响应不正常');
      }
      fetchCards();
      setNewCard({ title: '', content: '' });
    } catch (error) {
      console.error('添加卡片失败:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">知识卡片管理</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="title"
          value={newCard.title}
          onChange={handleInputChange}
          placeholder="卡片标题"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="content"
          value={newCard.content}
          onChange={handleInputChange}
          placeholder="卡片内容"
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          添加卡片
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCardManager;
