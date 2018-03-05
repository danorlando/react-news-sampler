import { navigationConstants } from "../constants";



export const navigationActions = {
    updateTitleBar,
    toggleSidebar
}

export function updateTitleBar(title) {
    return { type: navigationConstants.UPDATE_TITLE_BAR, title };         
}

export function toggleSidebar(sidebarOpen) {
    return {type: navigationConstants.SIDEBAR, sidebarOpen};
} 