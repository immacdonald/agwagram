import { Card, Loading, Page, Section } from '@imacdonald/phantom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Results } from '.';
import { selectResults } from '../data/settingsSlice';
import Analyze from './Analyze';
import style from './Home.module.scss';

function Home() {
	const resultState = useSelector(selectResults);

	return (
		<Page title="agwagram">
			<Section className={style.split}>
				<div>
					<h1>
						Welcome to agwagram!
					</h1>
                    <h4>
                        (A <a href="https://github.com/wm-newslab">NEWS Lab</a> project)
                    </h4>
					<p>
						agwagram enables you to study a broad spectrum of authentic & inauthentic behaviors of Twitter (aka X) accounts. With agwagram, you can explore the behaviors of news organizations, self-declared bots, trolls, etc.
                    </p>
                    <p>
                        agwagram is a portmanteau of "agwa" (Igbo language for "behavior") and "gram" (Greek language for "a record"). This tool utilizes the BLOC language framework.
            
                        For more details, see <a href="/about">About</a>.
					</p>
				</div>
				<Card>
					<Card.Body>
						<Analyze />
					</Card.Body>
				</Card>
			</Section>
			{resultState.loading && (
				<Section alt className={style.gradient}>
					<Loading />
				</Section>
			)}
			{resultState.data && (
				<Section alt className={clsx(style.gradient, style.results)}>
					<Results />
				</Section>
			)}
		</Page>
	);
}

export default Home;
