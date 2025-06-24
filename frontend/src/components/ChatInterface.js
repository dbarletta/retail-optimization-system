import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const ChatInterface = ({ chatHistory, addMessage, sampleData, isLoading, setIsLoading }) => {
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const sendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    addMessage(userMessage);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        message: message,
        context: sampleData
      });

      const agentMessage = {
        id: Date.now() + 1,
        role: 'agent',
        content: response.data.response,
        timestamp: new Date(),
        success: response.data.success,
        error: response.data.error
      };

      addMessage(agentMessage);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'agent',
        content: '',
        timestamp: new Date(),
        success: false,
        error: `Error de conexión: ${error.message}`
      };

      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const exampleQueries = [
    "Analiza las tendencias de ventas de mis productos",
    "¿Qué productos necesitan reposición urgente?",
    "Sugiere estrategias de precios para maximizar ganancias",
    "Identifica oportunidades de ventas cruzadas",
    "Analiza el rendimiento por categoría de producto"
  ];

  return (
    <div className="card h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          💬 Chat con el Agente
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
          <span className="text-sm text-gray-600">
            {isLoading ? 'Procesando...' : 'En línea'}
          </span>
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {chatHistory.length === 0 ? (
          <div className="text-center py-8">
            <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ¡Bienvenido al Retail Optimizer AI!
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza una conversación o prueba una de estas consultas de ejemplo:
            </p>
            <div className="space-y-2">
              {exampleQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(query)}
                  className="block w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  disabled={isLoading}
                >
                  💡 {query}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-retail-green text-white'
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`flex-1 ${
                message.role === 'user' ? 'chat-message-user' : 'chat-message-agent'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">
                    {message.role === 'user' ? '🧑‍💼 Usuario' : '🤖 Agente'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                
                {message.error ? (
                  <div className="text-red-600 bg-red-50 p-3 rounded border border-red-200">
                    ❌ {message.error}
                  </div>
                ) : (
                  <div className="text-gray-800 whitespace-pre-wrap">
                    {message.content}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-retail-green text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="chat-message-agent">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-gray-600">El agente está procesando tu consulta...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu consulta aquí... (Shift+Enter para nueva línea)"
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            rows="2"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;