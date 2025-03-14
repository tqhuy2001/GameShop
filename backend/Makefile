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
	python3 -m venv .venv
	.venv/bin/activate.bat
	.venv/bin/activate.ps1
	pip install -r requirements.txt
