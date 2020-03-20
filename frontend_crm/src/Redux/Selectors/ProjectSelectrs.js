import { createSelector } from 'reselect';
import { getProject } from '../Actions/ProjectsActions/ProjectActions';

const getProjects = (state) => state.projects.projects;
const getProjectName = (state) => state.projects.filters.name;

const getProjectByName = createSelector(
    getProjects,
    getProjectName,
    (projects, projectName) = projects.filter((projects) => (
        project.name && project.name.toLowerCase().includes(projectName.toLowerCase)
    ))
)

const getFilteredProjects = createSelector(
    getProjectByName,
    (projects, usersByName) => projects.filter((project) => (
        projectByName.includes(project)
    ))
)

export default getFilteredProjects;