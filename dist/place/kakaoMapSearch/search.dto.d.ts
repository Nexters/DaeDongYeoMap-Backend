export declare enum SortType {
    distance = "distance",
    accuracy = "accuracy"
}
export declare class KeywordSearchDto {
    query: string;
    category_group_code?: string;
    x?: number;
    y?: number;
    radius?: number;
    rect?: string;
    page?: number;
    size?: number;
    sort?: SortType;
}
