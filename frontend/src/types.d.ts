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

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
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
    links?: Link[];
}

export interface CareerEvent {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    description_long: string;
    type: 'EDUCATION' | 'PROFESSIONAL';
    start_date: string;
    end_date?: string;
    date: string;
    created_at: string;
    updated_at: string;
    blocks: Block[];
    files?: File[];
    icon?: string;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    published_at?: string;
    project_slug: string;
    blocks?: Block[];
    previous_post?: {
        title: string;
        slug: string;
    } | null;
    next_post?: {
        title: string;
        slug: string;
    } | null;
}

export interface Block {
    id: number;
    type: string;
    content: any;
    order: number;
    created_at: string;
    updated_at: string;
    eyebrow?: string;
    text?: string;
    image?: string;
    image_position?: string;
    image_alt?: string;
    url?: string;
    set?: string[];
    pills?: string[];
    projects?: Project[];
    posts?: Post[];
    project_slug?: string;
    images?: string[];
}

interface Image {
    image_url: string;
    alt: string;
    description?: string;
}

export interface File {
    id: number;
    name: string;
    machine_name: string;
    url: string;
}

export interface Link {
    id: number;
    name: string;
    link: string;
}

export interface Event {
    id: number;
    title: string;
    slug: string;
    description: string;
    date: string;
    created_at: string;
    updated_at: string;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const content: { [key: string]: string };
    export default content;
}