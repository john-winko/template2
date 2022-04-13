# Wiring up

## Make migrations
should not be needed, but if your migrations show changes there may be an issue
~~~
python manage.py makemigrations
~~~
Run the migrations (this WILL be needed)
~~~
python manage.py migrate
~~~

## Create users
Either create a super user (and follow prompts)
~~~
python manage.py createsuperuser
~~~
Then navigate to http://localhost:8000/admin/ and add your users

-Or- add a [fixtures file](https://github.com/john-winko/template_django_react/blob/Basic_Authentication/app/fixtures/data.json) to app/fixtures/ (will have to create folder) then run
~~~
python manage.py loaddata data.json
~~~
*** Note: if you are making your own migrations your OS may use the wrong UTF encoding and will fail to load data. Fix will be to open the fixture file in notepad and resave using UTF-8 (NOT UTF-8 with BOM)

## Add app/serializers.py
~~~ python
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        # NOTE: can only use fields or excludes, not both
        
        # Stricter access
        # fields = ["id", "username", "last_login"]  
        
        # Open access
        exclude = ["password"]                     
~~~

## Update app/views.py

~~~ python
# imports
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import User
from .serializers import UserSerializer

...

# /v1/user/
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['post'])
    def login(self, request, pk=None):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            try:  # access the base request, not DRF request (starts a login session for user)
                login(request._request, user)
            except Exception as e:
                print(str(e))
            return JsonResponse({"user": self.serializer_class(user).data})
        else:
            return JsonResponse({"user": None})
        
    @action(detail=False, methods=['post'])
    def logout(self, request, pk=None):
        logout(request)
        return JsonResponse({"logout":"success"})

    @action(detail=False, methods=['get'])
    def whoami(self, request, pk=None):
        if request.user.is_authenticated:
            return JsonResponse({"user": self.serializer_class(request.user).data})
        return JsonResponse({"user": None})
~~~

## Add url routes to app/urls.py
~~~ python
from app.views import UserViewSet

....

r.register(r'user', UserViewSet)
~~~

# Set up React

## Update our src/utils/utils.js to use new api routes
~~~ jsx
myexports.logOut = async () => await apiPost("/v1/user/logout/")

myexports.logIn = async (params) => {
    return await apiPost("/v1/user/login/", params)
        .then((res) => res.data.user)
}

myexports.whoAmI = async () => {
    return await apiGet("/v1/user/whoami/")
        .then((res) => res.data.user)
}
~~~

## Add bootstrap to src/Index.js
~~~ jsx
import 'bootstrap/dist/css/bootstrap.min.css';
~~~

## Set up routes in src/App.js
~~~ jsx
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import HomePage from "./pages/HomePage"; // red ramen until we make the component
import AppNav from "./components/AppNav"; // red ramen until we make the component

function App() {

    const [user, setUser] = useState(null)

    return (
        <div className="App">
            <BrowserRouter>
                {/*red ramen until we make the component*/}
                <AppNav user={user} setUser={setUser}/>
                <Routes>
                    {/*red ramen until we make the component*/}
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
~~~

## Stub out a homepage in src/pages/HomePage.js
~~~ jsx
function HomePage({username, last_login}){
    return (
        <div>
            <h1>Welcome to the homepage</h1>
            <hr/>
        </div>
    )
}

export default HomePage;
~~~

## Stub out a NavBar in src/components/AppNav.js

~~~ jsx
import { Container, Nav, Navbar } from "react-bootstrap";
import Login from "./Login";

function AppNav({user, setUser}) {

  // keep bootstrap styling intact (no blue underline)
  const linkStyle = { color: 'inherit', textDecoration: 'inherit' }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>Your App Name</Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link>Your link</Nav.Link>
        </Nav>
        <Login user={user} setUser={setUser} /> {/* Red ramen for now, creating in next step*/}
      </Container>
    </Navbar>
  )
};

export default AppNav
~~~

## Create our Login control in src/components/AppNav.js

~~~ jsx
import { Button, Form, FormControl } from "react-bootstrap";
import utils from "../utils/utils";

function Login({user, setUser}) {

  const logout = async () => {
    await utils.logOut()
    setUser(null)
  }

  const formSubmit = (evt) => {
    evt.preventDefault()
    const params = {
      "username": evt.target.elements.username.value,
      "password": evt.target.elements.password.value
    }
    utils.logIn(params).then((user) => {
      console.log("login data", user)
      setUser(user)
    })
  }

  const ShowLogout = () => {
    return (
      <>
        <span>Welcome {user.username}</span>
        <Button className="ms-2" variant="outline-success" onClick={logout}>Logout</Button>
      </>
    )
  }

  const ShowLogin = () => {
    return (
      <Form className="d-flex" onSubmit={formSubmit}>
        <FormControl
          type="search"
          placeholder="Username"
          className="me-2"
          aria-label="Username"
          name={"username"}
        />
        <FormControl
          type="password"
          placeholder="Password"
          className="me-2"
          aria-label="Password"
          name={"password"}
        />
        <Button variant="outline-success" type={"submit"}>Login</Button>
      </Form>
    )
  }

  return (<>{user ? <ShowLogout /> : <ShowLogin />}</>)
}

export default Login
~~~

## Add whoAmI to our app and set User if they are already authenticated to src/App.js
~~~ jsx
 
~~~