import {Button, Form, FormControl} from "react-bootstrap";
import {AuthContext} from "../context/AuthProvider";
import {useContext} from "react";

function Login() {
    let auth = useContext(AuthContext)

    return (
        <Form className="d-flex" onSubmit={auth.signin}>
            <FormControl
                type="search"
                placeholder="Username"
                className="me-2"
                aria-label="Username"
                name={"username"}
                autoComplete={"user"}
            />
            <FormControl
                type="password"
                placeholder="Password"
                className="me-2"
                aria-label="Password"
                name={"password"}
                autoComplete={"password"}
            />
            <Button variant="outline-success" type={"submit"}>Login</Button>
        </Form>
    )
}

function Logout() {
    let auth = useContext(AuthContext)

    return (
        <div>
            <span>Welcome {auth.user}!</span>
            <Button className="ms-2" variant="outline-success" onClick={auth.signout}>Logout</Button>
        </div>
    )
}

function ShowLoginLogout(){
    let auth = useContext(AuthContext)
    if (auth.user)
        return <Logout />
    else
        return <Login />
}

export {Login, Logout, ShowLoginLogout}