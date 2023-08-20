import { FC, ReactNode } from "react";

export interface IRoutes {
    path: string;
    component: FC;
}

export interface IIputData {
    key: any;
    field: 'text' | 'select';
    options: readonly any[];
    defaultValue?: string;
    helperText?: ReactNode;
    type?: React.HTMLInputTypeAttribute;
    label?: string;
    placeholder?: string;
    autoComplete?: string;
}

export interface ILoginInputs {
    login: string;
    password: string;
}

export interface ICreateInputs {
    username: string;
    position: string;
    POLUCHKA: number;
    birthday: string;
    date_of_hiring: string;
    role: string;
}

export interface IConfirmInputs {
    login: string;
    password: string;
    confirmPassword: string;
}


export type TablsType = IWorkerTable | IHRTable;

export interface IWorkerTable {
    id: number;
    username: ReactNode;
    position: ReactNode;
    birthday: ReactNode;
    date_of_hiring: ReactNode;
}

export interface IHRTable {
    id: number;
    login: string;
    username: string;
    position: string;
    POLUCHKA: number;
    birthday: string;
    date_of_hiring: string;
    role: string;
    isWorking: boolean;
    availableLink: string;
    isAvailable: boolean;
}