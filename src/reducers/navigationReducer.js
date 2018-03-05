import { navigationConstants } from '../constants';


const initialState =  { title: '', sidebarOpen: false };


export function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case navigationConstants.UPDATE_TITLE_BAR:
            return Object.assign({}, ...state, {
                title: action.title
            });
        case "persist/REHYDRATE": {
            return { ...state, ...action.payload }
          }
        case navigationConstants.SIDEBAR:
            return {...state, sidebarOpen: action.sidebarOpen};
    default:
        return state
    }
}