import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateLaptopRequest } from "./types/create-laptop-request";
import type { CreateLaptopResponse } from "./types/create-laptop-response";

export function useCreateLaptops(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateLaptopRequest) => {
            const { image, ...firstBody } = data
            let response = await fetch('http://localhost:3333/laptops', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(firstBody)
            })

            const result:CreateLaptopResponse = await response.json();

            response = await fetch('http://localhost:3333/laptops/upload/'+result.laptopId, {
                method: 'POST',
                body: image
            })

            return result;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-laptops'] })
        }
    })
}