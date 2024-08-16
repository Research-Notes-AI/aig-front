// import { Module } from 'vuex';
// import { RootState } from '../index';
// import axiosInstance from '@/services/axiosConfig';

// export interface TasksState {
//   taskResult: any | null;
// }

// const state: TasksState = {
//   taskResult: null,
// };

// const tasks: Module<TasksState, RootState> = {
//   state,
//   mutations: {
//     setTaskResult(state, result: any) {
//       state.taskResult = result;
//     },
//   },
//   actions: {
//     async fetchTaskResult({ commit }, taskId: string) {
//       try {
//         const response = await axiosInstance.get(`/task/${taskId}`);
//         const result = await response.data;
//         commit('setTaskResult', result);
//       } catch (error) {
//         console.error('Failed to fetch task result:', error);
//       }
//     },
//   },
//   getters: {
//     taskResult: (state) => state.taskResult,
//   },
// };

// export default tasks;

  