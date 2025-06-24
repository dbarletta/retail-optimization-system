# 🛍️ Retail Optimizer AI

Sistema Multi-Agente para Optimización de Retail desarrollado con Strands Agents, Claude AI y React.

## 🏗️ Arquitectura del Proyecto

```
prisma_v4_agents/
├── retail_optimization_system/     # Backend Python
│   ├── api.py                     # API FastAPI
│   ├── retail_optimizer_agent.py  # Agente principal
│   ├── requirements.txt           # Dependencias Python
│   ├── venv/                      # Entorno virtual
│   └── .env                       # Variables de entorno
├── frontend/                      # Frontend React
│   ├── src/
│   │   ├── components/            # Componentes React
│   │   ├── App.js                 # Componente principal
│   │   └── index.js               # Punto de entrada
│   ├── public/                    # Archivos estáticos
│   └── package.json               # Dependencias Node.js
├── start_backend.sh               # Script para iniciar backend
├── start_frontend.sh              # Script para iniciar frontend
└── CLAUDE.md                      # Documentación para Claude Code
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Python 3.11+
- Node.js 18+
- API Key de Anthropic (Claude)

### 1. Configurar Backend

```bash
# Navegar al directorio del backend
cd retail_optimization_system

# Crear y activar entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tu API key de Anthropic
```

### 2. Configurar Frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install
```

## 🔧 Ejecución

### Método 1: Scripts Automatizados

```bash
# Terminal 1 - Backend
./start_backend.sh

# Terminal 2 - Frontend  
./start_frontend.sh
```

### Método 2: Manual

```bash
# Terminal 1 - Backend
cd retail_optimization_system
source venv/bin/activate
python api.py

# Terminal 2 - Frontend
cd frontend
npm start
```

## 📱 Uso de la Aplicación

1. **Acceder a la interfaz**: http://localhost:3000
2. **Generar datos de ejemplo**: Usar los botones en el sidebar izquierdo
3. **Interactuar con el agente**: Chat en el panel central
4. **Ver métricas**: Dashboard en el panel derecho

### Funcionalidades Principales

- **💬 Chat inteligente** con el agente de optimización
- **📊 Análisis de ventas** con insights automáticos
- **📦 Optimización de inventario** con recomendaciones de reposición
- **💰 Estrategias de precios** competitivos
- **📈 Dashboard** con métricas y visualizaciones en tiempo real

### Herramientas del Agente

1. **analyze_sales_data()**: Analiza datos de ventas y genera insights
2. **calculate_inventory_optimization()**: Optimiza niveles de inventario
3. **pricing_strategy_analysis()**: Analiza estrategias de precios

## 🔗 Endpoints de la API

- `GET /` - Health check
- `POST /chat` - Chat principal con el agente
- `GET /sample-data/sales` - Generar datos de ventas
- `GET /sample-data/inventory` - Generar datos de inventario
- `GET /sample-data/pricing` - Generar datos de precios
- `POST /analyze/sales` - Análisis rápido de ventas
- `POST /analyze/inventory` - Análisis rápido de inventario
- `POST /analyze/pricing` - Análisis rápido de precios

## 🎨 Tecnologías Utilizadas

### Backend
- **Strands Agents**: Framework para agentes multi-herramienta
- **Claude AI**: Modelo de lenguaje de Anthropic
- **FastAPI**: Framework web moderno para APIs
- **Pandas**: Análisis y manipulación de datos
- **Pydantic**: Validación de datos

### Frontend
- **React**: Biblioteca de UI
- **Tailwind CSS**: Framework de estilos
- **Recharts**: Visualizaciones de datos
- **Lucide React**: Iconos
- **Axios**: Cliente HTTP

## 🤖 Características del Agente

- **Análisis inteligente** de datos de retail
- **Recomendaciones automáticas** basadas en datos
- **Interfaz conversacional** natural
- **Integración** con múltiples fuentes de datos
- **Visualizaciones** interactivas

## 🛠️ Desarrollo

### Estructura del Frontend

```
frontend/src/
├── components/
│   ├── Header.js          # Cabecera de la aplicación
│   ├── ChatInterface.js   # Interface de chat principal
│   ├── Sidebar.js         # Panel lateral con herramientas
│   └── Dashboard.js       # Panel de métricas y gráficos
├── App.js                 # Componente raíz
├── index.js              # Punto de entrada
└── index.css             # Estilos globales
```

### Personalización

- **Estilos**: Modificar `tailwind.config.js` y `src/index.css`
- **Componentes**: Añadir nuevos componentes en `src/components/`
- **API**: Extender endpoints en `api.py`
- **Agente**: Añadir nuevas herramientas en `retail_optimizer_agent.py`

## 📝 Ejemplos de Consultas

- "Analiza las tendencias de ventas de mis productos"
- "¿Qué productos necesitan reposición urgente?"
- "Sugiere estrategias de precios para maximizar ganancias"
- "Identifica oportunidades de ventas cruzadas"
- "Analiza el rendimiento por categoría de producto"

## 🔒 Seguridad

- Variables de entorno para API keys
- CORS configurado para desarrollo local
- Validación de datos con Pydantic
- Manejo de errores robusto

## 📄 Licencia

Proyecto desarrollado para demostración de capacidades de Strands Agents y Claude AI.

---

**🎯 Objetivo**: Demostrar las capacidades de los sistemas multi-agente para optimización de retail usando IA conversacional moderna.