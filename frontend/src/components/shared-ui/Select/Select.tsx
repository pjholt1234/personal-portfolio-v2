import { FC, useState } from 'react';
import styles from './Select.module.scss';
import { mergeClassNames } from "@helpers";

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const Select: FC<SelectProps> = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(value);

    const getFormattedOption = (value: string) => {
        if(!value || value === 'All') return;

        return options.find((option) => option.value === value)?.label;
    }

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option: string, event: any) => {
        event.stopPropagation();
        setSelectedOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={mergeClassNames('filter--basic', styles.select)} onClick={toggleDropdown}>
            {!selectedOption && <div className={styles['placeholder']}>{placeholder}</div>}
            <div className={styles['select__container']}>
                <div>
                    {getFormattedOption(selectedOption)}
                </div>
            </div>
            {isOpen && (
                <div className={styles['dropdown']}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles['dropdown__option']}
                            onClick={(event) => handleOptionClick(option.value, event)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;