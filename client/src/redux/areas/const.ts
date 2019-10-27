export enum ACTION_TYPE {
    LOCK = 'action_areas_lock_area',
    UNLOCK = 'action_areas_unlock_area',
    SET_STATUS = 'action_areas_set_area_status',
    SET_MESSAGE = 'action_areas_set_area_message'
}

export enum AREA_STATUS {
    READY = 'action_areas_area_status_ready',
    LOCKED = 'action_areas_area_status_locked',
    LOADING = 'action_areas_area_status_loading',
    ERROR = 'action_areas_area_status_error'
}

export const LOAD_STATUS_TIMEOUT = 1000;
