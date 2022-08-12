import { IoBedSharp } from 'react-icons/io5';
import { FaCar, FaRegPaperPlane, FaTaxi } from 'react-icons/fa';
import { MdOutlineAttractions } from 'react-icons/md';
import './headerList.scss'

const HeaderList = () => {
    return (
        <div className="headerList">
            <div className="headerListItem active">
                <IoBedSharp className='icon' />
                <span>Stays</span>
            </div>
            <div className="headerListItem">
                <FaRegPaperPlane className='icon' />
                <span>Flights</span>
            </div>
            <div className="headerListItem">
                <FaCar className='icon' />
                <span>Car rentals</span>
            </div>
            <div className="headerListItem">
                <MdOutlineAttractions className='icon' />
                <span>Attractions</span>
            </div>
            <div className="headerListItem">
                <FaTaxi className='icon' />
                <span>Taxi</span>
            </div>
        </div>
    )
}

export default HeaderList