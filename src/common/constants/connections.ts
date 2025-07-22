export const connection: Connection = {
    CONNECTION_STRING: 'MySQL://localhost:3306',
    DB: 'MYSQL',
    DBNAME: 'TEST'
};

export type Connection = {
    CONNECTION_STRING: string;
    DB: string;
    DBNAME: string;
};