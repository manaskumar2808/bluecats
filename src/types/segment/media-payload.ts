import { MediaType } from "../../constants/media";

export interface MediaPayload {
    url?: string;
    cdn: boolean;
    caption?: string;
    mediaType: MediaType;
};