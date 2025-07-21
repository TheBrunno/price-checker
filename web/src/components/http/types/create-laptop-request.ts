export type CreateLaptopRequest = {
    model: string;
    ram: number;
    processor: string;
    expected_value: number;
    image: FormData;
    sellers: Array<{
        id: number;
        name: string;
        url: string | undefined;
    }>;
};