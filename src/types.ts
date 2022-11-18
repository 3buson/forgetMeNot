export enum TRACKING_EVENT {
    NEW_USER = 'NEW_USER',
}

export type TrackingData = {
    event: TRACKING_EVENT,
    distinct_id: string,
    identifier: string,
}

export type MixpanelTrackingData = {
    event: string,
    properties: {
        token: string,
        time: number,
    } & TrackingData
}