import React, { useState, useRef , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';
import { MdMailOutline } from 'react-icons/md';
import { BiLockOpen } from 'react-icons/bi';
import { MdOutlineFaceRetouchingNatural } from 'react-icons/md';
import { Link } from 'react-router-dom';
import profilePng from '../../images/blank-profile-picture-973460_1280.png';
import { clearErrors, loginUser ,registerUser} from '../../state/action-creators/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layouts/Loader/Loader';
import { useLocation } from 'react-router-dom';
function LoginSignUp() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const { error, isAuthenticated, loading } = useSelector((state) => state.userReducer);
    let redirect = location.search ? location.search.split("=")[1] : "";
    useEffect(() => {
      if(error){
          alert.error(error);
          dispatch(clearErrors());
      }
      if(isAuthenticated){
          navigate(`/${redirect}`);
      }
    }, [dispatch , error , isAuthenticated , navigate , alert , redirect]);
    const switcherTab = useRef(null);
    const loginTab = useRef(null);
    const registerTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = user;
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(profilePng);
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else if (e.target.name === "confirmPassword"){
            setConfirmPassword(e.target.value);
        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginEmail, loginPassword));
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("confirmPassword" , confirmPassword);
        myForm.set("avatar", avatar);
        dispatch(registerUser(myForm));
    }
    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <div className="loginSignUpContainer">
                        <div className="loginSignUpBox">
                            <div>
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, 'login')}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, 'register')}>REGISTER</p>
                                </div>
                                <button ref={switcherTab}></button>
                            </div>
                            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                                <div className="loginEmail">
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="loginPassword">
                                    <BiLockOpen />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/forgot-password">Forget Password ?</Link>
                                <input type="submit" value="login" className="loginBtn" />
                            </form>
                            <form
                                className="signUpForm"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="signUpName">
                                    <MdOutlineFaceRetouchingNatural />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpEmail">
                                    <MdMailOutline />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        name="email"
                                        value={email}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <BiLockOpen />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        value={password}
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <div className="signUpPassword">
                                    <BiLockOpen />
                                    <input
                                        type="password"
                                        placeholder="confirmPassword"
                                        required
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={registerDataChange}
                                    />
                                </div>

                                <div id="registerImage">
                                    <img src={avatarPreview} alt="Avatar Preview" />
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        required
                                        onChange={registerDataChange}
                                    />
                                </div>
                                <input type="submit" value="Register" className="signUpBtn" />
                            </form>

                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default LoginSignUp
