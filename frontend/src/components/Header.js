import React from 'react';
import { ShoppingBag, Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Retail Optimizer AI
              </h1>
              <p className="text-sm text-gray-600">
                Sistema Multi-Agente para Optimización de Retail
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
            <Bot className="w-4 h-4" />
            <span>Powered by Claude & Strands Agents</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;