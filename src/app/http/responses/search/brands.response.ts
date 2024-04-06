export type BrandsResponse = {
    [key: string]: Brand;
};

export type Brand = {
    availability: number;
    brand: string;
    description: string;
    number: string;
    numberFix: string;
}
