import {Button, Form, FormControl} from "react-bootstrap";
import axios from '../utils/axiosConfig'
function Login({user, setUser}) {

    const logout = async () => {
        // await utils.logOut()
        setUser(null)
    }

    const setCSRF = () => {
        axios.get('http://localhost:8000/api/csrf/').then(res => console.log(res))
    }

    const formSubmit = (evt) => {
        evt.preventDefault()
        setCSRF()
        const params = {
            "username": evt.target.elements.username.value,
            "password": evt.target.elements.password.value
        }
        // axios.post('http://localhost:8000/v1/user/login/', params
        // ).then(res => {
        //     console.log("logged in", res)
        // }).catch(res => console.log("catch", res))
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

    return (<>{user ? <ShowLogout/> : <ShowLogin/>}</>)
}

export default Login