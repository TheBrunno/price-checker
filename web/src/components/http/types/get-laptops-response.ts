export type GetLaptopsResponse = Array<{
    id: number,
    img: string,
    model: string,
    processor: string,
    ram: string,
    price: number,
    expectedValue: number,
    checkedAt: string
}>;