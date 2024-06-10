import { Page, Section } from '@imacdonald/phantom';

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
					agwagram utilizes the Behavioral Language for Online Classification (BLOC) language framework. a language that represents social media account behaviors, including both benign and malicious
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
				<br />
				
                <h2>Publications</h2>
				
                <h6>A language framework for modeling social media account behavior</h6>
                <p>Alexander C. Nwala, Alessandro Flammini, and Filippo Menczer</p><br />
                <a href="https://doi.org/10.1140/epjds/s13688-023-00410-9">EPJ Data Science</a><br />

				<h2>Frequently Asked Questions</h2>
				<h6>Who is behind agwagram and how can I contact them?</h6><br />
                <p></p>

			</Section>
		</Page>
	);
}

export default About;
