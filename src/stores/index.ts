// // store/index.ts
// import { createStore } from 'vuex'
// import axiosInstance from '@/services/axiosConfig';

// interface State {
//   previewData: PreviewData | null;
//   taskStatus: string | null;
// }

// interface PreviewData {
//   title: string;
//   description: string;
//   imageUrl: string;
// }

// export default createStore<State>({
//   state: {
//     previewData: null,
//     taskStatus: null
//   },
//   mutations: {
//     setPreviewData(state, data: PreviewData) {
//       state.previewData = data;
//     },
//     setTaskStatus(state, status: string) {
//       state.taskStatus = status;
//     }
//   },
//   actions: {
//     async fetchPreviewData({ commit }, taskId: string) {
//       try {
//         const response = await fetchTaskData(taskId);
//         commit('setPreviewData', response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     async queryTaskStatus({ commit }) {
//       if (!taskId.value) {
//         const isTaskCreated = await createTask();
//         if (!isTaskCreated) {
//           return false; // 创建任务失败，终止后续操作
//         }
//       }
//       try {
//         if (taskId.value) {
//           const params = {
//             task_id: taskId.value // 替换为任务Id
//           };
//           const response = await  axiosInstance.get(`/task/${params.task_id}`);
//           const status = response.data.data.status; // 替换为实际的任务状态查询接口
//           commit('setTaskStatus', status);
//           return status === 'completed'; // 假设接口返回任务状态，判断是否完成
//         } else {
//           toast.error('任务id获取失败');
//           return false; // 获取任务ID失败
//         }
//       } catch (error) {
//         console.error('Error querying task status:', error);
//         return false; // 查询失败时返回 false
//       }
//     }
//   },
//   getters: {
//     previewData: state => state.previewData,
//     taskStatus: state => state.taskStatus
//   }
// });

// async function fetchTaskData(taskId: string) {
//   // 你的查询任务接口逻辑
//   return {
//     data: {
//       title: 'Example Title',
//       description: 'Example Description',
//       imageUrl: 'http://example.com/image.jpg'
//     }
//   };
// }

// async function createTask() {
//   // 你的创建任务接口逻辑
//   return true;
// }
