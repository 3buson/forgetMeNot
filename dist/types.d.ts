export declare enum StorageKeyType {
    ISSUE_UPDATED_TIMESTAMPS = "issueUpdatedTimestamps",
    LAST_CHANGED = "lastChanged",
    CREDENTIALS = "credentials"
}
export declare enum TrackingEventType {
    NEW_USER = "NEW_USER"
}
export type TrackingData = {
    event: TrackingEventType;
    distinct_id: string;
    identifier: string;
};
export type MixpanelTrackingData = {
    event: string;
    properties: {
        token: string;
        time: number;
    } & TrackingData;
};
export type JiraIssuesResponse = {
    issues: JiraIssue[];
};
export type JiraIssue = {
    fields: {
        updated: string;
    };
};
