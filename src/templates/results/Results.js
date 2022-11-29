import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './results.scss';

/* Import Components */
import ResultsBody from './components/ResultsBody';


const Results = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [locationCheck, setLocationCheck] = useState(false);

    /* Fetch results from location state, if not, redirect to Home */
    useEffect(() => {
        if (location.state) {
            setLocationCheck(true);
        } else {
            navigate('/');
        }
    }, [navigate, location]);

    if (locationCheck) {
        const results = location.state.results;
        const formData = location.state.formData;

        return <ResultsBody results={results}
            formData={formData}
        />
    }
}

export default Results;