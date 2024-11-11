import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TuneIcon } from '@assets/icons';
import { Button, Heading, Loading, setModal, Typography } from 'phantom-library';
import { DashboardLayout } from 'src/layouts/DashboardLayout';
import { selectAnalysis } from '@data/settingsSlice';
import { AnalysisConfig } from './AnalysisConfig';
import { Analyze } from './Analyze';
import { Results } from './Results';
import style from './Home.module.scss';

const Home: FC = () => {
    const { data, loading } = useSelector(selectAnalysis);

    return (
        <DashboardLayout header={false}>
            <div className={style.split}>
                <Button type="default" Icon={TuneIcon} onClick={() => setModal(<AnalysisConfig />)} className={style.settings} />
                <div>
                    <div>
                        <Heading>Welcome to agwagram!</Heading>
                        <Typography.Paragraph>
                            agwagram enables you to study a broad spectrum of authentic & inauthentic behaviors of Twitter (aka X) accounts. With agwagram, you can explore the behaviors of news
                            organizations, self-declared bots, trolls, etc.
                        </Typography.Paragraph>
                        <Typography.Paragraph>
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
                    </div>
                </div>
            </div>
            {loading && (
                <div>
                    <Loading />
                </div>
            )}
            {data && (
                <div>
                    <Results />
                </div>
            )}
        </DashboardLayout>
    );
};

export { Home };
