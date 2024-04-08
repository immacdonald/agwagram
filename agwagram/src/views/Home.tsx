import { useSelector } from 'react-redux';
import { Results } from '.';
import Page from '../components/Page/Page';
import Section from '../components/Page/Section';
import { selectResults } from '../data/settingsSlice';
import Analyze from './Analyze';

function Home() {
	const resultState = useSelector(selectResults);

	return (
		<Page>
			<Section>
				<h1>
					Welcome to <i>Agwagram</i>
				</h1>
				<p>
					Agwagram is a cutting-edge online behavioral analysis tool designed to help researchers, journalists, social media analysts, and any other interested parties in identifying and
					quantitatively describing the behavior of social media accounts. Capable of detecting a broad range of legitimate and suspicious behaviors, Agwagram offers a powerful yet flexible
					method for analyzing Twitter accounts - making it an essential tool for anyone looking to explore coordinated disinformation on social media platforms.
				</p>
			</Section>
			<Section alt>
				<Analyze />
			</Section>
			{(resultState.data || resultState.loading) && (
				<Section alt>
					<Results />
				</Section>
			)}
		</Page>
	);
}

export default Home;
