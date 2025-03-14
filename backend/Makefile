run:
	uvicorn app.main:app --reload --port 8001

heads:
	alembic heads

migrate:
	alembic upgrade head

revision:
	revision.bat

freeze:
	pip freeze > requirements.txt

ready:
	python -m venv .venv
	.venv/Scripts/activate.bat
	.venv/Scripts/activate.ps1
	pip install -r requirements.txt
