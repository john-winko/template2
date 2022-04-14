import {Button, Form, FormControl} from "react-bootstrap";
import {logoutUser, loginUser} from "../utils/auth";
import {byebye, whoAmI} from "../utils/utils";

function Login({user, setUser}) {

    const logout = () => {
        byebye().then(()=>{
            console.log("inside bye")
            logoutUser()
            setUser(null)
        })

    }

    const ping = async () => {
        let res = await whoAmI()
        console.log("ping", res)
    }

    const formSubmit = (evt) => {
        evt.preventDefault()
        const username = evt.target.elements.username.value
        const password = evt.target.elements.password.value
        loginUser(username, password)
            .then(() => setUser(username))
            .catch((err)=>console.log("Error login", err))
    }


    const ShowLogout = () => {
        return (
            <>
                <span>Welcome {user}</span>
                <Button className="ms-2" variant="outline-success" onClick={logout}>Logout</Button>
                <Button onClick={ping}>Whois</Button>
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

    return user ? <ShowLogout/> : <ShowLogin/>
}

export default Login