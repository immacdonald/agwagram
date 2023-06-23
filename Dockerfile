# Use Python 3.10 image from Docker
FROM python:3.10

# Send Python output straight to the terminal with out buffering it first
ENV PYTHONUNBUFFERED 1

# Create root directory for the website
RUN mkdir /bloc-website

# Set the working directory to the newly created directory
WORKDIR /bloc-website

# Copy the current directory contents into the container at /bloc-website
ADD . /bloc-website/

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

