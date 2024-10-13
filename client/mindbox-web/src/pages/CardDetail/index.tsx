import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

interface KnowledgeCard {
  _id: string;
  title: string;
  content: string;
}

const CardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [card, setCard] = useState<KnowledgeCard | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cards/${id}`);
        if (!response.ok) {
          throw new Error('获取卡片详情失败');
        }
        const data = await response.json();
        setCard(data);
      } catch (error) {
        console.error('获取卡片详情失败:', error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) {
    return <div>加载中...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">卡片详情</h1>
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
        <p className="mb-4">{card.content}</p>
        <Link to="/cards" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          返回列表
        </Link>
      </div>
    </div>
  );
};

export default CardDetail;
