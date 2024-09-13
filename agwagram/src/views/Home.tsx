import clsx from 'clsx';
import { Card, Heading, Loading, Page, Section, Typography } from 'phantom-library';
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
            <Section>
                <Card context="primary" className={style.split}>
                    <Card.Body>
                        <div>
                            <Heading
                                major
                                subtitle={
                                    <>A <i><Link to="https://github.com/wm-newslab" target="_blank">NEWS Lab</Link></i> Project</>
                                }
                            >
                                Welcome to agwagram!
                            </Heading>
                            <Typography.Paragraph>
                                agwagram enables you to study a broad spectrum of authentic & inauthentic behaviors of Twitter (aka X) accounts. With agwagram, you can explore the behaviors of news
                                organizations, self-declared bots, trolls, etc.
                            </Typography.Paragraph>
                            <Typography.Paragraph styleLinks={false}>
                                agwagram is a portmanteau of "agwa" (Igbo language for "behavior") and "gram" (Greek language for "a record"). This tool utilizes the BLOC language framework. For more
                                details, see the{' '}
                                <Link to="/about" target="_blank">
                                    about page
                                </Link>
                                .
                            </Typography.Paragraph>
                        </div>
                        <div className={style.analysis}>
                            <Analyze />
                        </div>
                    </Card.Body>
                </Card>
            </Section>
            {resultState.loading && (
                <Section className={style.section}>
                    <Loading />
                </Section>
            )}
            {resultState.data && (
                <Section className={clsx(style.section, style.results)}>
                    <Results />
                </Section>
            )}
        </Page>
    );
};

export { Home };
