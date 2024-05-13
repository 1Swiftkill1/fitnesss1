# fitnes-club


Usage:


git clone https://github.com/pyaidev/fitnes-club.git

virtualenv venv

source venv/bin/activate

**pip install -r requirments/base.txt** 

create .env file

## Add static folder

Enjoy! 



cd /var/www/

git clone https://github.com/pyaidev/fitnes-club.git

cd vsebanki.kg

#  Deployment setup

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

Briefly describe your project. What does it do? What problem does it solve? Include any key features that make it unique.

## Table of Contents
    
- [Installation](#installation)
- [Postgres](#postgres)
- [Usage](#usage)
- [License](#license)
- [Configure](#configure)

## Installation

installation for backend

```bash
sudo apt update
sudo apt install python3-venv python3-dev libpq-dev postgresql postgresql-contrib nginx curl
pip install virtualenv

```

clone project

```bash
cd /var/www/
git clone https://github.com/pyaidev/fitnes-club.git
```

## Postgres
```bash
sudo -u postgres psql
```

create a new database and new user
```bash

CREATE DATABASE myproject;
CREATE USER myprojectuser WITH PASSWORD 'password';
```


user permissions

```bash

ALTER ROLE myprojectuser SET client_encoding TO 'utf8';
ALTER ROLE myprojectuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE myprojectuser SET timezone TO 'UTC';
```

grant new user to new db

```bash
GRANT ALL PRIVILEGES ON DATABASE myproject TO myprojectuser;
```

exit postgres

```
\q
```

## Usage

```bash
cd /var/www/ecommerce/
virtualenv venv
source /venv/bin/activate
pip install -r requirements/production.txt
```

# change some files inside venv from venv_change folder
venv/lib/python3.10/site-packages/allauth/templates/socialaccount/login.html  <==   /venv_change/templates/login.html


venv/lib/python3.10/site-packages/allauth/socialaccount/providers/okta/views.py <== /venv_change/okta_views.py



create .env

```bash
# Django settings
SECRET_KEY=SECRET_KEY 
DEBUG=True 
DJANGO_SETTINGS_MODULE=core.settings.base 

# Database settings
DB_ENGINE=django.db.backends.postgresql_psycopg2
DB_NAME=DB_NAME 
DB_USER=DB_USER
DB_PASSWORD=DB_PASSWORD
DB_HOST=localhost
DB_PORT=5432

# redis and celery settings
REDIS_URL=redis://localhost:6379/0
CELERY_BROKER_URL=redis://localhost:6379
```



## Configure
nginx and gunicorn setup 

# gunicorn socket andd service configuration
https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-22-04#checking-for-the-gunicorn-socket-file




restart gunicorn
```bash
sudo systemctl daemon-reload
sudo systemctl restart gunicorn
```

# nginx configuration

https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-22-04#configure-nginx-to-proxy-pass-to-gunicorn

restart nginx
```bash
sudo systemctl restart nginx
```