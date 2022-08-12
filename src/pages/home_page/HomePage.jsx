import NavBar from '../../components/navbar/NavBar';
import Header from '../../components/header/Header';
import Displayed from '../../components/displayed/Displayed';
import PropertyList from '../../components/propertyList/PropertyList';
import PreferedList from '../../components/preferedList/PreferedList';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import './homePage.scss'

export default function HomePage() {
    return (
        <div className='homePage'>
            <NavBar />
            <Header />
            <div className="homeContainer">
                <Displayed />
                <h1 className="homeTitle">Property types we have</h1>
                <PropertyList />
                <h1 className="homeTitle">Homes guests love</h1>
                <PreferedList />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}
