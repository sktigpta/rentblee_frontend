import GoogleSignin from "../../components/authentication/GoogleSignIn"
import Login from "../../components/authentication/Login"

export const LoginPage = () => {
    return (
        <>
            <div className="form">
                <div style={{ width: "100%", marginBottom: "1em" }}><h1>Login</h1></div>
                <Login />
                <GoogleSignin />
            </div>

        </>
    )
}