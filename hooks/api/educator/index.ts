"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { INFTDetailParams, INftList } from "../interfaces";
import { NftData, NftDataListResponse, NftDetailResponse } from "@/lib/types";
import axios from "axios";

export const useMyCourseList = (params: any) => {
  return useQuery({
    queryKey: ["course-index", params.created_by],
    queryFn: () => axios.post("/api/course/index", params),
  });
};

export const useCourseDetail = (courseId: any) => {
  return useQuery({
    queryKey: ["course-detail", courseId],
    queryFn: () => axios.post(`/api/course/fetch/${courseId}`),
  });
};

export const useUpdateCourse = (courseId: any, params: any) => {
  return useMutation({
    mutationFn: (params: any) =>
      axios.post(`/api/course/update/${courseId}`, params),
  });
};

export const useSectionList = (params: any) => {
  return useQuery({
    queryKey: ["section-index", params.course_uuid],
    queryFn: () => axios.post("/api/section/index", params),
  });
};

export const useSectionDetail = (sectionId: any) => {
  return useQuery({
    queryKey: ["section-detail", sectionId],
    queryFn: () => axios.post(`/api/section/fetch/${sectionId}`),
  });
};

export const useUpdateSection = (sectionId: any, params: any) => {
  return useMutation({
    mutationFn: (params: any) =>
      axios.post(`/api/section/update/${sectionId}`, params),
  });
};

export const useLessonList = (params: any) => {
  return useQuery({
    queryKey: ["lesson-index", params.section_uuid],
    queryFn: () => axios.post("/api/lesson/index", params),
  });
};

export const useLessonDetail = (lessonId: any) => {
  return useQuery({
    queryKey: ["lesson-detail", lessonId],
    queryFn: () => axios.post(`/api/lesson/fetch/${lessonId}`),
  });
};

export const useUpdateLesson = (lessonId: any, params: any) => {
  return useMutation({
    mutationFn: (params: any) =>
      axios.post(`/api/lesson/update/${lessonId}`, params),
  });
};

export const useFileList = (params: any) => {
  return useQuery({
    queryKey: ["file-index"],
    queryFn: () => axios.post("/api/file/index", params),
  });
};

export const useFileDetail = (fileId: any) => {
  return useQuery({
    queryKey: ["file-detail", fileId],
    queryFn: () => axios.post(`/api/file/fetch/${fileId}`),
  });
};

export const useUpdateFile = (fileId: any, params: any) => {
  return useMutation({
    mutationFn: (params: any) =>
      axios.post(`/api/file/update/${fileId}`, params),
  });
};
