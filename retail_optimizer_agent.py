import os
from typing import Dict, List, Any
from dotenv import load_dotenv
from strands import Agent, tool
from strands.models import AnthropicProvider
import pandas as pd
import json

# Cargar variables de entorno
load_dotenv()

# Configurar el proveedor de Anthropic con Claude Sonnet
provider = AnthropicProvider(
    api_key=os.getenv("ANTHROPIC_API_KEY"),
    model="claude-3-sonnet-20240229"
)

@tool
def analyze_sales_data(sales_data: str) -> Dict[str, Any]:
    """
    Analiza datos de ventas en formato JSON y proporciona insights básicos.
    
    Args:
        sales_data: JSON string con datos de ventas
        
    Returns:
        Dict con análisis de ventas
    """
    try:
        data = json.loads(sales_data)
        df = pd.DataFrame(data)
        
        analysis = {
            "total_sales": df['amount'].sum() if 'amount' in df.columns else 0,
            "average_sale": df['amount'].mean() if 'amount' in df.columns else 0,
            "total_transactions": len(df),
            "top_products": df.groupby('product')['amount'].sum().sort_values(ascending=False).head(5).to_dict() if 'product' in df.columns else {},
            "sales_by_date": df.groupby('date')['amount'].sum().to_dict() if 'date' in df.columns else {}
        }
        
        return analysis
    except Exception as e:
        return {"error": f"Error al analizar datos: {str(e)}"}

@tool
def calculate_inventory_optimization(current_inventory: str, sales_velocity: str) -> Dict[str, Any]:
    """
    Calcula recomendaciones de optimización de inventario basado en inventario actual y velocidad de ventas.
    
    Args:
        current_inventory: JSON string con inventario actual
        sales_velocity: JSON string con velocidad de ventas por producto
        
    Returns:
        Dict con recomendaciones de inventario
    """
    try:
        inventory = json.loads(current_inventory)
        velocity = json.loads(sales_velocity)
        
        recommendations = {}
        
        for product, stock in inventory.items():
            daily_sales = velocity.get(product, 0)
            
            if daily_sales > 0:
                days_of_stock = stock / daily_sales
                
                if days_of_stock < 7:
                    recommended_order = daily_sales * 30 - stock  # 30 días de stock
                    recommendations[product] = {
                        "current_stock": stock,
                        "days_remaining": days_of_stock,
                        "status": "URGENT_REORDER",
                        "recommended_order_quantity": max(0, recommended_order)
                    }
                elif days_of_stock < 14:
                    recommended_order = daily_sales * 21 - stock  # 21 días de stock
                    recommendations[product] = {
                        "current_stock": stock,
                        "days_remaining": days_of_stock,
                        "status": "REORDER_SOON",
                        "recommended_order_quantity": max(0, recommended_order)
                    }
                else:
                    recommendations[product] = {
                        "current_stock": stock,
                        "days_remaining": days_of_stock,
                        "status": "ADEQUATE_STOCK",
                        "recommended_order_quantity": 0
                    }
        
        return recommendations
    except Exception as e:
        return {"error": f"Error al calcular optimización: {str(e)}"}

@tool
def pricing_strategy_analysis(competitor_prices: str, cost_data: str, demand_elasticity: float = 1.2) -> Dict[str, Any]:
    """
    Analiza estrategias de precios basado en precios de competidores y costos.
    
    Args:
        competitor_prices: JSON string con precios de competidores
        cost_data: JSON string con datos de costos
        demand_elasticity: Elasticidad de demanda (default 1.2)
        
    Returns:
        Dict con recomendaciones de precios
    """
    try:
        competitors = json.loads(competitor_prices)
        costs = json.loads(cost_data)
        
        pricing_recommendations = {}
        
        for product in costs.keys():
            cost = costs[product]
            competitor_avg = sum(competitors.get(product, {}).values()) / len(competitors.get(product, {})) if product in competitors and competitors[product] else cost * 1.5
            
            # Estrategias de precios
            strategies = {
                "cost_plus_30": cost * 1.3,
                "market_competitive": competitor_avg * 0.95,
                "premium_positioning": competitor_avg * 1.1,
                "penetration_pricing": competitor_avg * 0.8
            }
            
            # Calcular margen para cada estrategia
            margins = {}
            for strategy, price in strategies.items():
                margin = ((price - cost) / price) * 100 if price > 0 else 0
                margins[strategy] = {
                    "price": price,
                    "margin_percent": margin,
                    "profit_per_unit": price - cost
                }
            
            pricing_recommendations[product] = {
                "current_cost": cost,
                "competitor_average": competitor_avg,
                "strategies": margins,
                "recommended_strategy": max(margins.items(), key=lambda x: x[1]["margin_percent"] if x[1]["margin_percent"] > 15 else 0)[0]
            }
        
        return pricing_recommendations
    except Exception as e:
        return {"error": f"Error al analizar precios: {str(e)}"}

# Crear el agente de optimización de retail
retail_optimizer = Agent(
    provider=provider,
    tools=[analyze_sales_data, calculate_inventory_optimization, pricing_strategy_analysis],
    system_prompt="""
    Eres un experto agente de optimización de retail especializado en:
    
    1. Análisis de datos de ventas y patrones de compra
    2. Optimización de inventario y gestión de stock
    3. Estrategias de precios competitivos
    4. Identificación de oportunidades de mejora operacional
    
    Tu objetivo es ayudar a los retailers a:
    - Maximizar sus ventas y rentabilidad
    - Minimizar costos operacionales
    - Optimizar niveles de inventario
    - Implementar estrategias de precios efectivas
    
    Siempre proporciona análisis detallados, recomendaciones específicas y justificaciones basadas en datos.
    Cuando sea posible, incluye métricas cuantificables y pasos de implementación claros.
    """
)

def main():
    """Función principal para interactuar con el agente"""
    print("🛍️ Agente de Optimización de Retail - Sistema Multi-Agente")
    print("=" * 60)
    print("Comandos disponibles:")
    print("- 'salir' para terminar")
    print("- Cualquier consulta sobre optimización de retail")
    print("=" * 60)
    
    while True:
        user_input = input("\n💼 Consulta: ").strip()
        
        if user_input.lower() in ['salir', 'exit', 'quit']:
            print("¡Hasta luego! 👋")
            break
        
        if not user_input:
            continue
        
        try:
            # Procesar la consulta con el agente
            response = retail_optimizer.run(user_input)
            print(f"\n🤖 Respuesta del Agente:\n{response}")
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    main()