import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"


const FormSchema = z.object({
    model: z.string({
        message: "Insira um modelo válido"
    }).min(2, {
        message: "Modelo precisa conter no mínimo 2 caracteres."
    }),

    processor: z.string({
        message: "Insira um processador válido"
    }),

    ram: z.coerce.number({
        message: "Insira um valor válido"
    }).int({
        message: "Insira um número válido"
    }),

    expected_value: z.coerce.number({
        message: "Insira um valor válido"
    }).int({
        message: "Insira um valor válido"
    }),

    image: z.file().mime(['image/png', 'image/jpeg', 'image/webp'], {
        message: "Insira apenas PNG, JPEG, WEBP"
    }).optional(),

    sellers: z.array(z.object({
        name: z.string(),
        url: z.string().optional()
    }))
})

export function AddLaptop() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema) as any,
        defaultValues: {
            image: undefined,
            sellers: [
                { name: "Magazine Luiza", url: "" },
                { name: "Americanas", url: "" },
                { name: "Amazon", url: "" },
                { name: "Casas Bahia", url: "" }
            ]
        }
    })

    const { fields } = useFieldArray({
        control: form.control,
        name: "sellers"
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data) // enviar para a api
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-card border rounded p-3 fixed right-18 bottom-18 cursor-pointer hover:bg-zinc-700 hover:transition-colors">
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar um novo notebook</DialogTitle>
                    <DialogDescription>
                        Insira as informações sobre o notebook que você deseja e insira o link da página do produto nas lojas aceitas
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Modelo</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="e.g. Asus Vivobook Go 15" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className="grid gap-3 flex-5">
                                    <FormField
                                        control={form.control}
                                        name="processor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Processador</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="Ryzen 5 7520U" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-3 flex-2">
                                    <FormField
                                        control={form.control}
                                        name="ram"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Memória Ram (GB)</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="16" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="expected_value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Valor meta</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="2500" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Imagem</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    name={field.name}
                                                    ref={field.ref}
                                                    onChange={e => {
                                                        field.onChange(e.target.files?.[0]);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-3">
                                <Label>Adicione os links</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" type="button">Lojas</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-96">
                                        <div className="grid gap-4">
                                            <div className="space-y-2">
                                                <h4 className="leading-none font-medium">Links das lojas</h4>
                                                <p className="text-muted-foreground text-sm">
                                                    Adicione apenas o link do produto nas respectivas lojas.
                                                </p>
                                            </div>
                                            <div className="grid gap-2">
                                                {fields.map((seller, index) => (
                                                    <div className="flex" key={seller.id}>
                                                        <FormField
                                                            control={form.control}
                                                            name={`sellers.${index}.url`}
                                                            render={({ field }) => (
                                                                <FormItem className="flex w-full">
                                                                    <FormLabel className="flex-1">{seller.name}</FormLabel>
                                                                    <FormControl className="flex-1">
                                                                        <Input
                                                                            {...field}
                                                                            placeholder={`https://${seller.name
                                                                                .toLowerCase()
                                                                                .replaceAll(" ", "")}.com.br/...`}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Cadastrar</Button>
                        </DialogFooter>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}