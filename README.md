# JWT Authentication

Project is basic boiler plate with CRUD for notes. 

## Setup

### Clone repo (take note of ending dot if you don't want to make another subfolder)
~~~
git clone https://github.com/john-winko/template2.git .
~~~

### Switch to JWT branch
~~~
git checkout jwt
~~~

### (Optional) open up vs code
~~~
code .
~~~

~~~
python -m venv .venv
~~~

#### (Windows) Go into virtual environment
~~~
.venv/scripts/activate.ps1
~~~

#### (Mac/Linux) Go into virtual environment
~~~
source .venv/bin/activate
~~~

~~~
pip install -r requirements.txt
~~~

~~~
python manage.py migrate
~~~

~~~
python manage.py loaddata data.json
~~~

~~~
npm install
~~~

~~~
python manage.py runserver
~~~

~~~
npm run start
~~~


There are 3 sample users (admin, Joe and Bill)

Password is same as their name for login
