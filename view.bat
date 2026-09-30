@echo off
title Chris - Dual-Identity Portfolio
color 0A
echo ======================================================================
echo          CHRIS - DUAL-IDENTITY PORTFOLIO (ENGINEER + STUDIO)
echo ======================================================================
echo.
echo  [1/2] Opening browser at http://localhost:3000 ...
start http://localhost:3000
echo.
echo  [2/2] Starting Next.js development server...
echo.
call npm run dev
pause
