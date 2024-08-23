import { Link } from 'react-router-dom';
import { FC } from 'react';
import { SimpleFooter, Text } from 'phantom-library';

const Footer: FC = () => {
    return (
        <SimpleFooter topBorder>
            <Text as="span">
                &copy; {new Date().getFullYear()}{' '}
                <Link to="https://www.wm.edu" target="_blank">
                    Willam & Mary
                </Link>{' '}
                <Link to="https://github.com/wm-newslab" target="_blank">
                    NEWS Lab
                </Link>
            </Text>
        </SimpleFooter>
    );
};

export { Footer };
