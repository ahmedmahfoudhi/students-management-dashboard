import { TableProps } from "antd";
import { Dayjs } from "dayjs";
import { ComponentType } from "react";
export interface IFilters{
    phoneMin: number | null;
    phoneMax: number | null;
    region: string | null;
    courses: string[] | null;
    createdAt:
      | [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
      | null;
}

export interface GetStudentResponse {
    id: number;
    name?: string;
    phone_number?: number;
    region?: string;
    avatar?: string;
    invite_code?: string;
    courses_enrolled?: string[];
    created_at: string;
    email?: string;
}

export interface AddStudentInformation {
    name: string;
    phoneNumber: number;
    region: string;
    avatar: string | null;
    coursesEnrolled?: string[];
    email: string;
    inviteCode?: string;
}

export interface UpdateStudentInformation extends AddStudentInformation {
    id: number;
}

export interface StudentUIData {
    id: number;
    key: number;
    name?: string;
    phoneNumber?: number;
    region?: string;
    avatar?: string;
    inviteCode?: string;
    coursesEnrolled: string[];
    createdAt: string;
    email?: string;
  }

export type TColumns = TableProps<StudentUIData>["columns"]


export interface ColumnBtnProps {
    columns: TColumns;
    toggleColumnVisibility: (key: string) => void;
}
  
export interface EditDrawerProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (isOpen: boolean) => void;
    studentInformation: UpdateStudentInformation;
}


export interface GuardProps {
  children: React.ReactNode;
}

export interface RouteType {
    path: string;
    element: ComponentType;
    guard?: ComponentType<GuardProps>;
    layout?: ComponentType<GuardProps>;
  }