import React from 'react';
import { BarChart3, Package, DollarSign, Zap, Database } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const Sidebar = ({ sampleData, updateSampleData, addMessage, setIsLoading }) => {
  
  const generateSampleData = async (type) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sample-data/${type}`);
      updateSampleData(type, response.data.data);
      
      // Show success message
      const successMessage = {
        id: Date.now(),
        role: 'agent',
        content: `✅ ${response.data.description} generados exitosamente.`,
        timestamp: new Date(),
        success: true
      };
      addMessage(successMessage);
    } catch (error) {
      console.error(`Error generating ${type} data:`, error);
    }
  };

  const runQuickAnalysis = async (analysisType) => {
    setIsLoading(true);
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: `Ejecutar análisis rápido: ${analysisType}`,
      timestamp: new Date()
    };
    addMessage(userMessage);

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze/${analysisType}`);
      
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
        error: `Error en análisis: ${error.message}`
      };

      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🚀 Acciones Rápidas
        </h3>
        
        <div className="space-y-3">
          <button
            onClick={() => generateSampleData('sales')}
            className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
          >
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Generar Datos de Ventas</span>
          </button>
          
          <button
            onClick={() => generateSampleData('inventory')}
            className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
          >
            <Package className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Generar Inventario</span>
          </button>
          
          <button
            onClick={() => generateSampleData('pricing')}
            className="w-full flex items-center space-x-3 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors duration-200"
          >
            <DollarSign className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-medium">Generar Precios</span>
          </button>
        </div>
      </div>

      {/* Quick Analysis */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ⚡ Análisis Rápido
        </h3>
        
        <div className="space-y-3">
          <button
            onClick={() => runQuickAnalysis('sales')}
            className="w-full flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
          >
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="text-purple-800 font-medium">Analizar Ventas</span>
          </button>
          
          <button
            onClick={() => runQuickAnalysis('inventory')}
            className="w-full flex items-center space-x-3 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
          >
            <Zap className="w-5 h-5 text-indigo-600" />
            <span className="text-indigo-800 font-medium">Optimizar Inventario</span>
          </button>
          
          <button
            onClick={() => runQuickAnalysis('pricing')}
            className="w-full flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
          >
            <Zap className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Analizar Precios</span>
          </button>
        </div>
      </div>

      {/* Sample Data Display */}
      {Object.keys(sampleData).length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Datos Generados
          </h3>
          
          <div className="space-y-4">
            {Object.entries(sampleData).map(([key, data]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-900 capitalize">{key}</span>
                </div>
                <div className="bg-gray-50 rounded p-2">
                  <pre className="text-xs text-gray-600 overflow-x-auto">
                    {JSON.stringify(data, null, 2).substring(0, 200)}
                    {JSON.stringify(data, null, 2).length > 200 && '...'}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Consejos
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• Genera datos de ejemplo para probar el sistema</li>
          <li>• Usa análisis rápidos para insights instantáneos</li>
          <li>• Combina diferentes tipos de datos para análisis más completos</li>
          <li>• Haz preguntas específicas para mejores resultados</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;