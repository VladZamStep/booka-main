import './searchResult.scss';
import { Link } from 'react-router-dom';

const SearchResult = (props) => {
    return (
        <div className="searchResult">
            <img className='srImg'
                src={props.element.photos[0]}
                alt="" />
            <div className="srDesc">
                <Link to={`/hotels/${props.element._id}`}>
                    <h1 className="srTitle">{props.element.name}</h1>
                </Link>
                <span className="srDistance">{props.element.distance} m from center</span>
                <span className="srTaxiOpt">Free airport taxi</span>
                <span className="srSubtitle">{props.element.shortDescription}</span>
                <span className="srCancelOpt">FREE cancellation • No prepayment needed</span>
                <span className="srCancelSubtitle">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="srDetails">
                <div className="srRating">
                    <span className="srRatText">{props.element.textRating}</span>
                    <button className='ratingBtn'>{props.element.rating}</button>
                </div>
                <div className="srOptions">
                    <span className="optInfo">1 night, 2 adults</span>
                    <span className="price">US${props.element.cheapestPrice}</span>
                    <span className="optInfo">Includes taxes and fees</span>
                </div>
                <Link to={`/hotels/${props.element._id}`}>
                    <button className="availBtn">See availability</button>
                </Link>
            </div>
        </div>
    )
}

export default SearchResult