import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import PRODUCTS from '../data/products.jsx';

const AIChatbot = () => {
  const { chatOpen, setChatOpen } = useContext(AppContext);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! 👋 I\'m your AI Shopping Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      const trending = PRODUCTS.filter(p => p.trending);
      return `I recommend these trending products: ${trending.map(p => p.name).join(', ')}. They're super popular right now!`;
    }

    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'Our products range from ₹999 to ₹42,999. We have options for every budget! 💰';
    }

    if (lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
      return 'We have amazing discounts on select items! Check out our trending products for up to 50% off. 🎉';
    }

    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return 'We offer free shipping on orders above ₹1999! Otherwise, it\'s just ₹99. Fast delivery guaranteed! 🚚';
    }

    if (lowerMessage.includes('electronics')) {
      const electronics = PRODUCTS.filter(p => p.category === 'Electronics');
      return `Check out our electronics: ${electronics.map(p => p.name).join(', ')}. All high quality! 📱`;
    }

    if (lowerMessage.includes('fashion')) {
      const fashion = PRODUCTS.filter(p => p.category === 'Fashion');
      return `Our fashion collection: ${fashion.map(p => p.name).join(', ')}. Style and comfort combined! 👗`;
    }

    if (lowerMessage.includes('lifestyle')) {
      const lifestyle = PRODUCTS.filter(p => p.category === 'Lifestyle');
      return `Lifestyle products we love: ${lifestyle.map(p => p.name).join(', ')}. Enhance your daily life! 🌟`;
    }

    if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return 'I can help you with: product recommendations, pricing info, shipping details, and more! Just ask! 😊';
    }

    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Happy shopping! 🛍️';
    }

    return 'That\'s interesting! I can help you find products, get recommendations, check prices, and more. What would you like to know? 🤔';
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse = { type: 'bot', text: getAIResponse(input) };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const chatStyles = {
    chatbot: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 999,
      fontFamily: 'Poppins, sans-serif',
    },
    chatButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      boxShadow: 'var(--shadow-lg)',
      transition: 'var(--transition)',
      display: chatOpen ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    chatWindow: {
      display: chatOpen ? 'flex' : 'none',
      flexDirection: 'column',
      width: '350px',
      height: '500px',
      backgroundColor: 'var(--bg-primary)',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      border: '1px solid #e0e0e0',
    },
    header: {
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    message: {
      padding: '0.75rem 1rem',
      borderRadius: '8px',
      maxWidth: '80%',
      wordWrap: 'break-word',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: 'var(--color-primary)',
      color: 'white',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    },
    inputArea: {
      padding: '1rem',
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      gap: '0.5rem',
    },
    input: {
      flex: 1,
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontFamily: 'Poppins, sans-serif',
      backgroundColor: 'var(--bg-secondary)',
      color: 'var(--text-primary)',
    },
    sendBtn: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'var(--color-primary)',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
  };

  return (
    <div style={chatStyles.chatbot}>
      <button 
        style={chatStyles.chatButton}
        onClick={() => setChatOpen(true)}
        title="Open AI Chat"
      >
        <i className="fas fa-comments"></i>
      </button>

      <div style={chatStyles.chatWindow}>
        <div style={chatStyles.header}>
          <span><i className="fas fa-robot"></i> AI Assistant</span>
          <button 
            style={chatStyles.closeBtn}
            onClick={() => setChatOpen(false)}
          >
            ×
          </button>
        </div>

        <div style={chatStyles.messagesContainer}>
          {messages.map((msg, idx) => (
            <div 
              key={idx}
              style={{
                ...chatStyles.message,
                ...(msg.type === 'user' ? chatStyles.userMessage : chatStyles.botMessage)
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div style={chatStyles.inputArea}>
          <input 
            type="text"
            style={chatStyles.input}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button 
            style={chatStyles.sendBtn}
            onClick={handleSendMessage}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
