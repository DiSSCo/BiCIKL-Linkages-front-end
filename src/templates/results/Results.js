/* Import Dependencies */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import './results.scss';

/* Import Components */
import Header from 'templates/header/Header';
import Footer from 'templates/footer/Footer';
import ResultsBody from './components/ResultsBody';


const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [locationCheck, setLocationCheck] = useState(false);

    /* Fetch results from location state, if not present, redirect to Home */
    useEffect(() => {
        if (location.state) {
            setLocationCheck(true);
        } else {
            navigate('/');
        }
    }, [navigate, location]);

    /* Backdrop handling */
    const [backdrop, setBackdrop] = useState(false);

    const classBackdrop = classNames({
        'results_backdrop': true,
        'active': backdrop
    });

    if (locationCheck) {
        const results = location.state.results;
        const formData = location.state.formData;

        return (
            <div className="h-100">
                <div className={classBackdrop} />

                <div className="main_bg">
                    <Header />

                    <ResultsBody results={results}
                        formData={formData}

                        SetBackdrop={(bool) => setBackdrop(bool)}
                    />
                </div>

                <div className={"main_footer"}>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Results;