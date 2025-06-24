# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a multi-agent retail optimization system built with Strands Agents framework. The system uses Claude Sonnet via Anthropic's API to provide intelligent retail optimization capabilities.

## Architecture

The system follows a modular agent-based architecture:

- **Main Agent**: `retail_optimizer_agent.py` - Core retail optimization agent with three specialized tools
- **Tool System**: Each tool handles specific retail optimization tasks:
  - `analyze_sales_data()` - Processes sales data and generates insights
  - `calculate_inventory_optimization()` - Provides inventory reorder recommendations
  - `pricing_strategy_analysis()` - Analyzes competitive pricing strategies
- **Provider Configuration**: Uses AnthropicProvider with Claude Sonnet model
- **Data Processing**: Leverages pandas for data analysis and JSON for data exchange

## Setup and Configuration

### Environment Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp retail_optimization_system/.env.example retail_optimization_system/.env
# Edit .env with your ANTHROPIC_API_KEY
```

### Required Environment Variables
- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude access
- Optional AWS Bedrock configuration for alternative LLM provider

## Running the System

### Main Application
```bash
cd retail_optimization_system
python retail_optimizer_agent.py
```

The system runs an interactive CLI where users can input retail optimization queries. The agent processes requests using its specialized tools and returns detailed analysis and recommendations.

## Core Dependencies

- `strands-agents>=0.1.0` - Multi-agent framework
- `anthropic>=0.7.0` - Claude API client
- `pandas>=2.0.0` - Data analysis
- `python-dotenv>=1.0.0` - Environment variable management
- `pydantic>=2.0.0` - Data validation
- `numpy>=1.24.0` - Numerical computing

## Key Implementation Details

### Agent Configuration
The retail optimizer agent uses a comprehensive system prompt that defines its expertise in:
- Sales data analysis and pattern recognition
- Inventory optimization and stock management
- Competitive pricing strategies
- Operational improvement identification

### Tool Architecture
Each tool is decorated with `@tool` and implements robust error handling. Tools expect JSON string inputs and return structured dictionaries with analysis results or error information.

### Data Flow
1. User inputs retail queries via CLI
2. Agent processes queries using Claude Sonnet
3. Agent selects and executes appropriate tools
4. Tools process data using pandas/numpy
5. Results are formatted and returned to user

## Development Notes

This is a Python-based project with no traditional build/test/lint commands configured. The system is designed for direct execution and interactive use rather than as a packaged application.