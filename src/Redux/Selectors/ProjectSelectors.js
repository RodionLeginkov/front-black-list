import { createSelector } from 'reselect';

const getProjects = (state) => state.projects.projects;
const getProjectName = (state) => state.projects.filters.name;
const getProjectStack = (state) => state.projects.filters.stack;
const getProjectStatus = (state) => state.projects.filters.status;
const getProjectDuration = (state) => state.projects.filters.duration;
const getProjectPaymentType = (state) => state.projects.filters.paymentType;
const getProjectMessenger = (state) => state.projects.filters.messenger;
const getProjectCommunication =(state) => state.projects.filters.communication;


const getProjectsByName = createSelector(
    getProjects,
    getProjectName,
    (projects, projectName) => projects.filter((project) => (
        project.name && project.name.toLowerCase().includes(projectName.toLowerCase()))),
);

const getProjectsByStack = createSelector(
    getProjects,
    getProjectStack,
    (projects, stackFilters) => {
        if (stackFilters.includes('all')) return projects;
        return projects.filter((project) => (
            project.stack && project.stack.some((i) => stackFilters.includes(i.tech))))
    }
)

const getProjectsByStatus = createSelector(
    getProjects,
    getProjectStatus,
    (projects, statusFilters) => {
        if (statusFilters.includes('all')) return projects;
        return projects.filter((project) => (
            project.status && project.status.includes(statusFilters)
        ))
    }
)

const getProjectByDuration = createSelector(
    getProjects,
    getProjectDuration,
    (projects, durationFilters) => {
        if (durationFilters.includes('all')) return projects;
        return projects.filter((project) => (
            project.duration && project.duration.includes(durationFilters)
        ))
    }
)

const getProjectByPaymentType = createSelector(
    getProjects,
    getProjectPaymentType,
    (projects, paymentTypeFilters) => {
        if(paymentTypeFilters.includes('all')) return projects;
        return projects.filter((project) =>(
            project.paymentType && project.paymentType.includes(paymentTypeFilters)
        ))
    }
)

const getProjectByMessenger = createSelector(
    getProjects,
    getProjectMessenger,
    (projects, messengerFilters) => {
        if(messengerFilters.includes('all')) return projects;
        return projects.filter((project) => (
            project.messenger && project.messenger.some((i) => messengerFilters.includes(i.tech))))
    }
)

const getProjectByCommunication = createSelector(
    getProjects,
    getProjectCommunication,
    (projects, communicationFilters) => {
        if(communicationFilters.includes('all')) return projects;
        return projects.filter((project) => {
            return(
            project.communication && project.communication[0].includes(communicationFilters)
        )})
    }
)

const getFilteredProjects = createSelector(
    getProjects,
    getProjectsByName,
    getProjectsByStack,
    getProjectsByStatus,
    getProjectByDuration,
    getProjectByPaymentType,
    getProjectByMessenger,
    getProjectByCommunication,
    (projects, projectsByName, projectsByStack, projectsByStatus, 
        projectsByDuration, projectsByPaymentType,
        projectByMessenger, projectByCommunication) => projects.filter((project) => (
        projectsByName.includes(project) &&
        projectsByStack.includes(project) && 
        projectsByStatus.includes(project) &&
        projectsByDuration.includes(project) &&
        projectsByPaymentType.includes(project) &&
        projectByMessenger.includes(project) &&
        projectByCommunication.includes(project)
    )),
);

export default getFilteredProjects;