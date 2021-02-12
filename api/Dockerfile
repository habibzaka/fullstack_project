FROM python:3.6
# Environment Varaibles
ENV DISPLAY=:10

RUN apt-get update -y
RUN apt-get install -y gcc musl-dev python3-dev libffi-dev libssl-dev

# xvfb install
RUN apt-get install -y packagekit-gtk3-module libdbus-glib-1-2
RUN apt-get install -y xvfb

# Geckodriver
RUN wget https://github.com/mozilla/geckodriver/releases/download/v0.29.0/geckodriver-v0.29.0-linux64.tar.gz
RUN tar -xvzf geckodriver*
RUN chmod +x geckodriver
RUN cp geckodriver /bin/geckodriver

# Firefox Setup
RUN wget https://ftp.mozilla.org/pub/mozilla.org/firefox/releases/84.0.2/linux-x86_64/en-US/firefox-84.0.2.tar.bz2
RUN tar -xjvf firefox*.tar.bz2
RUN mv firefox /opt/firefox
RUN ln -sf /opt/firefox/firefox /usr/bin/firefox


EXPOSE 5000

# Make working directory
WORKDIR /app

# Install requirements
COPY requirements.txt /app
RUN pip install -r requirements.txt

# Copy project to docker work directory
COPY . /app
