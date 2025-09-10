#!/bin/bash

echo "🚀 Starting Koningschat Demo..."

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Function to kill processes on a port
kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pids" ]; then
        echo "🔄 Freeing port $port..."
        kill -9 $pids 2>/dev/null
        sleep 1
    fi
}

# Function to wait for port to be available
wait_for_port() {
    local port=$1
    local service=$2
    local max_attempts=10
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost:$port > /dev/null 2>&1; then
            echo "✅ $service ready on port $port"
            return 0
        fi
        echo "⏳ Waiting for $service on port $port (attempt $attempt/$max_attempts)..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    echo "❌ $service failed to start on port $port"
    return 1
}

# Clean up any existing processes
echo "🧹 Cleaning up existing processes..."
kill_port 3001
kill_port 3000

# Start backend
echo "🔧 Starting backend..."
cd "$PROJECT_ROOT/backend" && bun run dev > "$PROJECT_ROOT/backend.log" 2>&1 &
BACKEND_PID=$!

# Wait for backend to be ready
if wait_for_port 3001 "Backend"; then
    echo "✅ Backend started successfully"
else
    echo "❌ Backend failed to start"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend..."
cd "$PROJECT_ROOT/frontend" && bun run dev > "$PROJECT_ROOT/frontend.log" 2>&1 &
FRONTEND_PID=$!

# Wait for frontend to be ready
if wait_for_port 3000 "Frontend"; then
    echo "✅ Frontend started successfully"
else
    echo "❌ Frontend failed to start"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Demo ready!"
echo "📱 Open: http://localhost:3000"
echo "🔍 API Health: http://localhost:3001/health"
echo ""
echo "💡 Demo questions to try:"
echo "   • Wanneer zijn de Koningsspelen?"
echo "   • Wat krijgen scholen bij inschrijving?"
echo "   • Wat is het thema dit jaar?"
echo ""
echo "🛑 Press Ctrl+C to stop all servers"

# Keep script running and handle cleanup
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    kill_port 3001
    kill_port 3000
    echo "✅ Cleanup complete"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
