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
	source .venv/bin/activate
	pip install -r requirements.txt
