import { useState } from 'react';
import axios from 'axios';
import { AiOutlineCheck } from 'react-icons/ai';
import { API_URL } from '../utils/config';
import './mailList.scss';

const MailList = () => {

    const [info, setInfo] = useState({});
    const [openSuccess, setOpenSuccess] = useState(false);

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const newEmail = {
            ...info,
        }
        try {
            await axios.post(`${API_URL}/api/subscribedEmails`, newEmail)
            setOpenSuccess(true)
            setTimeout(() => {
                setOpenSuccess(false)
            }, 2500);
        } catch (err) {
            console.log(err)
        }
    }

    const handleClear = (e) => {
        e.target.value = '';
    }

    return (
        <div className="mail">
            <h1 className="mailTitle">Save time, save money!</h1>
            <span className="mailDesc">Sign up and we'll send the best deals to you.</span>
            <div className="mailInputContainer">
                <input
                    type="email"
                    placeholder='Your Email'
                    onChange={handleChange}
                    id="email"
                    onFocus={handleClear}
                />
                <button onClick={handleSend}>Subscribe</button>
            </div>
            {openSuccess &&
                <div className="messageContainer">
                    <div className="messageWrapper">
                        <AiOutlineCheck className="messageTick" />
                        <span className="messageInfo">
                            Subscribed successfully!
                        </span>
                    </div>
                </div>}
        </div>
    )
}
export default MailList;
