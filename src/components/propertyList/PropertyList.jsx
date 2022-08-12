import useFetch from '../../hooks/useFetch';
import { imgData } from './propertyImgData';
import LoadingPropertyList from './loadingPropertyList/LoadingPropertyList';
import { API_URL } from '../utils/config';
import './propertyList.scss';

const PropertyList = () => {

    const { data, loading } = useFetch(`${API_URL}/api/hotels/countByType`)

    return (
        <div className='propListContainer'>
            <div className='propList'>
                {loading ? <LoadingPropertyList /> :
                    (<>
                        {data && imgData.map((img, index) => (
                            <div className="pListItem" key={index}>
                                <div className='imgPlate'>
                                    <img src={img} alt="" />
                                </div>
                                <div className="pListDesc">
                                    <h1>{data[index]?.type}</h1>
                                    <h2>{data[index]?.count} {data[index]?.type}</h2>
                                </div>
                            </div>
                        ))}
                    </>)
                }
            </div >
        </div>
    )
}
export default PropertyList;