import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface KnowledgeCard {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const KnowledgeCardManager: React.FC = () => {
  const [cards, setCards] = useState<KnowledgeCard[]>([]);
  const [newCard, setNewCard] = useState({ title: '', content: '' });
  const [editingCard, setEditingCard] = useState<KnowledgeCard | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('http://localhost:3000/cards');
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
    if (editingCard) {
      setEditingCard({ ...editingCard, [name]: value });
    } else {
      setNewCard(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCard) {
        await updateCard(editingCard);
      } else {
        await createCard();
      }
      fetchCards();
      setNewCard({ title: '', content: '' });
      setEditingCard(null);
    } catch (error) {
      console.error('操作卡片失败:', error);
    }
  };

  const createCard = async () => {
    const response = await fetch('http://localhost:3000/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard),
    });
    if (!response.ok) throw new Error('创建卡片失败');
  };

  const updateCard = async (card: KnowledgeCard) => {
    const response = await fetch(`http://localhost:3000/cards/${card._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: card.title, content: card.content }),
    });
    if (!response.ok) throw new Error('更新卡片失败');
  };

  const deleteCard = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/cards/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('删除卡片失败');
      fetchCards();
    } catch (error) {
      console.error('删除卡片失败:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">知识卡片管理</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="title"
          value={editingCard ? editingCard.title : newCard.title}
          onChange={handleInputChange}
          placeholder="卡片标题"
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          name="content"
          value={editingCard ? editingCard.content : newCard.content}
          onChange={handleInputChange}
          placeholder="卡片内容"
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingCard ? '更新卡片' : '添加卡片'}
        </button>
        {editingCard && (
          <button
            type="button"
            onClick={() => setEditingCard(null)}
            className="ml-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            取消编辑
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card => (
          <div key={card._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="mb-2">{card.content}</p>
            <div className="flex justify-between">
              <button
                onClick={() => setEditingCard(card)}
                className="bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
              >
                编辑
              </button>
              <button
                onClick={() => deleteCard(card._id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                删除
              </button>
              <Link
                to={`/cards/${card._id}`}
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
              >
                详情
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCardManager;
