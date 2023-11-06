import React from 'react';
import style from './Toggle.module.scss';

interface ToggleProps {
    state: boolean;
    onChange?: () => void; 
}

const Toggle: React.FC<ToggleProps> = ({ state, onChange = () => {} }: ToggleProps) => {
    return (
        <label className={style.toggle}>
            <input type="checkbox"onChange={onChange} checked={state} />
            <span></span>
        </label>
    );

}

export default Toggle;