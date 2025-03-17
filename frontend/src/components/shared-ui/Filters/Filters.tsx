import { FC } from "react";
import styles from "./Filters.module.scss";
import Select from "@components/shared-ui/Select/Select";

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
                        className="filter--basic"
                        value={filterState[filter.name] || ""}
                        onChange={(e) => handleFilterChange(filter.name, e.target.value)}
                    />
                );
            case "date_range":
                return (
                    <div key={index} className={styles['date-filter']}>
                        <input
                            type="date"
                            className="filter--date"
                            value={filterState[filter.name]?.start || ""}
                            onChange={(e) => handleFilterChange(filter.name, e.target.value, true, "start")}
                        />
                        <input
                            type="date"
                            className="filter--date"
                            value={filterState[filter.name]?.end || ""}
                            onChange={(e) => handleFilterChange(filter.name, e.target.value, true, "end")}
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
