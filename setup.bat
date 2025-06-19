@echo off
REM NextBlog Setup Launcher Batch File
REM This file launches the PowerShell setup script for convenience on Windows systems

echo ============================================
echo      NextBlog Setup Launcher
echo ============================================

REM Check if PowerShell is available
where powershell >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: PowerShell is not available. Please install PowerShell.
    exit /b 1
)

echo.
echo Launching PowerShell setup script...
echo.

REM Execute the PowerShell script with execution policy bypass for this session only
powershell -ExecutionPolicy Bypass -File "scripts\setup.ps1"

REM Check if the script executed successfully
if %ERRORLEVEL% neq 0 (
    echo.
    echo Setup encountered an error. Please check the output above.
    echo You may need to run PowerShell as Administrator and execute:
    echo PowerShell -ExecutionPolicy Bypass -File "scripts\setup.ps1"
    echo.
) else (
    echo.
    echo Setup completed successfully!
    echo.
)

pause 