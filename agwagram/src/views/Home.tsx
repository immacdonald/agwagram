import { useDispatch, useSelector } from 'react-redux';
import { Results } from '.';
import { Button, Card, Page, Section } from '@imacdonald/phantom';
import { clearResults, selectResults } from '../data/settingsSlice';
import Analyze from './Analyze';
import style from './Analyze.module.scss';
import Loading from '../components/Loading';

function Home() {
	const resultState = useSelector(selectResults);

	const dispatch = useDispatch();

	const returnToAnalysis = () => {
		dispatch(clearResults());
	};

	return (
		<Page title="Agwagram">
			<Section className={style.split}>
				<div>
					<h1>
						Welcome to <i>Agwagram</i>
					</h1>
					<p>
						Agwagram is a cutting-edge online behavioral analysis tool designed to help researchers, journalists, social media analysts, and any other interested parties in identifying and
						quantitatively describing the behavior of social media accounts. Capable of detecting a broad range of legitimate and suspicious behaviors, Agwagram offers a powerful yet flexible
						method for analyzing Twitter accounts - making it an essential tool for anyone looking to explore coordinated disinformation on social media platforms.
					</p>
					{resultState.data && <Button label="&#8592; Analyze Another" onClick={() => returnToAnalysis()} rounded />}
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
				<Section alt className={style.gradient}>
					<Results />
				</Section>
			)}
		</Page>
	);
}

export default Home;
