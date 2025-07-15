import { useQuery } from "@tanstack/react-query";
import type { GetSellersResponse } from "./types/get-sellers.response";

export function useSellers() {
    return useQuery({
        queryKey: ['get-sellers'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/sellers');
            const result: GetSellersResponse = await response.json();

            return result;
        }
    })
}