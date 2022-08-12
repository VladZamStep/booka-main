import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImFolderUpload } from 'react-icons/im'
import { userInputs } from '../../registerSource'
import { BsCheck, BsInfoCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import './registerPage.scss'
import { API_URL } from '../../components/utils/config'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const DEFAULT_NO_PHOTO = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";

const RegisterPage = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file ? file : DEFAULT_NO_PHOTO);
        data.append("upload_preset", "uploadUsers");
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/zamnoise/image/upload", data)

            const { url } = uploadRes.data;
            const newUser = {
                username: user,
                password: pwd,
                ...info,
                img: url,
            };
            await axios.post(`${API_URL}/api/auth/register`, newUser);
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(info, user, pwd)
    return (
        <div className='registerPage'>
            <img
                className='backgroundImg'
                src="https://www.tripsavvy.com/thmb/9UCe7bHm9MK9s_UO1nr_FcN-bKE=/5095x3383/filters:fill(auto,1)/usa--oregon--bend--illuminated-tent-by-lake-in-mountains-sb10070057l-001-5c3f91f746e0fb00012b9a84.jpg" alt="" />
            <div className="registerContainer">
                <form>
                    <img
                        className='profileImg'
                        src={file
                            ? URL.createObjectURL(file)
                            : DEFAULT_NO_PHOTO}
                        alt=""
                    />

                    {/*Image Input*/}

                    <div className="registerInput">
                        <label className="imageLabel" htmlFor='file'>
                            Image: <ImFolderUpload className="icon" />
                        </label>
                        <input
                            type="file"
                            id='file'
                            onChange={e => setFile(e.target.files[0])}
                            style={{ display: "none" }} />
                    </div>

                    {/*Username Input*/}

                    <div className="registerInput">
                        <label htmlFor="username">
                            <div className="labelBox">
                                Username:
                                <BsCheck className={validName ? 'valid' : 'hide'} />
                                <MdClose className={validName || !user ? "hide" : "invalid"} />
                            </div>
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            placeholder="Vlad_Step"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <div className='infoInstructions'>
                                <BsInfoCircle />
                                Must begin with a letter.
                            </div>
                            4 to 24 characters.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>

                    {/*Password Input*/}

                    <div className="registerInput">
                        <label htmlFor="password">
                            <div className="labelBox">
                                Password:
                                <BsCheck className={validPwd ? 'valid' : 'hide'} />
                                <MdClose className={validPwd || !pwd ? "hide" : "invalid"} />
                            </div>
                        </label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="off"
                            placeholder="********"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <div className='infoInstructions'>
                                <BsInfoCircle />
                                8 to 24 characters.
                            </div>
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <br />
                            <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    </div>

                    {/*Confirm Password Input*/}

                    <div className="registerInput">
                        <label htmlFor="confirm_pwd">
                            <div className="labelBox">
                                Confirm Password:
                                <BsCheck className={validMatch && matchPwd ? 'valid' : 'hide'} />
                                <MdClose className={validMatch || !matchPwd ? "hide" : "invalid"} />
                            </div>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            autoComplete="off"
                            placeholder="********"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <div className='infoInstructions'>
                                <BsInfoCircle />
                                Must match the first password input field.
                            </div>
                        </p>
                    </div>

                    {/*Other Inputs*/}

                    {userInputs.map((input) => (
                        <div className="registerInput" key={input.id}>
                            <div className="labelBox">
                                <label htmlFor={input.htmlForOpt}>{input.label}</label>
                            </div>
                            <input
                                onChange={handleChange}
                                type={input.type}
                                placeholder={input.placeholder}
                                id={input.id}
                            />
                        </div>
                    ))}
                </form>
                <div className="btns">
                    <button
                        className="submitBtn"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                    <button
                        disabled={!validName || !validPwd || !validMatch ? true : false}
                        className="submitBtn"
                        onClick={handleClick}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage