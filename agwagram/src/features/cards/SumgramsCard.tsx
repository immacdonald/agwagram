import { FC, Fragment, useState } from 'react';
import { BarChartIcon, Dropdown, decimalPlaces, Popover, Typography } from 'phantom-library';
import { HighlightedText } from '@components';
import { Card } from '@components';
import style from './SumgramsCard.module.scss';

interface SumgramsCardProps {
    title: string;
    subtitle?: string;
    sumgrams: Sumgrams[];
}

const SumgramsCard: FC<SumgramsCardProps> = ({ title, subtitle, sumgrams }) => {
    const sumgramOptions = sumgrams.map((sumgram: Sumgrams, index: number) => {
        return {
            label: `n = ${sumgram.base_ngram}`,
            value: index
        };
    });

    const defaultSumgram = sumgramOptions.length > 1 ? 1 : 0;
    const [sumgramIndex, setSumgramIndex] = useState<number>(defaultSumgram);

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
                                    <th>sumgram</th>
                                    <th style={{ width: '100px' }}>Frequency</th>
                                    <th style={{ width: '85px' }}>Rate (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sumgrams[sumgramIndex].top_sumgrams.map((sumgram: Sumgram, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}.</td>
                                            <td>
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
                                            <td>{sumgram.term_freq}</td>
                                            <td>{decimalPlaces(sumgram.term_rate * 100, 1)}</td>
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

export { SumgramsCard };
