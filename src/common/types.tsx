export enum EventType {
  DiffStat,
  DiffError,
  TabUpdate,
}

export type PageEventFormat<T> = {
  type: EventType,
  data: T
}

export type DiffStatEvent = PageEventFormat<PullRequestData>
export type DiffErrorEvent = PageEventFormat<{ message: string }>
export type TabUpdateEvent = PageEventFormat<{ href: string }>

export type PageEvent = DiffStatEvent | DiffErrorEvent | TabUpdateEvent

export interface PullRequestData {
  title: string;
  linesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  href: string;
}
