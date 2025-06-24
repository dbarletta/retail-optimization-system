import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react';

const Dashboard = ({ sampleData }) => {
  
  // Process sales data for visualization
  const processedSalesData = React.useMemo(() => {
    // Handle nested data structure from API
    const salesData = sampleData.sales?.sales || sampleData.sales;
    if (!salesData || !Array.isArray(salesData)) return [];
    
    const salesByProduct = {};
    salesData.forEach(sale => {
      if (salesByProduct[sale.product]) {
        salesByProduct[sale.product] += sale.amount;
      } else {
        salesByProduct[sale.product] = sale.amount;
      }
    });
    
    return Object.entries(salesByProduct).map(([product, amount]) => ({
      product: product.substring(0, 10) + (product.length > 10 ? '...' : ''),
      amount,
      fullName: product
    }));
  }, [sampleData.sales]);

  // Process inventory data
  const inventoryData = React.useMemo(() => {
    // Handle nested data structure from API
    const inventoryObj = sampleData.inventory?.inventory || sampleData.inventory;
    if (!inventoryObj || typeof inventoryObj !== 'object') return [];
    
    return Object.entries(inventoryObj).map(([product, stock]) => ({
      product: product.substring(0, 10) + (product.length > 10 ? '...' : ''),
      stock,
      fullName: product
    }));
  }, [sampleData.inventory]);

  // Calculate metrics
  const metrics = React.useMemo(() => {
    // Handle nested data structure from API
    const salesData = sampleData.sales?.sales || sampleData.sales;
    const inventoryObj = sampleData.inventory?.inventory || sampleData.inventory;
    
    const salesArray = Array.isArray(salesData) ? salesData : [];
    const totalSales = salesArray.reduce((sum, sale) => sum + sale.amount, 0);
    const totalProducts = inventoryObj && typeof inventoryObj === 'object' ? Object.keys(inventoryObj).length : 0;
    const totalStock = inventoryObj && typeof inventoryObj === 'object' ? Object.values(inventoryObj).reduce((sum, stock) => sum + stock, 0) : 0;
    const avgSale = salesArray.length ? totalSales / salesArray.length : 0;

    return {
      totalSales,
      totalProducts,
      totalStock,
      avgSale
    };
  }, [sampleData]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ventas Totales</p>
              <p className="text-2xl font-bold text-gray-900">
                ${metrics.totalSales.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Productos</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.totalProducts}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Total</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.totalStock}
              </p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Venta Promedio</p>
              <p className="text-2xl font-bold text-gray-900">
                ${metrics.avgSale.toFixed(0)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      {processedSalesData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📊 Ventas por Producto
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={processedSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="product" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name, props) => [
                  `$${value.toLocaleString()}`,
                  'Ventas'
                ]}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;
                  return item ? item.fullName : label;
                }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Inventory Chart */}
      {inventoryData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📦 Distribución de Inventario
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="stock"
                label={({ product, percent }) => `${product} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value} unidades`,
                  'Stock'
                ]}
                labelFormatter={(label, payload) => {
                  const item = payload?.[0]?.payload;
                  return item ? item.fullName : label;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Status Indicators */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📈 Estado del Sistema
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <span className="text-green-800 font-medium">Agente IA</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-green-600 text-sm">Activo</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <span className="text-blue-800 font-medium">API Backend</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-blue-600 text-sm">Conectado</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <span className="text-yellow-800 font-medium">Datos</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-600 text-sm">
                {Object.keys(sampleData).length > 0 ? 'Cargados' : 'Pendiente'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {Object.keys(sampleData).length > 0 && (
        <div className="card bg-gradient-to-br from-gray-50 to-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🎯 Resumen Ejecutivo
          </h3>
          <div className="text-sm text-blue-800 space-y-2">
            <p>
              • <strong>{metrics.totalProducts}</strong> productos en catálogo
            </p>
            <p>
              • <strong>${metrics.totalSales.toLocaleString()}</strong> en ventas registradas
            </p>
            <p>
              • <strong>{metrics.totalStock}</strong> unidades en inventario
            </p>
            <p>
              • Ticket promedio de <strong>${metrics.avgSale.toFixed(0)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;