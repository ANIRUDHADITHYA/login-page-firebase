import React, { useEffect, useState } from "react";
import "./Login.css";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerConfirmPassword, setResgisterConfirmPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const { register, signin, error, user } = useAuth()

    const [isLoginFormVisible, setLoginFormVisible] = useState(true);
    const [navigateDashboard, setNavigateDashboard] = useState(false);

    const handleLoginClick = () => {
        setLoginFormVisible(true);
    };

    const handleSignupClick = () => {
        setLoginFormVisible(false);
    };

    const handleSignupLinkClick = () => {
        handleSignupClick();
    };

    function handleRegister() {
        register(registerEmail, registerConfirmPassword, registerPassword)
    }

    function handleLogin(e) {
        e.preventDefault()
        setNavigateDashboard(true)
        signin(loginEmail, loginPassword)
    }

    useEffect(() => {
        if (user && navigateDashboard) {
            navigate("/home")
        }
    }, [user, navigateDashboard])// eslint-disable-line react-hooks/exhaustive-deps




    return (
        <div className="wrapper">
            <div className="title-text">
                <div className={`title ${isLoginFormVisible ? "login" : "signup"}`}>
                    Account
                </div>
                <div className={`title ${isLoginFormVisible ? "signup" : "login"}`}>
                    Account
                </div>
            </div>
            <div className="form-container">
                <div className="slide-controls">
                    <input
                        type="radio"
                        name="slide"
                        id="login"
                        checked={isLoginFormVisible}
                    />
                    <input
                        type="radio"
                        name="slide"
                        id="signup"
                        checked={!isLoginFormVisible}
                    />
                    <label htmlFor="login" className="slide login" onClick={handleLoginClick}>
                        Login
                    </label>
                    <label htmlFor="signup" className="slide signup" onClick={handleSignupClick}>
                        SignUp
                    </label>
                    <div className="slider-tab"></div>
                </div>
                <div className="form-inner">
                    {isLoginFormVisible ? (
                        <form className="login">
                            <div class="field">
                                <input type="text" placeholder="Email Address" onChange={(event) => { setLoginEmail(event.target.value) }} required />
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Password" onChange={(event) => { setLoginPassword(event.target.value) }} required />
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", fontWeight: "600", color: "red", paddingTop: "10px" }}>{error ? error.login : ""}</p>
                            </div>
                            <div class="field btn">
                                <div class="btn-layer"></div>
                                <input type="submit" value="Login" onClick={(e) => { handleLogin(e) }} />
                            </div>

                            <div className="signup-link">
                                Don't Have Account?
                                <a href="/#" onClick={handleSignupLinkClick}>Create A New</a>
                            </div>
                        </form>
                    ) : (
                        <form action="#" className="signup">
                            <div class="field">
                                <input type="text" placeholder="Email Address" onChange={(event) => {
                                    setRegisterEmail(event.target.value)
                                }} required />
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Password" onChange={(event) => {
                                    setResgisterConfirmPassword(event.target.value)
                                }} required />
                            </div>
                            <div class="field">
                                <input type="password" placeholder="Confirm Password" onChange={(event) => {
                                    setRegisterPassword(event.target.value)
                                }} required />
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", fontWeight: "600", color: "red", paddingTop: "10px" }}>{error ? error.registerPassword : ""}</p>
                            </div>
                            <div class="field btn">
                                <div class="btn-layer"></div>
                                <input type="submit" value="SignUp" onClick={handleRegister} />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
