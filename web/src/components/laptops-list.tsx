import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function LaptopsList(){
    const data = [1, 2, 3];

    return (
        <div className="flex flex-wrap w-full gap-2 mt-6 px-10 justify-center">
            {data.map((laptop) => {
                return(
                    <Card className="w-72">
                        <CardHeader>
                            <CardTitle>
                                Notebook ASUS Vivobook Go 15
                            </CardTitle>
                            <img src="assets/laptop.png" />
                            <Badge variant="secondary">
                                Ram: 16GB
                            </Badge>
                            <Badge variant="secondary">
                                Processador: Ryzen 5 7520U
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
                                            R$ 1749,90
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Há 2 horas atrás
                                        </CardDescription>
                                    </div>
                                    <div>
                                        <CardDescription>
                                            Valor meta
                                        </CardDescription>
                                        <CardTitle className="text-yellow-300">
                                            R$ 1229,90
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