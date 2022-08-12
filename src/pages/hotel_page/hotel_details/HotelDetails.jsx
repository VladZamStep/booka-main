import './hotelDetails.scss'
import { useContext, useState } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ChooseRoom from '../../../components/chooseRoom/ChooseRoom';
const HotelDetails = (props) => {

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const { user } = useContext(AuthContext);
    const { options } = useContext(SearchContext);

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        }
        else {
            navigate("/login");
        }
    }

    return (
        <>
            <div className="hotelDetails">
                <div className="hotelDetTexts">
                    <h1 className="hotelTitle">{props.title}</h1>
                    <p className="hotelDesc">{props.description}</p>
                </div>
                <div className="hotelPrice">
                    <div className="top">
                        <h1>Perfect for a {props.days}-night stay!</h1>
                        <span>
                            Want a great night's sleep?<br />
                            This hotel was highly-rated by recent guests! <b className='greenRating'>({props.rating})</b>
                        </span>
                    </div>
                    <div className="bottom">
                        <h2><b>${props.days * props.cheapestPrice * options.rooms}</b> ({props.days} nights)</h2>
                        <button onClick={handleClick}>Reserve or Book Now!</button>
                    </div>
                </div>
            </div>
            {openModal && <ChooseRoom setOpen={setOpenModal} hotelId={props.id} />}
        </>
    )
}

export default HotelDetails