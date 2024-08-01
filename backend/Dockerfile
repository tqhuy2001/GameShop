FROM python:3.12

# Set the working directory in docker
WORKDIR /backend

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Specify the command to run on container start
CMD ["uvicorn", "app.main:app", "--reload", "--host", "0.0.0.0", "--port", "80"]