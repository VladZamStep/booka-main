import './loading.css'

const Loading = () => {
    return (
        <div className='spinnerContainer'>
            <div className="textPart">Bo</div>
            <div className="spinner">
                <div className="spinner-sector spinner-sector-lightBlue"></div>
                <div className="spinner-sector spinner-sector-lightMiddleBlue"></div>
                <div className="spinner-sector spinner-sector-middleBlue"></div>
                <div className="spinner-sector spinner-sector-hardBlue"></div>
            </div>
            <div className="textPart">ka</div>
        </div>
    )
}

export default Loading