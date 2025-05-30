export interface INewRecord {
        client: {
            name: string,
            surname: string,
            email: string,
            phone: string,
        };
        devices: {
            model: string;
            equipment: string;
            break_info: string;

        }[];

}