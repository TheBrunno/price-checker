import { LaptopsList } from "@/components/laptops-list";

export function Laptops() {
    return (
        <div>
            <h1 className="text-center font-bold text-3xl mt-12">Veja todos os Notebooks checados</h1>
            <LaptopsList />
        </div>
    )
}