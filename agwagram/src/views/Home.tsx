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
					quantitatively describing the behavior of <i>Twitter</i> (known now as <i>X</i>) accounts. With the global rise of misinformation, it offers a unique solution to track shifts in
					behavior, powered by the novel BLOC language algorithm, and identify potential bot accounts with ease. Capable of detecting a broad range of legitimate and suspicious behaviors, as
					well as accounts which display both, Agwagram offers a flexible and generalizable method for analyzing Twitter accounts - making it an essential tool for anyone looking to study
					and detect coordinated disinformation on social media platforms.
				</p>
			</Section>
			<Section alt>
				<Analyze />
			</Section>
			{(resultState.data || resultState.loading) && (
				<Section>
					<Results />
				</Section>
			)}
			<Section alt>
				<h2>Methodology</h2>
				<p>
					Agwagram is built on top of BLOC, or Behavioral Language for Online Classification, a language that represents social media account behaviors, including both benign and malicious
					ones. It is not limited to human behavior, but can also capture the behaviors of cyborgs and bots. BLOC represents online activities as BLOC words, consisting of symbols drawn from
					different alphabets to indicate the temporality of actions or forms of content.
				</p>
				<p>
					The BLOC language is flexible and generalizable, and can be used to detect suspicious behaviors without requiring specific fine-tuning. This is in contrast to other methods that
					rely on features designed to target specific types of malicious behaviors, which may not generalize well to other types. BLOC can represent a broad range of legitimate and
					suspicious behaviors, making it a versatile tool for studying and detecting social media account behaviors.
				</p>
				<p>
					BLOC outperforms previous state-of-the-art methods for detecting bot coordinated behavior in terms of efficiency and accuracy, while using significantly fewer features. For more
					information, please see the BLOC paper: <a href="https://arxiv.org/abs/2211.00639">A General Language for Modeling Social Media Account Behavior</a> as well as the{' '}
					<a href="https://github.com/anwala/bloc">BLOC Project GitHub.</a>
				</p>
			</Section>
		</Page>
	);
}

export default Home;
