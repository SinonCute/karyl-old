export interface Entry {
    id: string;
    from: number;
    to: number;
    text: string;
}
export interface ParsedResult {
    entries: Entry[];
}
export declare const isEntryFromPartial: (e: Partial<Entry>) => e is Entry;
