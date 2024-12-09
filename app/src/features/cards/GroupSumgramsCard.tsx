import { FC, Fragment, useState } from 'react';
import { BarChartIcon, Dropdown, Popover, Typography } from 'phantom-library';
import { HighlightedText } from '@components';
import { Card } from '@components';
import style from './SumgramsCard.module.scss';

interface GroupSumgramsCardProps {
    title: string;
    subtitle?: string;
    accounts: AccountBloc[];
}

const GroupSumgramsCard: FC<GroupSumgramsCardProps> = ({ title, subtitle, accounts }) => {
    const sumgramOptions = [...Array(3)].map((_, i) => ({ label: `n = ${i}`, value: i }));

    const defaultSumgram = sumgramOptions.length > 1 ? 1 : 0;
    const [sumgramIndex, setSumgramIndex] = useState<number>(defaultSumgram);

    const allTopWordsLengths = accounts.flatMap((account) => account.sumgrams.map((sumgram) => sumgram.top_sumgrams.length));

    // Step 2: Find the maximum length
    const maxTopWordsLength = Math.max(...allTopWordsLengths);

    return (
        <Card fullHeight>
            <Card.Header title={title} subtitle={subtitle} Icon={BarChartIcon} />
            <Card.Body scrollable>
                {sumgramOptions.length > 0 ? (
                    <>
                        <Dropdown
                            options={sumgramOptions}
                            onChange={(selected) => setSumgramIndex(typeof selected == 'number' ? selected : 1)}
                            placeholder="n = "
                            defaultValue={sumgramOptions[defaultSumgram].value}
                        />
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Rank</th>
                                    {accounts.map((account: AccountBloc) => {
                                        return <th key={account.account_username}>@{account.account_username}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(maxTopWordsLength)].map((_, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}.</td>
                                            {accounts.map((account: AccountBloc) => {
                                                if (!account.sumgrams[sumgramIndex] || index >= account.sumgrams[sumgramIndex].top_sumgrams.length) {
                                                    return <td key={account.account_username} />;
                                                }

                                                const sumgram = account.sumgrams[sumgramIndex].top_sumgrams[index];
                                                return (
                                                    <td key={account.account_username}>
                                                        {sumgram.parent_sentences.length > 0 ? (
                                                            <Popover
                                                                customStyle={style.popover}
                                                                anchorClass={style.popoverAnchor}
                                                                content={
                                                                    <div className={style.content}>
                                                                        {sumgram.parent_sentences.map((sentence, index: number) => {
                                                                            return (
                                                                                <Fragment key={index}>
                                                                                    <HighlightedText text={sentence.sentence} matches={sumgram.partial_sumgrams} />
                                                                                    <br />
                                                                                    <br />
                                                                                </Fragment>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                }
                                                                direction="right"
                                                            >
                                                                {sumgram.ngram}
                                                            </Popover>
                                                        ) : (
                                                            <Popover anchorClass={style.popoverAnchor} content="No sentences found" direction="right">
                                                                {sumgram.ngram}
                                                            </Popover>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <Typography.Paragraph>Unable to calculate sumgrams for this account.</Typography.Paragraph>
                )}
            </Card.Body>
        </Card>
    );
};

export { GroupSumgramsCard };
