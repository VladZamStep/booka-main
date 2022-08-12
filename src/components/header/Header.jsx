import './header.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import HeaderList from './header_components/HeaderList';
import { SearchContext } from '../../context/SearchContext';
import HeaderOptions from './header_components/header_options/HeaderOptions';

const HEADER_TITLE = "Explore the hotel world with Booka.com!";
const HEADER_DESCRIPTION = "Find your best stay option! Search deals on hotels, apartments, resorts and much more...";

const Header = ({ type }) => {

    const [destination, setDestination] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(new Date().setHours(0, 0, 0, 0)),
            endDate: new Date(new Date().setHours(24, 0, 0, 0)),
            key: 'selection'
        }
    ]);

    const [openOpt, setOpenOpt] = useState(false)
    const [options, setOptions] = useState(
        {
            adults: 1,
            children: 0,
            rooms: 1
        }
    )
    const navigate = useNavigate();

    const changeNum = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "increase" ? options[name] + 1 : options[name] - 1,
            }
        });
    };

    //Open and Close Date $ Options
    const changeStateDate = () => {
        if (openOpt === false) {
            setOpenDate(!openDate)
        }
        else {
            setOpenOpt(!openOpt);
            setOpenDate(!openDate)
        }
    }
    const changeStateOpt = () => {
        if (openDate === false) {
            setOpenOpt(!openOpt)
        }
        else {
            setOpenDate(!openDate);
            setOpenOpt(!openOpt);
        }
    }
    const closeDateOpt = () => {
        if (openDate) setOpenDate(!openDate);
        else if (openOpt) setOpenOpt(!openOpt);
        else return;
    }

    const { dispatch } = useContext(SearchContext);

    const handleSearch = () => {
        if (destination === "") return
        else {
            closeDateOpt();
            dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
            navigate('/hotels', { state: { destination, dates, options } });
        }
    }

    return (
        <div className='header'>
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
                <HeaderList />
                {type !== 'list' &&
                    <>
                        <h1 className='headerTitle'>{HEADER_TITLE}</h1>
                        <p className='headerDescription'>{HEADER_DESCRIPTION}</p>
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input
                                    type="text"
                                    placeholder='Where are you going?'
                                    className='headerSearchInput'
                                    onClick={closeDateOpt}
                                    onChange={e => {
                                        const myRegex = /( |^)[a-z]/g;
                                        const newValue = e.target.value.replace(myRegex, function (character) { return character.toUpperCase(); });
                                        setDestination(newValue);
                                    }}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span
                                    onClick={changeStateDate}
                                    className='headerSearchText'
                                >
                                    {
                                        `${format(dates[0].startDate, "MM/dd/yyyy")}
                                        to
                                        ${format(dates[0].endDate, "MM/dd/yyyy")}`
                                    }
                                </span>
                                {openDate && <DateRange
                                    className='date'
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={true}
                                    ranges={dates}
                                    minDate={new Date}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span
                                    className='headerSearchText'
                                    onClick={changeStateOpt}
                                >
                                    {`${options.adults} adult · ${options.children} children · ${options.rooms} room`}
                                </span>
                                {openOpt && <HeaderOptions changeNum={changeNum} options={options} />}
                            </div>
                            <div className="headerSearchItem">
                                <button
                                    className='headerSearchBtn'
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
export default Header;