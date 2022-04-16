import './App.css';
import {Route, Routes} from "react-router-dom";
import PublicPage from "./pages/PublicPage.js";
import LoginPage from "./pages/LoginPage.js";
import Layout from "./pages/Layout.js";
import ProtectedPage from "./pages/ProtectedPage.js"
import Signup from "./pages/Signup";
import {AuthProvider, RequireAuth} from "./context/AuthProvider";
import HomePage from "./pages/HomePage";
import Notes from "./pages/Notes";


function App() {

    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/public"} element={<PublicPage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/signup"} element={<Signup />}/>
                        <Route element={<RequireAuth />}>
                            <Route path={"/protected"} element={<ProtectedPage />} />
                            <Route path={"/notes"} element={<Notes />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;