import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { config } from '@config';

const measurementID = 'G-HP48JN1DVH';

const useAnalytics = (base?: string): void => {
    const location = useLocation();

    useEffect(() => {
        if (config.mode == 'production') {
            ReactGA.initialize(measurementID);
        }
    }, []);

    useEffect(() => {
        const path = `${base ?? ''}${location.pathname + location.search}`;

        if (config.mode == 'production') {
            ReactGA.send({ hitType: 'pageview', page: path });
        } else {
            console.log(path);
        }
    }, [location.pathname, location.search]);
};

export { useAnalytics };
