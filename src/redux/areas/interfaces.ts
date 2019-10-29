import { area } from "./types";

export interface ActionUserDescriptor {
    areas: area[],
    processMessage: string,
    successMessage: string,
    failMessage: string
};
