import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import HomePage from "./pages/HomePage";
import AppNav from "./components/AppNav";
import {whoAmI} from "./utils/utils";

function App() {

    const [user, setUser] = useState(null)

    useEffect(()=>{
        if (user)
            whoAmI().then((res)=>console.log(res))
    }, [user])

    return (
        <div className="App">
            <BrowserRouter>
                <AppNav user={user} setUser={setUser}/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
