import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [sampleData, setSampleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message) => {
    setChatHistory(prev => [...prev, message]);
  };

  const updateSampleData = (key, data) => {
    setSampleData(prev => ({
      ...prev,
      [key]: data
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar 
              sampleData={sampleData}
              updateSampleData={updateSampleData}
              addMessage={addMessage}
              setIsLoading={setIsLoading}
            />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <ChatInterface 
              chatHistory={chatHistory}
              addMessage={addMessage}
              sampleData={sampleData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          
          {/* Dashboard */}
          <div className="lg:col-span-1">
            <Dashboard sampleData={sampleData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;