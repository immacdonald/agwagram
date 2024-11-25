import { FC } from 'react';
import { PCAImage, userBlocImage } from '@assets/images';
import { Agwagram } from '@features';
import { Heading, Section, StyledImage, StyledLink, Typography } from 'phantom-library';
import { DashboardLayout } from 'src/layouts/DashboardLayout';
import { config } from '@config';

const About: FC = () => {
    return (
        <DashboardLayout>
            <Section style={{ backgroundColor: 'var(--color-background-foreground)' }}>
                <Heading align="center" major>
                    About
                </Heading>
                <Typography.Paragraph>
                    <Agwagram /> enables you to study a broad spectrum of authentic & inauthentic behaviors of Twitter (aka X) accounts. With <Agwagram />, you can explore the behaviors of news
                    organizations, self-declared bots, trolls, etc. <Agwagram /> is a portmanteau of "agwa" (Igbo language for "behavior") and "gram" (Greek language for "a record"). This tool
                    utilizes the BLOC language framework.
                </Typography.Paragraph>
                <Heading minor>Methodology</Heading>
                <Typography.Paragraph>
                    <StyledLink to="https://github.com/anwala/bloc" external>
                        BLOC
                    </StyledLink>{' '}
                    is a language for representing the online behaviors of social media accounts irrespective of class (human or cyborg or bot) or intent (malicious or benign). BLOC words consist of
                    letters drawn from various alphabets (e.g., actions, pauses, & content alphabets). The language is highly flexible, and can be applied to model a broad spectrum of legitimate and
                    suspicious online behaviors.
                </Typography.Paragraph>
                <StyledImage
                    image={userBlocImage}
                    border
                    alt="Illustrations of BLOC action strings for a human, a cyborg, and a bot Twitter account illustrating some behavioral differences across these individuals"
                    caption={
                        <span>
                            Illustrations of BLOC action strings for a human, a cyborg, and a bot Twitter account illustrating some behavioral differences across these individuals. If strings are
                            tokenized using pauses, the human account has the shortest words (average length 1.35 vs. 3.88 for the cyborg and 4.0 for the bot) and is dominated by isolated retweets and
                            replies. The cyborg account — which we created to post threads of news updates — exhibits both human (isolated posts) and bot behavior (thread bursts). The bot account
                            mainly generates retweet bursts.
                        </span>
                    }
                />
                <Typography.Paragraph>
                    BLOC has been effectively applied for explaining online behaviors, bot and coordination detection, and detecting accounts — controlled by various nation states — engaged in
                    information operations.
                </Typography.Paragraph>
                <StyledImage
                    image={PCAImage}
                    border
                    alt="2D PCA projections of BLOC TF-IDF vectors of accounts"
                    caption={
                        <span>
                            2D PCA projections of BLOC TF-IDF vectors of accounts from two datasets that include both humans (blue) and bots (orange) illustrating the discriminative power of BLOC in
                            separating accounts of different classes: (left){' '}
                            <StyledLink to="https://botometer.osome.iu.edu/bot-repository/datasets/cresci-2017/cresci-2017.csv.zip" external title="cresci-17">
                                cresci-17
                            </StyledLink>{' '}
                            and (right){' '}
                            <StyledLink to="https://botometer.osome.iu.edu/bot-repository/datasets/varol-2017/varol-2017.dat.gz" external title="varol-17">
                                varol-17
                            </StyledLink>
                            . The Venn diagrams show the top five pause-delimited BLOC words for the bot and human accounts shown.
                        </span>
                    }
                />
                <Heading minor>Publications</Heading>
                <Typography.Text newline>A language framework for modeling social media account behavior</Typography.Text>
                <Typography.Text newline>Alexander C. Nwala, Alessandro Flammini, and Filippo Menczer</Typography.Text>
                <Typography.Text newline>
                    <StyledLink to="https://doi.org/10.1140/epjds/s13688-023-00410-9" external>
                        EPJ Data Science
                    </StyledLink>
                </Typography.Text>
                <br />
                <Heading minor>About Us</Heading>
                <Typography.Paragraph>
                    <Agwagram /> is a project of the{' '}
                    <StyledLink to="https://newsresearch.lab.wm.edu" external>
                        News Web and Social Media (NEWS) research lab
                    </StyledLink>{' '}
                    at William & Mary. NEWS Lab studies the web as an entity with a focus on (local) news and vectors of disinformation on social media. <Agwagram /> was developed by{' '}
                    <StyledLink to="https://ianmacdonald.me/" external>
                        Ian MacDonald
                    </StyledLink>{' '}
                    and{' '}
                    <StyledLink to="https://alexandernwala.com/" external>
                        Alexander C. Nwala
                    </StyledLink>{' '}
                    (acnwala [at] wm.edu).
                </Typography.Paragraph>
                <Typography.Text align="center" soft>
                    <Agwagram /> is currently on version {config.version}.
                </Typography.Text>
            </Section>
        </DashboardLayout>
    );
};

export { About };
