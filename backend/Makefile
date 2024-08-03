run:
	uvicorn app.main:app --reload --port 8000

heads:
	alembic heads

migrate:
	alembic upgrade head

revision:
	./revision.sh

freeze:
	pip freeze > requirements.txt

ready:
	python3 -m venv .venv
	source .venv/bin/activate
	pip install -r requirements.txt
