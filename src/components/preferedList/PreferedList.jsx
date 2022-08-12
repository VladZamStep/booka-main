import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { API_URL } from '../utils/config';
import LoadingPreferdList from './loadingPreferdList/LoadingPreferdList';
import './preferedList.scss';

const PreferedList = () => {

    const { data, loading } = useFetch(`${API_URL}/api/hotels?featured=true`);

    return (
        < div className='prefList' >
            {loading ? <LoadingPreferdList /> : (
                <>
                    {data.map(element => (
                        <Link to={`/hotels/${element._id}`} key={element._id}>
                            <div className="prefListItem">
                                <img src={element.photos[0]} alt="" />
                                <b className="prefName">{element.name}</b>
                                <span className="prefCity">{element.city}</span>
                                <span className="prefPrice">Starting from <b>US${element.cheapestPrice}</b></span>
                                <div className="prefRating">
                                    <button>{element.rating}</button>
                                    <span>{element.textRating}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </>
            )
            }
        </div >
    )
}
export default PreferedList;