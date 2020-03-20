import {
  ADD_PROJECT, FILTER_PROJECT,
  LOAD_CURRENT_PROJECT,
  ADD_PROJECT_BEGIN, EDIT_PROJECT_DEVELOPERS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT, FIND_PROJECT,
  ADD_RPOJECT_ERROR, LOAD_RPOJECT,
  LOAD_RPOJECT_SUCCESS, LOAD_RPOJECT_ERROR,
  CURRENT_PROJECT, LOAD_CURRENT_PROJECT_SUCCESS,
  EDIT_PROJECT, EDIT_PROJECT_ERROR,
  FILTER_PROJECT_NAME,
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
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_BEGIN:
      return {
        ...state,
        addingProject: true,
      };
    case ADD_PROJECT:

      return {
        ...state,
        projects: [...state.projects, action.payload],
        filteredProjects: [...state.projects, action.payload],
        addingProject: false,
      };
    case ADD_RPOJECT_ERROR:
      return {
        ...state,
        addingProject: false,
        addingProjectError: action.payload,
      };
    case LOAD_RPOJECT:
      return {
        ...state,
        loadingProjects: true,
      };
    case LOAD_RPOJECT_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        filteredProjects: action.payload,
        loadingProjects: false,
      };
    case LOAD_RPOJECT_ERROR:
      return {
        ...state,
        addingProject: false,
        loadingProjectsError: action.payload,
      };
    case FIND_PROJECT:
      return {
        ...state,
        currentProject: state.projects.find((p) => p._id === action.payload),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((p) => p._id !== action.payload),
        filteredProjects: state.projects.filter((p) => p._id !== action.payload),
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        deleteProjecError: action.payload,
      };
    case EDIT_PROJECT:
      let proj = state.filteredProjects;
      let ProjectIndex = proj.findIndex((p) => p._id === action.payload._id);
      delete proj[ProjectIndex];
      proj[ProjectIndex] = action.payload
      return {
        ...state,
        projects: [...proj],
        filteredProjects: [...proj],
        currentProject: action.payload,
      };
    case EDIT_PROJECT_DEVELOPERS:
      let allProj = state.filteredProjects;
      let  changedProjectIndex = allProj.findIndex((p) => p._id === action.payload._id);

      delete allProj[changedProjectIndex];
      allProj[changedProjectIndex] = action.payload
      return {
        ...state,
        projects: [...allProj],
        filteredProjects: [...allProj],
        // currentProject: action.payload,
      };
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        currentProject: action.payload,
      };
    case LOAD_CURRENT_PROJECT:
      return {

        loadingCurrentProjects: true,
      };
    case CURRENT_PROJECT:
      return {
        ...state,
        currentProject: action.payload,
        loadingCurrentProjects: false,
      };
    case LOAD_CURRENT_PROJECT_SUCCESS:
      return {
        ...state,
        currentProject: action.payload,
        loadingCurrentProjects: false,
      }
    case FILTER_PROJECT_NAME:
      return {
        ...state,
        filteredProjects: state.projects.filter((p) => p.name.toLowerCase().includes(action.payload.toLowerCase()))
      }

    case FILTER_PROJECT:
      return {
        ...state,
        filteredProjects: action.payload.length > 0 ? state.projects.filter((p) => action.payload.includes(p.status)
          || action.payload.includes(p.duration)
          || p.stack.some(r => action.payload.includes(r.tech))) : state.projects,
      }

    default:
      return state;
  }
};

export default projectReducer;
