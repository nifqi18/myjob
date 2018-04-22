
export interface Lowongan {
    id: number;
    user_id:string;
    judul:string;
    content:string
    salari : string;
    lokasi:string;
    type_lowongan:string;
    benefit:string;
    created_at: Date;
    updated_at: Date;
}

export interface SourceLowongan {
    total : string;
    perPage : string;
    page : string;
    lastPage : string;
    Data : Lowongan;

    /** 
     * total	18
        perPage	6
        page	2
        lastPage	3
     */
}
