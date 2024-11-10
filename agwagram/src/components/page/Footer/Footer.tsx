import { Link } from 'react-router-dom';
import { FC } from 'react';
import { Column, designTokens, Flex, SimpleFooter, StyledLink, Typography } from 'phantom-library';

const Footer: FC = () => {
    return (
        <SimpleFooter style={{borderTop: designTokens.border.light}}>
            <Flex flex={{ base: 'row', xs: 'column' }} gap={{ base: '64px', xs: '8px' }} verticalAlign="start">
                <Column align="start" gap="0">
                    <Typography.Text>
                        <b>About</b>
                    </Typography.Text>
                    <Typography.Text>
                        <i>
                            agwagram is a web tool that enables researchers and journalists to study a broad spectrum of authentic and inauthentic behaviors of Twitter users to understand the actions
                            of online accounts.
                        </i>
                    </Typography.Text>
                </Column>
                <Column align="start" gap="0">
                    <Typography.Text>
                        <b>Navigation</b>
                    </Typography.Text>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </Column>
            </Flex>
            <Typography.Text>
                &copy; {new Date().getFullYear()}{' '}
                <StyledLink to="https://newsresearch.lab.wm.edu" external inherit>
                    Willam & Mary NEWS Lab
                </StyledLink>
            </Typography.Text>
        </SimpleFooter>
    );
};

export { Footer };
