import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch.js'
import LoadingDisplayed from './loadingDisplayed/LoadingDisplayed.jsx';
import { SearchContext } from '../../context/SearchContext.js';
import { API_URL } from '../utils/config.js';
import './displayed.scss'
const Displayed = () => {

    const navigate = useNavigate();

    const dates = [
        {
            startDate: new Date(new Date().setHours(0, 0, 0, 0)),
            endDate: new Date(new Date().setHours(24, 0, 0, 0)),
            key: 'selection'
        }
    ];

    const options =
    {
        adults: 1,
        children: 0,
        rooms: 1
    }

    const { data, loading } = useFetch(`${API_URL}/api/hotels/countByCity?cities=Los+Angeles,New+York,Atlanta`)
    const { dispatch } = useContext(SearchContext);

    const searchByCity = (cityName) => {
        dispatch({ type: "NEW_SEARCH", payload: { destination: cityName, dates, options } });
        navigate('/hotels', { state: { destination: cityName, dates, options } });
    }

    return (
        <div className='displayContainer'>
            <div className='displayed'>
                {loading ? <LoadingDisplayed /> : (
                    <>
                        <div className="displayedItem" onClick={() => searchByCity("Los Angeles")}>
                            <img className="displayedImg"
                                src="https://proprikol.ru/wp-content/uploads/2020/09/kartinki-los-andzheles-45.jpg"
                                alt=""
                            />
                            <div className="imgItems">
                                <h1 className="imgName">Los Angeles</h1>
                                <h2 className="imgProp">{data[0]} properties</h2>
                            </div>
                        </div>
                        <div className="displayedItem" onClick={() => searchByCity("New York")}>
                            <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/01/31/09/new-york-main-image.jpg" alt="" className="displayedImg" />
                            <div className="imgItems">
                                <h1 className="imgName">New York</h1>
                                <h2 className="imgProp">{data[1]} properties</h2>
                            </div>
                        </div>
                        <div className="displayedItem" onClick={() => searchByCity("Atlanta")}>
                            <img src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/12/04151224/atlanta-downtown-i85-1200x887.jpg" alt="" className="displayedImg" />
                            <div className="imgItems">
                                <h1 className="imgName">Atlanta</h1>
                                <h2 className="imgProp">{data[2]} properties</h2>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Displayed;