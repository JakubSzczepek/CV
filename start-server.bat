@echo off
REM CV Application - Quick Start Script for Windows
REM This script starts a local development server

echo.
echo ========================================
echo   CV Application Development Server
echo ========================================
echo.

REM Check if Python 3 is available
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Python found
    echo.
    echo Starting server on http://localhost:8000
    echo.
    echo Available pages:
    echo   - Main CV:  http://localhost:8000/index.html
    echo   - Tests:    http://localhost:8000/test.html
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if PHP is available
where php >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] PHP found
    echo.
    echo Starting server on http://localhost:8000
    echo.
    echo Available pages:
    echo   - Main CV:  http://localhost:8000/index.html
    echo   - Tests:    http://localhost:8000/test.html
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

REM Check if Node.js is available
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] Node.js found
    echo.
    
    REM Check if http-server is installed
    where http-server >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        echo Starting http-server on http://localhost:8000
        echo.
        echo Available pages:
        echo   - Main CV:  http://localhost:8000/index.html
        echo   - Tests:    http://localhost:8000/test.html
        echo.
        echo Press Ctrl+C to stop the server
        echo.
        http-server -p 8000
    ) else (
        echo http-server not found. Installing via npx...
        echo.
        npx http-server -p 8000
    )
    goto :end
)

REM No suitable server found
echo [ERROR] No suitable server found!
echo.
echo Please install one of the following:
echo   - Python 3: https://www.python.org/downloads/
echo   - Node.js:  https://nodejs.org/
echo   - PHP:      https://www.php.net/downloads
echo.
echo Or open index.html directly in your browser
echo (some features may not work with file:// protocol)
echo.
pause
exit /b 1

:end
