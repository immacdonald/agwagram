# Use Python 3.10 image from Docker
FROM python:3.10

# Send Python output straight to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# Create root directory for the website
RUN mkdir /server

# Set the working directory to the newly created directory
WORKDIR /server

# Copy the current directory contents into the container at /server
ADD . /server/

# Install any needed packages specified in requirements.txt
RUN pip3 install -r requirements.txt

