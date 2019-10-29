import { ACTION_TYPE, AREA_STATUS } from "./const";
import { area } from "./types";

export const lockAreas = (areas: area[]) => ({
    type: ACTION_TYPE.LOCK,
    areas
});

export const unlockAreas = (areas: area[]) => ({
    type: ACTION_TYPE.UNLOCK,
    areas
});

export const setAreasStatus = (areas: area[], status: AREA_STATUS) => ({
    type: ACTION_TYPE.SET_STATUS,
    areas, status
});

export const setAreasMessage = (areas: area[], message: string) => ({
    type: ACTION_TYPE.SET_MESSAGE,
    areas, message
});
