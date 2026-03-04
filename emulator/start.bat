@echo off
title Sakhr ROM Loader - Quick Start
color 0B

echo.
echo ================================================
echo       Sakhr ROM Loader - Quick Start
echo ================================================
echo.

REM Check if required files exist
if not exist "index.html" (
    echo [ERROR] index.html not found!
    echo Please make sure you're in the emulator directory
    pause
    exit /b 1
)

echo [OK] Found index.html
echo.

REM Set port
set PORT=8082

REM Stay in emulator directory - everything is local now

echo Starting local server on port %PORT%...
echo Running from: %cd%
echo.
echo WebMSX ROM Loader URL:
echo ----------------------------------------
echo   http://localhost:%PORT%/index.html
echo ----------------------------------------
echo.

REM Try Python first
python --version >nul 2>&1
if not errorlevel 1 (
    echo [OK] Using Python to start server...
    echo.
    echo Opening browser in 3 seconds...
    echo.
    echo Controls:
    echo   - Arrow Keys: Navigate ROM grid
    echo   - Enter/Space: Select and launch ROM
    echo   - ESC: Exit emulator (when running)
    echo.
    echo Press Ctrl+C to stop the server
    echo.

    REM Open browser after 3 seconds
    start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:%PORT%/index.html"

    REM Start Python server
    python -m http.server %PORT%
    goto :end
)

REM Try Python3
python3 --version >nul 2>&1
if not errorlevel 1 (
    echo [OK] Using Python3 to start server...
    echo.
    echo Opening browser in 3 seconds...
    echo.
    echo Controls:
    echo   - Arrow Keys: Navigate ROM grid
    echo   - Enter/Space: Select and launch ROM
    echo   - ESC: Exit emulator (when running)
    echo.
    echo Press Ctrl+C to stop the server
    echo.

    REM Open browser after 3 seconds
    start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:%PORT%/index.html"

    REM Start Python3 server
    python3 -m http.server %PORT%
    goto :end
)

REM Try Node.js
node --version >nul 2>&1
if not errorlevel 1 (
    echo [OK] Using Node.js to start server...
    echo.
    echo Opening browser in 3 seconds...
    echo.

    REM Open browser after 3 seconds
    start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:%PORT%/index.html"

    REM Check if http-server is installed
    call npx http-server --version >nul 2>&1
    if errorlevel 1 (
        echo Installing http-server...
        npm install -g http-server
    )

    npx http-server -p %PORT%
    goto :end
)

echo.
echo [ERROR] No suitable server found!
echo.
echo Please install one of the following:
echo   1. Python 3.x from https://python.org
echo   2. Node.js from https://nodejs.org
echo.
echo Then run this script again.
echo.
pause
goto :end

:end
echo.
echo Server stopped.
echo Thank you for using Sakhr ROM Loader!
echo.
pause
