#!/bin/bash

# CV Application - Quick Start Script
# This script starts a local development server

echo "🚀 Starting CV Application Development Server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✓ Python 3 found"
    echo "📦 Starting server on http://localhost:8000"
    echo ""
    echo "Available pages:"
    echo "  - Main CV:  http://localhost:8000/index.html"
    echo "  - Tests:    http://localhost:8000/test.html"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000

# Check if Python 2 is available
elif command -v python &> /dev/null; then
    echo "✓ Python 2 found"
    echo "📦 Starting server on http://localhost:8000"
    echo ""
    echo "Available pages:"
    echo "  - Main CV:  http://localhost:8000/index.html"
    echo "  - Tests:    http://localhost:8000/test.html"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m SimpleHTTPServer 8000

# Check if PHP is available
elif command -v php &> /dev/null; then
    echo "✓ PHP found"
    echo "📦 Starting server on http://localhost:8000"
    echo ""
    echo "Available pages:"
    echo "  - Main CV:  http://localhost:8000/index.html"
    echo "  - Tests:    http://localhost:8000/test.html"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:8000

# Check if Node.js is available
elif command -v node &> /dev/null; then
    echo "✓ Node.js found"
    
    # Check if http-server is installed
    if command -v http-server &> /dev/null; then
        echo "📦 Starting http-server on http://localhost:8000"
        echo ""
        echo "Available pages:"
        echo "  - Main CV:  http://localhost:8000/index.html"
        echo "  - Tests:    http://localhost:8000/test.html"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        http-server -p 8000
    else
        echo "⚠ http-server not found. Installing..."
        npx http-server -p 8000
    fi

else
    echo "❌ No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: https://www.python.org/downloads/"
    echo "  - Node.js:  https://nodejs.org/"
    echo "  - PHP:      https://www.php.net/downloads"
    echo ""
    echo "Or open index.html directly in your browser (some features may not work)"
    exit 1
fi
