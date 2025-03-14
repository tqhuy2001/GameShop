@echo off
set /p message=Enter migration message:
alembic revision --autogenerate -m "%message%"