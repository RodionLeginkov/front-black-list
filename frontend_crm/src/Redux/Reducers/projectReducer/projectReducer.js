import produce from 'immer';
import {
  ADD_PROJECT, FILTER_PROJECT,
  LOAD_CURRENT_PROJECT,
  ADD_PROJECT_BEGIN, EDIT_PROJECT_DEVELOPERS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT, FIND_PROJECT,
  ADD_RPOJECT_ERROR, LOAD_RPOJECT,
  LOAD_RPOJECT_SUCCESS, LOAD_PROJECT_ERROR,
  CURRENT_PROJECT, LOAD_CURRENT_PROJECT_SUCCESS,
  EDIT_PROJECT, EDIT_PROJECT_ERROR,
  FILTER_PROJECT_NAME,
  FILTER_PROJECT_STACK,
  FILTER_PROJECT_DURATION,
  FILTER_PROJECT_STATUS,
  FILTER_PROJECT_PAYMENT_TYPE,
  FILTER_PROJECT_MESSENGER,
  FILTER_PROJECT_FORMAT_OF_COMUNICATUIN
} from '../../ActionTypes/projectsTypes/projectsTypes';

const initialState = {
  filteredProjects: [],
  projects: [],
  addingProject: false,
  addingProjectError: null,
  loadingProjects: false,
  loadingProjectsError: null,
  loadingCurrentProjects: false,
  editedProject: null,
  currentProject: null,
  deleteProjecError: false,
  patchProjecError: false,
  loadingCurrentUser: false,
  filters: {
    name: '',
    stack: ['all'],
    status: ['all'],
    duration: ['all'],
    paymentType: ['all'],
    messenger: ['all'],
    communication: ['all'],
  }
};

const projectReducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_PROJECT_BEGIN:
      draft.addingProject = true;
      return draft;

    case ADD_PROJECT:
      draft.projects = [...draft.projects, action.payload];
      draft.filteredProjects = [...draft.projects, action.payload];
      draft.addingProject = false;
      return draft;

    case ADD_RPOJECT_ERROR:
      draft.addingProject = false;
      draft.addingProjectError = action.payload
      return draft;

    case LOAD_RPOJECT:
      draft.loadingProjects = true;
      return draft;

    case LOAD_RPOJECT_SUCCESS:
      draft.projects = action.payload;
      draft.filteredProjects = action.payload;
      draft.loadingProjects = false;
      return draft;

    case LOAD_PROJECT_ERROR:
      draft.loadingProjectsError = true;
      return draft;

    case FIND_PROJECT:
      draft.currentProject = draft.projects.find((p) => p._id === action.payload);
      return draft;

    case DELETE_PROJECT:
      draft.projects = draft.projects.filter((p) => p._id !== action.payload)
      draft.filteredProjects = draft.filteredProjects.filter((p) => p._id !== action.payload)
      return draft;

    case DELETE_PROJECT_ERROR:
      draft.deleteProjecError = action.payload;
      return draft;

    case EDIT_PROJECT:
      let proj = draft.filteredProjects;
      let ProjectIndex = proj.findIndex((p) => p._id === action.payload._id);
      delete proj[ProjectIndex];
      proj[ProjectIndex] = action.payload
      draft.projects = proj;
      draft.filteredProjects = proj;
      draft.currentProject = action.payload
      return draft;

    case EDIT_PROJECT_DEVELOPERS:
      let allProj = draft.filteredProjects;
      let changedProjectIndex = allProj.findIndex((p) => p._id === action.payload._id);
      delete allProj[changedProjectIndex];
      allProj[changedProjectIndex] = action.payload
      draft.projects = allProj;
      draft.filteredProjects = allProj;
      return draft;

    case EDIT_PROJECT_ERROR:
      draft.currentProject = action.payload;
      return draft;

    case LOAD_CURRENT_PROJECT:
      draft.loadingCurrentProjects = true;
      return draft;

    case CURRENT_PROJECT:
      draft.currentProject = action.payload;
      draft.loadingCurrentProjects = false;
      return draft;

    case LOAD_CURRENT_PROJECT_SUCCESS:
      draft.currentProject = action.payload;
      draft.loadingCurrentProjects = false;
      return draft;

    case FILTER_PROJECT_NAME:
      draft.filters.name = action.payload;
      return draft

    case FILTER_PROJECT_STACK:
      draft.filters.stack = action.payload;
      return draft;

    case FILTER_PROJECT_STATUS:
      draft.filters.status = action.payload;
      return draft;

    case FILTER_PROJECT_DURATION:
      draft.filters.duration = action.payload;
      return draft;

    case FILTER_PROJECT_PAYMENT_TYPE:
      draft.filters.paymentType = action.payload;
      return draft;
    case FILTER_PROJECT_MESSENGER:
      draft.filters.messenger = action.payload;
      return draft;
    case FILTER_PROJECT_FORMAT_OF_COMUNICATUIN:
      draft.filters.communication = action.payload;
      return draft;
    default:
      return draft;
  }
}, initialState);

export default projectReducer;
