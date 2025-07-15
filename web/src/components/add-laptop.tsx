import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";


export function AddLaptop() {
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
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label>Modelo</Label>
                        <Input placeholder="e.g. Asus Vivobook Go 15" />
                    </div>
                    <div className="flex gap-3">
                        <div className="grid gap-3 flex-3">
                            <Label>Processador</Label>
                            <Input placeholder="Ryzen 5 7520U" />
                        </div>
                        <div className="grid gap-3 flex-1">
                            <Label>Memória RAM</Label>
                            <Input placeholder="16GB" />
                        </div>
                    </div>
                    <div className="grid gap-3">
                        <Label>Valor meta</Label>
                        <Input placeholder="2500" />
                    </div>
                    <div className="grid gap-3">
                        <Label>Imagem</Label>
                        <Input type="file" />
                    </div>
                    <div className="flex gap-3">
                        <Label>Adicione os links</Label>
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="outline">Lojas</Button>
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
                                        <div className="flex">
                                            <Label className="flex-1">Magazine Luiza</Label>
                                            <Input className="flex-1" placeholder="https://www.magazineluiza.com.br/..." />
                                        </div>
                                        <div className="flex">
                                            <Label className="flex-1">Americanas</Label>
                                            <Input className="flex-1" placeholder="https://www.americanas.com.br/..." />
                                        </div>
                                        <div className="flex">
                                            <Label className="flex-1">Casas Bahia</Label>
                                            <Input className="flex-1" placeholder="https://www.casasbahia.com.br/..." />
                                        </div>
                                        <div className="flex">
                                            <Label className="flex-1">Amazon</Label>
                                            <Input className="flex-1" placeholder="https://www.amazon.com.br/..." />
                                        </div>
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

            </DialogContent>
        </Dialog>
    )
}