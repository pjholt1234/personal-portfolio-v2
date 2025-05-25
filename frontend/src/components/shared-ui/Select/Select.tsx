import { FC, useState, useRef, useLayoutEffect } from 'react';
import styles from './Select.module.scss';
import { mergeClassNames } from "@helpers";
import { createPortal } from 'react-dom';

interface SelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

const Select: FC<SelectProps> = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>(value);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const selectRef = useRef<HTMLDivElement>(null);

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

    useLayoutEffect(() => {
        if (isOpen && selectRef.current) {
            const rect = selectRef.current.getBoundingClientRect();
            setDropdownStyle({
                position: 'absolute',
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                minWidth: rect.width,
                maxWidth: rect.width,
                zIndex: 9999
            });
        }
    }, [isOpen]);

    return (
        <div ref={selectRef} className={mergeClassNames('filter--basic', styles.select)} onClick={toggleDropdown}>
            {!selectedOption && <div className={styles['placeholder']}>{placeholder}</div>}
            <div className={styles['select__container']}>
                <div>
                    {getFormattedOption(selectedOption)}
                </div>
            </div>
            {isOpen && createPortal(
                <div className={styles['dropdown']} style={dropdownStyle}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={styles['dropdown__option']}
                            onClick={(event) => handleOptionClick(option.value, event)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default Select;