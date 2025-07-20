import { dayjs } from "@/lib/dayjs";
import { useLaptops } from "./http/use-laptops";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function LaptopsList(){
    const { data, isLoading } = useLaptops();

    console.log(data)

    return (
        <div className="flex flex-wrap w-full gap-2 mt-6 px-10 justify-center">
            {isLoading && (
                <p className="text-muted-foreground text-sm">Carregando notebooks...</p>
            )}
            {data?.map((laptop) => {
                return(
                    <Card className="w-72" key={laptop.id}>
                        <CardHeader>
                            <CardTitle>
                                {laptop.model}
                            </CardTitle>
                            {
                                laptop.img ?
                                (
                                    <img src={"http://localhost:3333/uploads/"+laptop.img} className="block m-auto h-60" />
                                ) :
                                (
                                    <img src="assets/laptop.png" className="block m-auto h-60" />
                                )
                            }
                            <Badge variant="secondary">
                                Ram: {laptop.ram}GB
                            </Badge>
                            <Badge variant="secondary">
                                Processador: {laptop.processor}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <Card>
                                <CardHeader className="flex flex-col gap-4">
                                    <div>
                                        <CardDescription>
                                            Última leitura
                                        </CardDescription>
                                        <CardTitle className="text-blue-400">
                                            {
                                                laptop.price ?
                                                (
                                                    'R$ '+laptop.price.toFixed(2).replace('.', ',')
                                                ) :
                                                (
                                                    'Não disponível'
                                                )
                                            }
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {dayjs(laptop.checkedAt).fromNow()}
                                        </CardDescription>
                                    </div>
                                    <div>
                                        <CardDescription>
                                            Valor meta
                                        </CardDescription>
                                        <CardTitle className="text-yellow-300">
                                            R$ {laptop.expectedValue.toFixed(2).replace('.', ',')}
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                            </Card>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}