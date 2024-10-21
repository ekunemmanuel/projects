export interface Note {
    id?: string,
    title: string
    description: string
    createdAt?: string
    updatedAt?: string
}

export interface GithubStatus {
    page:       Page;
    components: Component[];
}

export interface Component {
    id:                    string;
    name:                  string;
    status:                Status;
    created_at:            Date;
    updated_at:            Date;
    position:              number;
    description:           null | string;
    showcase:              boolean;
    start_date:            Date | null;
    group_id:              null;
    page_id:               ID;
    group:                 boolean;
    only_show_if_degraded: boolean;
}

export enum ID {
    Kctbh9Vrtdwd = "kctbh9vrtdwd",
}

export enum Status {
    Operational = "operational",
}

export interface Page {
    id:         ID;
    name:       string;
    url:        string;
    time_zone:  string;
    updated_at: Date;
}
