/*export class PageKerja {
    public total: number = 0;
    public perPage: number = 0;
    public page: string = '';
    public lastPage: number = 0;
    public data: any | string[] = [];
    constructor() { }
}*/

export interface PageKerja {
    total : number;
    perPage : number;
    page : string;
    lastPage: number;
    data : any | string[];
}