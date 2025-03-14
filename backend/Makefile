run:
	uvicorn app.main:app --reload --port $(port)

heads:
	alembic heads

migrate-up:
	alembic upgrade head

migrate-down:
	alembic downgrade -1

revision:
	revision.bat

freeze:
	pip freeze > requirements.txt

ready:
	python -m venv .venv
	.venv/Scripts/activate.bat
	.venv/Scripts/activate.ps1
	pip install -r requirements.txt
