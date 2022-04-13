// import PropTypes from "prop-types";


import utils from "../utils/utils";
import {useEffect} from "react";

function HomePage(){
    // whoami

    return (
        <div>
            <h1>Welcome to the homepage</h1>
            <hr/>
            {/*<p>Currently logged in as {username} last login {last_login}</p>*/}
        </div>
    )
}

// // Helps us see console.log error sending wrong info across components
// HomePage.propTypes = {
//     username: PropTypes.string,
//     last_login: PropTypes.string
// }
//
// // Set our default information
// HomePage.defaultProps = {
//     username: "No username",
//     last_login: "No login information"
// }

export default HomePage;