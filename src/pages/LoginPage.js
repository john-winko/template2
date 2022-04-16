import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <p>You must log in to view this page</p>
      <hr/>
        <p><Link to={"/signup"}>Sign up</Link></p>

    </div>
  );
}

export default LoginPage