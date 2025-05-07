import { supabase } from '../../supabase-client';
import { AddStudentInformation, GetStudentResponse, IFilters, UpdateStudentInformation } from '../types';
import dayjs from 'dayjs';



export interface GetStudentResponseWithCount {
    students: GetStudentResponse[];
    count: number;
}

export const getStudents = async (nb_per_page: number = 1000, page_number: number = 0, filters: IFilters, searchValue: string | null): Promise<GetStudentResponseWithCount> => {
    const query = supabase
  .from('students')
        .select('*', { count: 'exact' })
    if (filters.phoneMin) {
        query.gte('phone_number', filters.phoneMin);
    }
    if (filters.phoneMax) {
        query.lte('phone_number', filters.phoneMax);
    }
    if (filters.region) {
        query.eq('region', filters.region);
    }
    if (filters.courses) {
        query.contains('courses_enrolled', filters.courses);
    }
    if (filters.createdAt && filters.createdAt.length === 2) {
        query.gte('created_at', dayjs(filters.createdAt[0]).format('YYYY-MM-DD'));
        const endDate = dayjs(filters.createdAt[1]).add(1, 'day').format('YYYY-MM-DD');
        query.lt('created_at', endDate);
    }
    if (searchValue) {
        query.ilike('name', `%${searchValue}%`);
    }
    query.range(page_number * nb_per_page, (page_number + 1) * nb_per_page - 1).order('created_at', { ascending: false });
    const { data: students, error, count } = await query;

    
    if (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
    return { students, count: count ?? 0 };
}

export const addStudent  = async (student: AddStudentInformation) => {
    const { data, error } = await supabase
        .from('students')
        .insert([
            {
                name: student.name,
                phone_number: student.phoneNumber,
                region: student.region,
                avatar: student.avatar,
                courses_enrolled: student.coursesEnrolled,
                email: student.email
            }
        ]);
    if (error) {
        console.error('Error adding student:', error);
        throw error;
    }
    return data;
}

export const updateStudent = async (student: UpdateStudentInformation) => {
    console.log('student', student);
    const {id } = student;
    const { data, error } = await supabase
        .from('students')
        .update({
            name: student.name,
            phone_number: student.phoneNumber,
            region: student.region,
            avatar: student.avatar,
            courses_enrolled: student.coursesEnrolled,
            email: student.email
        })
        .eq('id', id);
    if (error) {
        console.error('Error updating student:', error);
        throw error;
    }
    return data;
}

export const deleteStudent = async (id: number) => {
    const { data, error } = await supabase.from('students').delete().eq('id', id);
    if (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
    return data;
}