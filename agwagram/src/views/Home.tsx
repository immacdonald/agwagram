import clsx from 'clsx';
import { Card, Heading, Loading, Page, Section, Text } from 'phantom-library';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import { selectResults } from '@data/settingsSlice';
import { Analyze } from './Analyze';
import { Results } from './Results';
import style from './Home.module.scss';

const Home: FC = () => {
    const resultState = useSelector(selectResults);

    return (
        <Page title="agwagram">
            <Section className={clsx(style.section, style.split)}>
                <Card fullHeight context="primary">
                    <Card.Body>
                        <Heading
                            major
                            title="Welcome to agwagram!"
                            subtitle={
                                <>
                                    A{' '}
                                    <i>
                                        <Link to="https://github.com/wm-newslab" target="_blank">
                                            NEWS Lab
                                        </Link>
                                    </i>{' '}
                                    Project
                                </>
                            }
                        />
                        <Text>
                            agwagram enables you to study a broad spectrum of authentic & inauthentic behaviors of Twitter (aka X) accounts. With agwagram, you can explore the behaviors of news
                            organizations, self-declared bots, trolls, etc.
                        </Text>
                        <Text>
                            agwagram is a portmanteau of "agwa" (Igbo language for "behavior") and "gram" (Greek language for "a record"). This tool utilizes the BLOC language framework. For more
                            details, see the{' '}
                            <Link to="/about" target="_blank">
                                about page
                            </Link>
                            .
                        </Text>
                    </Card.Body>
                </Card>
                <Card fullHeight>
                    <Card.Body>
                        <Analyze />
                    </Card.Body>
                </Card>
            </Section>
            {resultState.loading && (
                <Section alt className={style.section}>
                    <Loading />
                </Section>
            )}
            {resultState.data && (
                <Section alt className={clsx(style.section, style.results)}>
                    <Results />
                </Section>
            )}
        </Page>
    );
};

export { Home };
