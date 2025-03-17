interface Option {
    value: string;
    label: string;
}

interface Filter {
    type: "select" | "search" | "date_range";
    name: string;
    placeholder: string;
    options?: Option[];
}

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    description_long: string;
    type: string;
    created_at: string;
    updated_at: string;
    start_date: string;
    end_date: string;
    technologies: string[];
}