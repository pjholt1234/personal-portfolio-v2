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
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    description_long: string;
    type: 'PERSONAL' | 'PROFESSIONAL';
    created_at: string;
    updated_at: string;
    start_date: string;
    end_date: string;
    technologies: string[];
    blocks: Block[];
    github_link: string;
    hidden: boolean;
    files?: File[];
}

interface CareerEvent {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    subtitle: string;
    type: 'EDUCATION' | 'PROFESSIONAL';
    start_date: string;
    end_date?: string;
    description: string;
    description_long?: string;
    icon?: string;
    blocks: Block[];
    files?: File[];
}

interface Block {
    eyebrow: ?string;
    type: string;
}

interface Image {
    image_url: string;
    alt: string;
    description?: string;
}

interface File {
    name: string;
    machine_name: string;
    url: string;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}