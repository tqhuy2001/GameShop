#!/bin/bash

read -p "Enter migration message: " message

alembic revision --autogenerate -m "$message"