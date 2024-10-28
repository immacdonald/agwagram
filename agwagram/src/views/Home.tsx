import clsx from 'clsx';
import { Button, Card, Column, Heading, Loading, MenuIcon, Page, Section, Switch, Typography } from 'phantom-library';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FC, useState } from 'react';
import { selectConfig, selectResults, setConfig } from '@data/settingsSlice';
import { Analyze } from './Analyze';
import { Results } from './Results';
import style from './Home.module.scss';

const Home: FC = () => {
    const resultState = useSelector(selectResults);
    const configState = useSelector(selectConfig);
    const dispatch = useDispatch();

    const [expandAnalysisConfig, setExpandAnalysisConfig] = useState<boolean>(false);

    return (
        <Page title="agwagram">
            <Section>
                <Card context="primary" className={style.split}>
                    <Card.Body>
                        <div>
                            <Heading
                                major
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
                            <div>
                                <Analyze />
                            </div>
                            <div className={style.analysisConfig} data-panel-expanded={expandAnalysisConfig ? 'true' : 'false'}>
                                <div className={style.configToggle}>
                                    <Button Icon={MenuIcon} onClick={() => setExpandAnalysisConfig(!expandAnalysisConfig)} visual="text" />
                                </div>
                                <div className={style.configContent}>
                                    <Heading minor>Config</Heading>
                                    <Column gap="16px" verticalAlign="start" align="start">
                                        <Typography.Text>
                                            Generate Change Reports <Switch state={!!configState.changeReports} onChange={(state: boolean) => dispatch(setConfig({ changeReports: state }))} />
                                        </Typography.Text>
                                        <Typography.Text>
                                            Expert Mode <Switch state={!!configState.expertMode} onChange={(state: boolean) => dispatch(setConfig({ expertMode: state }))} />
                                        </Typography.Text>
                                        <Typography.Text>
                                            Sumgram Tweet Limit{' '}
                                            <input
                                                value={configState.sumgramLimit}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setConfig({ sumgramLimit: Number(event.target.value) }))}
                                            />
                                        </Typography.Text>
                                    </Column>
                                </div>
                            </div>
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
