import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://38.55.239.34:27017/knowledge_cards';
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/knowledge_cards';

// 连接MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('成功连接到MongoDB'))
  .catch((err) => console.error('连接MongoDB失败:', err));

// 定义知识卡片模型
const CardSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Card = mongoose.model('Card', CardSchema);

app.use(bodyParser.json());

// 创建新卡片
app.post('/cards', async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: '创建卡片失败' });
  }
});

// 获取所有卡片
app.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: '获取卡片失败' });
  }
});

// 获取单个卡片
app.get('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ error: '卡片不存在' });
    }
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: '获取卡片失败' });
  }
});

// 更新卡片
app.put('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) {
      return res.status(404).json({ error: '卡片不存在' });
    }
    res.json(card);
  } catch (error) {
    res.status(400).json({ error: '更新卡片失败' });
  }
});

// 删除卡片
app.delete('/cards/:id', async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) {
      return res.status(404).json({ error: '卡片不存在' });
    }
    res.json({ message: '卡片已删除' });
  } catch (error) {
    res.status(500).json({ error: '删除卡片失败' });
  }
});

// 测试路由：插入一条测试数据
app.get('/test-insert', async (req, res) => {
  try {
    const testCard = new Card({
      title: "测试卡片",
      content: "这是一条通过API插入的测试数据"
    });
    await testCard.save();
    res.json({ message: "测试数据插入成功", card: testCard });
  } catch (error) {
    res.status(500).json({ error: '插入测试数据失败' });
  }
});

app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
