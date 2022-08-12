import './hotelPage.scss'
import NavBar from '../../components/navbar/NavBar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import HotelDetails from './hotel_details/HotelDetails'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { useState, useContext } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { dayDifference } from '../../components/daysDifference/daysDifference'
import Loading from '../../components/loading/Loading'
import { API_URL } from '../../components/utils/config'

const HotelPage = () => {

    const location = useLocation();

    const id = location.pathname.split("/")[2];

    const { data, loading } = useFetch(`${API_URL}/api/hotels/find/${id}`)

    const { dates } = useContext(SearchContext);

    const days = (dayDifference(dates[0].endDate, dates[0].startDate));

    const [current, setCurrent] = useState(0)
    const length = data.photos?.length;
    const [open, setOpen] = useState(false);

    const handleOpen = (i) => {
        setOpen(true);
        setCurrent(i);
    }

    const handleMove = (direction) => {
        let newIndex;
        if (direction === 'left') {
            newIndex = current === 0 ? length - 1 : current - 1;

        }
        else if (direction === 'right') {
            newIndex = current === length - 1 ? 0 : current + 1;
        }
        else return;
        setCurrent(newIndex);
    }

    const moveDot = index => {
        setCurrent(index - 1)
    }

    return (
        <div className='hotelPage'>
            <NavBar />
            <Header type="list" />
            <div className="hotelContainer">
                {loading ? <Loading /> :
                    (<>
                        {open && <div className="slider">
                            <div className="sliderContainer">
                                <div className="sliderWrapper">
                                    <MdArrowLeft className='arrowL' onClick={() => { handleMove('left') }} />
                                    <img className='sliderImg' src={data.photos[current]} alt="" />
                                    <MdArrowRight className='arrowR' onClick={() => { handleMove('right') }} />
                                    <div className="container-dots">
                                        {Array.from({ length: length }).map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => moveDot(index + 1)}
                                                className={current === index ? "dot active" : "dot"}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <MdClose className='close' onClick={() => setOpen(false)} />
                            </div>
                        </div>}
                        <div className="hotelWrapper">
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAddress">
                                <FaMapMarkerAlt />
                                <span>{data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location - {data.distance}m from center
                            </span>
                            <span className="hotelPriceBonus">
                                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {data.photos?.map((photo, index) => (
                                    <img
                                        key={index}
                                        onClick={() => handleOpen(index)}
                                        className='hotelImg' src={photo} alt=""
                                    />
                                ))
                                }
                            </div>
                            <HotelDetails
                                title={data.title}
                                description={data.description}
                                days={days}
                                rating={data.rating}
                                cheapestPrice={data.cheapestPrice}
                                id={id}
                            />
                        </div>
                    </>)}
            </div>
            <div className="mailFooter">
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default HotelPage