type Database = {
    host: string;
    user: string;
    password: string;
    db: string;
    dielect: "mysql" | "postgres" | "sql";
    pool: {
        max: number;
        min: number;
        idle: number;
        acquire: number;
    };
};
declare const dbConfig: Database;
export default dbConfig;
//# sourceMappingURL=dbConfig.d.ts.map