import { AnyAction, Dispatch } from 'redux';
import { ActionUserDescriptor } from './interfaces';
import { lockAreas, unlockAreas, setAreasStatus, setAreasMessage } from './actionCreators';
import { AREA_STATUS, LOAD_STATUS_TIMEOUT } from './const';


export default class AreaAction {
    constructor(
        protected actionUserDescriptor: ActionUserDescriptor,
        protected action: AnyAction
    ) { }

    async run(dispatch: Dispatch) {
        dispatch(lockAreas(this.actionUserDescriptor.areas));
        dispatch(setAreasMessage(this.actionUserDescriptor.areas, this.actionUserDescriptor.processMessage));
        const timeout = setTimeout(() => {
            dispatch(setAreasStatus(this.actionUserDescriptor.areas, AREA_STATUS.LOADING));
        }, LOAD_STATUS_TIMEOUT);

        try {
            const dispatchResult = await dispatch(this.action);
            dispatch(setAreasMessage(this.actionUserDescriptor.areas, this.actionUserDescriptor.successMessage));
            return dispatchResult;    
        } catch (error) {
            dispatch(setAreasStatus(this.actionUserDescriptor.areas, AREA_STATUS.ERROR));
            dispatch(setAreasMessage(this.actionUserDescriptor.areas, 
                `${this.actionUserDescriptor.failMessage}: ${error.message || ''}`));
        } finally {
            clearTimeout(timeout);
            dispatch(unlockAreas(this.actionUserDescriptor.areas));
        }
    }
};
