#!/bin/bash

echo "🚀 Iniciando Retail Optimizer Backend..."

# Cambiar al directorio del backend
cd retail_optimization_system

# Activar entorno virtual y ejecutar API
source venv/bin/activate
echo "✅ Entorno virtual activado"

# Instalar FastAPI si no está instalado
pip install fastapi uvicorn

echo "🌐 Iniciando API en http://localhost:8000"
python api.py