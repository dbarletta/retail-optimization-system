# Sistema Multi-Agente para Optimización de Retail

Este proyecto implementa un sistema multi-agente utilizando Strands Agents para optimizar operaciones y estrategias de retail.

## 🚀 Instalación

1. Crear entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

2. Instalar dependencias:
```bash
pip install -r requirements.txt
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tu API key de Anthropic
```

## 🤖 Agente Principal: Optimizador de Retail

El primer agente implementado se especializa en:

### Funcionalidades

1. **Análisis de Datos de Ventas**
   - Procesamiento de datos de ventas en formato JSON
   - Cálculo de métricas clave (ventas totales, promedio, transacciones)
   - Identificación de productos top y tendencias por fecha

2. **Optimización de Inventario**
   - Análisis de stock actual vs velocidad de ventas
   - Recomendaciones de reorden automáticas
   - Clasificación de urgencia de reposición

3. **Estrategias de Precios**
   - Análisis competitivo de precios
   - Múltiples estrategias de pricing
   - Cálculo de márgenes y rentabilidad

### Herramientas Disponibles

- `analyze_sales_data()`: Analiza datos de ventas
- `calculate_inventory_optimization()`: Optimiza inventario
- `pricing_strategy_analysis()`: Estrategias de precios

## 📊 Uso

```bash
python retail_optimizer_agent.py
```

### Ejemplo de Consulta

```
💼 Consulta: Analiza estos datos de ventas: [{"product": "Laptop", "amount": 1200, "date": "2024-01-15"}, {"product": "Mouse", "amount": 25, "date": "2024-01-15"}]
```

## 🛠️ Configuración

El agente utiliza Claude Sonnet a través de la API de Anthropic. Asegúrate de:

1. Tener una API key válida de Anthropic
2. Configurar correctamente el archivo `.env`
3. Instalar todas las dependencias

## 🔮 Próximos Agentes

- Agente de Análisis de Clientes
- Agente de Gestión de Cadena de Suministro  
- Agente de Marketing y Promociones
- Coordinador Multi-Agente