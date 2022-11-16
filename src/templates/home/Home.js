import { Row, Col } from 'react-bootstrap';
import './home.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';


const Home = () => {
    return (
        <div>
            <Header />

            <Footer />
        </div>
    );
}

export default Home;