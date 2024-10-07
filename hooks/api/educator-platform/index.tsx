"use client";

import axios from "axios";
import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { v4 as uuidv4 } from 'uuid';

import { 
    IUpdateCourseParams, 
    IFetchCourseParams, 
    ICourseIndexParams,

    IUpdateSectionParams, 
    IFetchSectionParams,
    ISectionIndexParams,

    IUpdateLessonsParams,
    IFetchLessonsParams,
    ILessonsIndexParams,

    IUpdateFilesParams, 
    IFetchFilesParams,
    IFilesIndexParams,
} from "../interfaces";

import { useAppProvider } from "@/providers/app-provider";
import { educatorPlatformHeader } from "@/app/api/utils";

export const useCreateCourse = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (data: Omit<IUpdateCourseParams, 'uuid'>) => {
            const uuid = uuidv4();
            return axios.post("/api/educator-platform/course_create", { ...data, uuid }, {
                headers: {
                    "x-kf-user-id": address,
                },
            });
        },
    });
};

export const useUpdateCourse = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (params: IUpdateCourseParams) =>
            axios.post(`/api/educator-platform/course_update/${params.uuid}`, params, {
                headers: {
                    "x-kf-user-id": address,
                },
            }),
    });
};

export const useFetchCourse = (uuid: string) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["course", uuid, address],
        queryFn: () => axios.post(`/api/educator-platform/course_fetch/${uuid}`),
    });
};

export const useCourseIndex = (params: ICourseIndexParams) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["courseIndex", params, address],
        queryFn: () => axios.post("/api/educator-platform/course_index", params, {
            headers: {
                "x-kf-user-id": address,
                "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
            },
        }),
    });
};

export const useCreateSection = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (data: Omit<IUpdateSectionParams, 'uuid'>) =>
            axios.post("/api/educator-platform/section_update/", data, {
                headers: {
                    "x-kf-user-id": address,
                    "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
                },
            }),
    });
};

export const useUpdateSection = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (params: IUpdateSectionParams) =>
            axios.post(`/api/educator-platform/section_update/${params.uuid}`, params, {
                headers: {
                    "x-kf-user-id": address,
                    "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
                },
            }),
    });
};

export const useFetchSection = (uuid: string) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["section", uuid, address],
        queryFn: () => axios.post(`/api/educator-platform/section_fetch/${uuid}`, null, {
            headers: {
                "x-kf-user-id": address,
                "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
            },
        }),
    });
};

export const useSectionIndex = (params: ISectionIndexParams) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["sectionIndex", params, address],
        queryFn: () => axios.post("/api/educator-platform/section_index", params, {
            headers: {
                "x-kf-user-id": address,
                "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
            },
        }),
    });
};

export const useCreateLesson = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (data: Omit<IUpdateLessonsParams, 'uuid'>) =>
            axios.post("/api/educator-platform/lesson_update/", data, {
                headers: {
                    "x-kf-user-id": address,
                    "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
                },
            }),
    });
};

export const useUpdateLesson = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (params: IUpdateLessonsParams) =>
            axios.post(`/api/educator-platform/lesson_update/${params.uuid}`, params, {
                headers: {
                    "x-kf-user-id": address,
                    "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
                },
            }),
    });
};

export const useFetchLesson = (uuid: string) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["lesson", uuid, address],
        queryFn: () => axios.post(`/api/educator-platform/lesson_fetch/${uuid}`),
    });
};

export const useLessonIndex = (params: ILessonsIndexParams) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["lessonIndex", params, address],
        queryFn: () => axios.post("/api/educator-platform/lesson_index", params, {
            headers: {
                "x-kf-user-id": address,
                "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
            },
        }),
    });
};

export const useCreateFile = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (data: Omit<IUpdateFilesParams, 'uuid'>) => {
            const uuid = uuidv4();
            return axios.post("/api/educator-platform/file_create", { ...data, uuid }, {
                headers: {
                    "x-kf-user-id": address,
                    "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
                },
            });
        },
    });
};

export const useUpdateFile = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (params: IUpdateFilesParams) =>
            axios.post(`/api/educator-platform/file_update/${params.uuid}`, params, {
                headers: {
                    "x-kf-user-id": address,
                    "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
                },
            }),
    });
};

export const useFetchFile = (uuid: string) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["file", uuid, address],
        queryFn: () => axios.post(`/api/educator-platform/file_fetch/${uuid}`),
    });
};

export const useFileIndex = (params: IFilesIndexParams) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["fileIndex", params, address],
        queryFn: () => axios.post("/api/educator-platform/file_index", params, {
            headers: {
                "x-kf-user-id": address,
                "x-api-key": process.env.NEXT_PUBLIC_EDUCATOR_BE_API_KEY,
            },
        }),
    });
};

export const useLanguageIndex = () => {
    return useQuery({
        queryKey: ["languageIndex"],
        queryFn: () => axios.post("/api/educator-platform/language"),
    });
};

export const useCategoryIndex = () => {
    return useQuery({
        queryKey: ["categoryIndex"],
        queryFn: () => axios.post("/api/educator-platform/category"),
    });
};

export const useLevelIndex = () => {
    return useQuery({
        queryKey: ["levelIndex"],
        queryFn: () => axios.post("/api/educator-platform/level"),
    });
};

export const useUpdateProfile = () => {
    const { session: { address } } = useAppProvider();
    
    return useMutation({
        mutationFn: (params: IUpdateLessonsParams) =>
            axios.post(`/api/educator-platform/profile_update/${params.uuid}`, params, {
                headers: {
                    "x-kf-user-id": address,
                },
            }),
    });
};

export const useFetchProfile = (uuid: string) => {
    const { session: { address } } = useAppProvider();
    
    return useQuery({
        queryKey: ["profile", uuid, address],
        queryFn: () => axios.post(`/api/educator-platform/profile_fetch/${uuid}`),
    });
};