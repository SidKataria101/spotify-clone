export interface PayloadType {
    email: string;
    userId: number;
    artistId?: number;
}
export type EnableTwoFAType = {
    secret: string;
}