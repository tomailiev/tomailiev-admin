import { useState } from "react";
import { login } from "../utils/firebase-auth";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePassChange(e) {
        setPass(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        login(email, pass)
            .then(console.log)
            .catch(console.error)
    }


    return <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>
                    Email:
                </label>
                <input type="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-field">
                <label>
                    Pass:
                </label>
                <input type="password" value={pass} onChange={handlePassChange} />
            </div>
            <input type="submit" value="Login" />
        </form>
    </div>
}

export default Login;