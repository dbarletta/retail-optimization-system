#!/bin/bash

echo "⚛️ Iniciando Retail Optimizer Frontend..."

# Cambiar al directorio del frontend
cd frontend

# Verificar si node_modules existe, si no, instalar dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias de Node.js..."
    npm install
fi

echo "🌐 Iniciando React app en http://localhost:3000"
npm start