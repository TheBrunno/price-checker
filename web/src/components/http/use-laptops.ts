import { useQuery } from "@tanstack/react-query";
import type { GetLaptopsResponse } from "./types/get-laptops-response";

export function useLaptops() {
    return useQuery({
        queryKey: ['get-laptops'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/laptops');
            const result: GetLaptopsResponse = await response.json();

            return result;
        }
    })
}