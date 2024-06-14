import { Page, Section, StyledImage } from '@imacdonald/phantom';
import { Link } from 'react-router-dom';
import UserBlocImage from '../images/sample_3_user_blocs.png';
import PCAImage from '../images/pca_general.png';

function About() {
	return (
		<Page title="agwagram">
			<Section>
				<h1>About</h1>
				<p>
					agwagram enables you to study a broad spectrum of authentic & inauthentic behaviors of Twitter (aka X) accounts. With agwagram, you can explore the behaviors of news organizations, self-declared bots, trolls, etc. agwagram is a portmanteau of "agwa" (Igbo language for "behavior") and "gram" (Greek language for "a record"). This tool utilizes the BLOC language framework.
				</p>
				<br />
				<h2>Methodology</h2>
				<p>
					<Link to='https://github.com/anwala/bloc'>BLOC</Link> is a language for representing the online behaviors of social media accounts irrespective of class (human or cyborg or bot) or intent (malicious or benign). BLOC words consist of letters drawn from various alphabets (e.g., actions, pause, & content alphabets). The language is highly flexible, and can be applied to model a broad spectrum of legitimate and suspicious online behaviors.
				</p>
				<StyledImage image={UserBlocImage} border caption={<span style={{ opacity: '0.7' }}>Illustrations of BLOC action strings for a human, a cyborg, and a bot Twitter account illustrating some behavioral differences across these individuals. If strings are tokenized using pauses, the human account has the shortest words (average length 1.35 vs. 3.88 for the cyborg and 4.0 for the bot) and is dominated by isolated retweets and replies. The cyborg account — which we created to post threads of news updates — exhibits both human (isolated posts) and bot behavior (thread bursts). The bot account mainly generates retweet bursts.</span>} />
				<p>
					BLOC has been effectively applied for explaining online behaviors, bot and coordination detection, and detecting accounts — controlled by various nation states — engaged in information operations.
				</p>
				<StyledImage image={PCAImage} border caption={<span style={{ opacity: '0.7' }}>2D PCA projections of BLOC TF-IDF vectors of accounts from three <Link to="https://alexandernwala.com/research/" target="_blank" title='datasets'>datasets</Link> that include both humans (blue) and bots (orange) illustrating the discriminative power of BLOC in separating accounts of different classes: (left) <Link to="https://botometer.osome.iu.edu/bot-repository/datasets/cresci-2017/cresci-2017.csv.zip" target="_blank" title="cresci-17">cresci-17</Link> and (right) <Link to="https://botometer.osome.iu.edu/bot-repository/datasets/varol-2017/varol-2017.dat.gz" target="_blank" title="varol-17">varol-17</Link>. The Venn diagrams show the top five pause-delimited BLOC words for the bot and human accounts shown.</span>} />
				<br />

				<h2>Publications</h2>

				<h6>A language framework for modeling social media account behavior</h6>
				<p>Alexander C. Nwala, Alessandro Flammini, and Filippo Menczer</p>
				<p><Link to="https://doi.org/10.1140/epjds/s13688-023-00410-9">EPJ Data Science</Link><br /></p>
				<br />

				<h2>Frequently Asked Questions</h2>
				<h6>Who is behind agwagram and how can I contact them?</h6><br />
				<p></p>

			</Section>
		</Page>
	);
}

export default About;
