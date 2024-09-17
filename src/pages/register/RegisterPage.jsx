import GoogleSignin from "../../components/authentication/GoogleSignIn"
import Register from "../../components/authentication/Register"

export const RegisterPage = () => {
    return (
        <>
            <div className="form">
                <div style={{ width: "100%", marginBottom: "1em" }}><h1>Register</h1></div>
                <Register/>
                <GoogleSignin/>
            </div>
        </>
    )
}