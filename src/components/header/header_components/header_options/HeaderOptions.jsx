import './headerOptions.scss'

const HeaderOptions = (props) => {
    return (
        <div className="options">
            <div className="optionItem">
                <span className="optionText">Adults</span>
                <div className="optionCounter">
                    <button
                        disabled={props.options.adults <= 1}
                        className="optionBtn"
                        onClick={() => props.changeNum("adults", "decrease")}>
                        −
                    </button>
                    <span className="optionText">{props.options.adults}</span>
                    <button
                        disabled={props.options.adults >= 9}
                        className="optionBtn"
                        onClick={() => props.changeNum("adults", "increase")}>
                        +
                    </button>
                </div>
            </div>
            <div className="optionItem">
                <span className="optionText">Children</span>
                <div className="optionCounter">
                    <button
                        disabled={props.options.children <= 0}
                        className="optionBtn"
                        onClick={() => props.changeNum("children", "decrease")}>
                        −
                    </button>
                    <span className="optionText">{props.options.children}</span>
                    <button
                        disabled={props.options.children >= 9}
                        className="optionBtn"
                        onClick={() => props.changeNum("children", "increase")}>
                        +
                    </button>
                </div>
            </div>
            <div className="optionItem">
                <span className="optionText">Room</span>
                <div className="optionCounter">
                    <button
                        disabled={props.options.rooms <= 1}
                        className="optionBtn"
                        onClick={() => props.changeNum("rooms", "decrease")}>
                        −
                    </button>
                    <span className="optionText">{props.options.rooms}</span>
                    <button
                        disabled={props.options.rooms >= 5}
                        className="optionBtn"
                        onClick={() => props.changeNum("rooms", "increase")}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}
export default HeaderOptions;