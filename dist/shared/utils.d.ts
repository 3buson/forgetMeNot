export declare const ISSUES_URL = "https://celtra.atlassian.net/issues/?jql=assignee%20%3D%20currentUser()%20and%20status%20in%20(\"Code%20review\"%2C%20\"Spec%20review\")";
export declare function toggleElement(elementId: string, visible: boolean): void;
export declare function update(): Promise<void>;
export declare function getNumberOfIssues(): Promise<number>;
export declare function getNumberOfStaleIssues(): Promise<number>;
