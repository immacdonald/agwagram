import { FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormInput, Modal, Switch, Typography } from 'phantom-library';
import { selectConfig, setConfig } from '@data/settingsSlice';
import styles from './Analysis.module.scss';

const AnalysisConfig: FC = () => {
    const configState = useSelector(selectConfig);
    const dispatch = useDispatch();

    return (
        <Modal header="Analysis Settings" reject={null}>
            <div className={styles.config}>
                <Typography.Text>
                    Generate Change Reports{' '}
                    <Switch defaultChecked={!!configState.changeReports} onChange={(event: FormEvent<HTMLInputElement>) => dispatch(setConfig({ changeReports: event.currentTarget.checked }))} />
                </Typography.Text>
                <Typography.Text>
                    Expert Mode <Switch defaultChecked={!!configState.expertMode} onChange={(event: FormEvent<HTMLInputElement>) => dispatch(setConfig({ expertMode: event.currentTarget.checked }))} />
                </Typography.Text>
                <FormInput
                    type="number"
                    name="sumgramLimit"
                    label="Sumgram Tweet Limit"
                    defaultValue={configState.sumgramLimit}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch(setConfig({ sumgramLimit: Number(event.target.value) }))}
                />
            </div>
        </Modal>
    );
};

export { AnalysisConfig };
