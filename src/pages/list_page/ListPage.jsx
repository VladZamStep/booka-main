import Header from '../../components/header/Header'
import NavBar from '../../components/navbar/NavBar'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import SearchResult from '../../components/searchResult/SearchResult'
import useFetch from '../../hooks/useFetch'
import HeaderOptions from '../../components/header/header_components/header_options/HeaderOptions'
import { dayDifference } from '../../components/daysDifference/daysDifference'
import Loading from '../../components/loading/Loading'
import './listPage.scss'
import { API_URL } from '../../components/utils/config';

const ListPage = () => {

    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destination)
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState(location.state.dates)
    const [options, setOptions] = useState(location.state.options)
    const [openOpt, setOpenOpt] = useState(false)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const days = (dayDifference(dates[0].endDate, dates[0].startDate));

    //Option's function
    const changeNum = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "increase" ? options[name] + 1 : options[name] - 1,
            }
        });
    };

    const { data, loading, reFetch } = useFetch(
        `${API_URL}/api/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
    )

    const handleSearch = () => {
        reFetch()
    }
    console.log(data)
    return (
        <div>
            <NavBar />
            <Header type='list' />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className='listTitle'>Search</h1>
                        <div className="listItems">
                            <div className="listItem">
                                <label className='specLabel'>Destination/property name:</label>
                                <input
                                    className='specInput'
                                    type="text"
                                    placeholder={destination}
                                    onChange={e => {
                                        const myRegex = /( |^)[a-z]/g;
                                        const newValue = e.target.value.replace(myRegex, function (character) { return character.toUpperCase(); });
                                        setDestination(newValue);
                                    }} />
                            </div>
                            <div className="listItem">
                                <div className="checkDatesLabels">
                                    <label className='specLabel'>Check-in Date:</label>
                                    <label className='daysDifference'>{days}-night stay</label>
                                </div>
                                <span onClick={() => setOpenDate(!openDate)}
                                    className='dateOptionSpan'>{
                                        `${format(dates[0].startDate, "MM/dd/yyyy")}
                                to
                                ${format(dates[0].endDate, "MM/dd/yyyy")}`
                                    }</span>
                                {openDate && <DateRange
                                    className='dateR'
                                    onChange={item => setDates([item.selection])}
                                    ranges={dates}
                                    minDate={new Date}
                                />}
                            </div>
                            <div className="listItem">
                                <label className='specLabel'>Options:</label>
                                <span className='dateOptionSpan' onClick={() => setOpenOpt(!openOpt)}>
                                    {`${options.adults} adult · ${options.children} children · ${options.rooms} room`}
                                </span>
                                {openOpt &&
                                    <div className="listOptions">
                                        <HeaderOptions changeNum={changeNum} options={options} />
                                    </div>}
                            </div>
                            <div className="listAdd">
                                <span className='listAddType'>
                                    Min Price <small>(per night)</small>
                                </span>
                                <input type="number" placeholder='' onChange={(e) => setMin(e.target.value)} />
                            </div>
                            <div className="listAdd">
                                <span className='listAddType'>
                                    Max Price <small>(per night)</small>
                                </span>
                                <input type="number" placeholder='' onChange={(e) => setMax(e.target.value)} />
                            </div>
                            <button className='searchBtn' onClick={handleSearch}>Search</button>
                        </div>
                    </div>

                    <div className="listResult">
                        {loading ? <Loading /> : (
                            <>
                                {data.map(element => (
                                    <SearchResult element={element} key={element._id} />
                                ))}
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
export default ListPage;
