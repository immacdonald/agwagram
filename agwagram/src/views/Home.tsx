import { Card, Page, Section } from '@imacdonald/phantom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Results } from '.';
import Loading from '../components/Loading';
import { selectResults } from '../data/settingsSlice';
import Analyze from './Analyze';
import style from './Home.module.scss';

function Home() {
	const resultState = useSelector(selectResults);

	return (
		<Page title="Agwagram">
			<Section className={style.split}>
				<div>
					<h1>
						Welcome to <i>Agwagram</i>
					</h1>
					<p>
						Agwagram is a cutting-edge online behavioral analysis tool designed to help researchers, journalists, social media analysts, and any other interested parties in identifying and
						quantitatively describing the behavior of social media accounts. Capable of detecting a broad range of legitimate and suspicious behaviors, Agwagram offers a powerful yet
						flexible method for analyzing Twitter accounts - making it an essential tool for anyone looking to explore coordinated disinformation on social media platforms.
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
