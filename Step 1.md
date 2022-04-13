# Full Stack from scratch steps

## Notes
- Replace "app" with your app / api / backend name
- Replace "proj" with the django project name you want to use

## Create React Frontend
Starting from a blank folder
~~~
npx create-react-app .
~~~
~~~
npm install watch axios react-router-dom react-bootstrap boostrap
~~~

## Create Django Backend
~~~
python -m venv .venv
~~~
#### (Windows) Go into virtual environment
~~~
.venv/scripts/activate.ps1
~~~
#### (Mac/Linux) Go into virtual environment
~~~
source venv/bin/activate
~~~
~~~
pip install django djangorestframework psycopg2 psycopg2-binary python-dotenv django-cors-headers
~~~
~~~
django-admin startproject proj .
~~~
~~~
python manage.py startapp app
~~~

## Make sure everything runs as is
### Verify django
~~~
python manage.py runserver
~~~
### Verify react
~~~ 
npm run start
~~~

# Open up project in IDE of your choice

## Create your .env file and .env.example file

This will hold our secrets and settings that differ between development and server. The .env file itself should be 
git-ignored so that secrets are publicly published, but you have .env.example for reference to what variables should be set.
In the following step, you can set up more variables such as database strings, so they are not publicly visible

~~~ dotenv
DEBUG=true
REACT_APP_URL_PREFIX=http://localhost:8000
REACT_APP_SECRET_TEST=SomeRandomKeyThatOnlyResidesOnLocalMachine
SECRET_KEY=[cut/paste django secret key from settings.py here (without brackets)]
~~~

## Update proj/settings.py
~~~ python
import os
from dotenv import load_dotenv

# This loads our variables in the .env file into our environment and can be retrieved by os.getenv('<KeyName>')
load_dotenv()
...

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = (os.getenv("DEBUG") == "true")

# Opens up all traffic but can be locked down for security
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    ...
    'app',  # Change this to your app name if different
    'rest_framework'
]
if DEBUG:  # Allows split development on local machine
    INSTALLED_APPS += ["corsheaders"]

MIDDLEWARE = [
    ...
]
if DEBUG: # CORS middleware has to be at the beginning of the array if used
    MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")
    
...
#########################
# Only if using postgresql, if using sqlite... omit
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '<YourDatabaseName>',
        'USER': os.getenv('<.ENV_USERNAME>'), # If necessary
        'PASSWORD': os.getenv('<.ENV_PASSWORD>') # If necessary
    }
}
#########################

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "build/static"), # your static files folder (where react builds to)
]

CSRF_TRUSTED_ORIGINS = ['<https://your.domain.com>']

if DEBUG:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    CORS_EXPOSE_HEADERS = ['Content-Type', 'X-CSRFToken']
    CORS_ALLOW_CREDENIALS = True
~~~

## Update the app/views.py
~~~ python
from django.http import HttpResponse


def send_the_homepage(request):
    homepage = open('build/index.html').read()
    return HttpResponse(homepage)
~~~

## Update proj/urls.py
~~~ python
from django.contrib import admin
from django.urls import path, include
from app.views import send_the_homepage

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', send_the_homepage), # This is added here instead of app/urls.py since we will use ViewSets in the app
    path('v1/', include("app.urls"))
]
~~~

## Update app/urls.py
~~~ python
from rest_framework.routers import DefaultRouter

r = DefaultRouter()

urlpatterns = r.urls
~~~

## update package.json (Windows)
~~~ json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "watch": "watch \"npm run build && copy manage.py+\" ./src"
  },
~~~

## update package.json (Mac/Linux)
~~~ json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "watch": "watch \"npm run build && copy manage.py+\" ./src"
  },
~~~

## Update .gitignore
Sample file can be found [here](https://raw.githubusercontent.com/john-winko/template_django_react/Basic_Authentication/.gitignore)

## Remove broken links
npm run build will copy items in the public folder above the /static folder so will be unreachable from django. 
You can either write scripts to manually move these items during builds or comment out/delete the links as show below.
~~~ html
### /public/index.html
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" /> <~~~~~~~~~~~~~~~~ HERE ~~~~~~~~~~~~~~~~
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /><~~~~~~~~~~~~~~~~ HERE ~~~~~~~~~~~~~~~~
    <!--
      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /><~~~~~~~~~~~~~~~~ HERE ~~~~~~~~~~~~~~~~
~~~

## Add folder structure and file to connect to django api
Add 3 folders under /src : components, pages, utils

In the utils folder add the following file and code
~~~ js
// /src/utils/utils.js

import axios from "axios"

const myexports = {}

// This will be edited in the .env file in the root folder
// use your local host in development, leave the value blank on the file residing on the server
const urlPrefix = process.env.REACT_APP_URL_PREFIX

myexports.getCSRFToken = () => {
    let csrfToken

    // the browser's cookies for this page are all in one string, separated by semi-colons
    const cookies = document.cookie.split(';')
    for (let cookie of cookies) {
        // individual cookies have their key and value separated by an equal sign
        const crumbs = cookie.split('=')
        if (crumbs[0].trim() === 'csrftoken') {
            csrfToken = crumbs[1]
        }
    }
    return csrfToken
}

const apiGet = async (url, params = null) => {
    console.log(url, params)  // so we can check which url was called in production if things go wonky
    axios.defaults.headers.common['X-CSRFToken'] = myexports.getCSRFToken()
    if (params)
        return await axios.get(urlPrefix + url, params)
    return await axios.get(urlPrefix + url)
}

const apiPost = async (url, params = null) => {
    console.log(url, params) // so we can check which url was called in production if things go wonky
    axios.defaults.headers.common['X-CSRFToken'] = myexports.getCSRFToken()
    if (params)
        return await axios.post(urlPrefix + url, params)
    return await axios.post(urlPrefix + url)
}

export default myexports;
~~~