import { FC } from "react";
import styles from "./Filters.module.scss";
import { Select } from "@shared-ui";
import DatePicker from "react-datepicker";
// @ts-ignore
import "react-datepicker/dist/react-datepicker.css";
import { mergeClassNames } from "@/helpers";

interface FiltersProps {
    setFilter: (filter: any) => void;
    filterState: any;
    filters: Filter[];
}

const Filters: FC<FiltersProps> = ({ setFilter, filterState, filters }) => {
    const handleFilterChange = (name: string, value: string, isRange?: boolean, rangeKey?: "start" | "end") => {
        if (isRange && rangeKey) {
            setFilter({
                ...filterState,
                [name]: { ...filterState[name], [rangeKey]: value },
            });
        } else {
            setFilter({ ...filterState, [name]: value });
        }
    };

    const filterUI = filters.map((filter, index) => {
        switch (filter.type) {
            case "select":
                return (
                    <Select
                        placeholder={filter.placeholder}
                        key={index}
                        value={filterState[filter.name] || ""}
                        onChange={(value) => handleFilterChange(filter.name, value)}
                        options={filter.options ?? []}
                    />
                );
            case "search":
                return (
                    <input
                        key={index}
                        type="text"
                        placeholder={filter.placeholder}
                        className={mergeClassNames(styles['filter'], styles['filter--basic'])}
                        value={filterState[filter.name] || ""}
                        onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                    />
                );
            case "date_range":
                return (
                    <div key={index} className={styles['date-filter']}>
                            <DatePicker
                                selected={filterState[filter.name]?.start ? new Date(filterState[filter.name].start) : undefined}
                                onChange={(date) => handleFilterChange(filter.name, date?.toISOString().split('T')[0] || "", true, "start")}
                                selectsStart
                                startDate={filterState[filter.name]?.start ? new Date(filterState[filter.name].start) : undefined}
                                endDate={filterState[filter.name]?.end ? new Date(filterState[filter.name].end) : undefined}
                                placeholderText="Start date"
                                className={mergeClassNames(styles['filter'], styles['filter--date'], styles['filter--date__start'])}
                                dateFormat="yyyy-MM-dd"
                            />
                            <DatePicker
                                selected={filterState[filter.name]?.end ? new Date(filterState[filter.name].end) : undefined}
                                onChange={(date) => handleFilterChange(filter.name, date?.toISOString().split('T')[0] || "", true, "end")}
                                selectsEnd
                                startDate={filterState[filter.name]?.start ? new Date(filterState[filter.name].start) : undefined}
                                endDate={filterState[filter.name]?.end ? new Date(filterState[filter.name].end) : undefined}
                                minDate={filterState[filter.name]?.start ? new Date(filterState[filter.name].start) : undefined}
                                placeholderText="End date"
                                className={mergeClassNames(styles['filter'], styles['filter--date'], styles['filter--date__end'])}
                                dateFormat="yyyy-MM-dd"
                            />
                    </div>
                );
            default:
                throw new Error("Invalid filter type");
        }
    });

    return <div className={styles.filters}>{filterUI}</div>;
};

export default Filters;
