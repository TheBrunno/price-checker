import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function LoginOrRegister() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Tabs defaultValue="login">
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Faça login com seu email e sua senha para acessar o PriceChecker.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="email@email.com" type="email" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Senha</Label>
                                <Input id="password"  type="password" placeholder="********"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Entrar na conta</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="cadastro">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cadastro</CardTitle>
                            <CardDescription>
                                Insira seu email e crie uma senha para acessar o PriceChecker.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="emailRegister">Email</Label>
                                <Input id="emailRegister" type="email" placeholder="email@email.com" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="passwordRegister">Senha</Label>
                                <Input id="passwordRegister" type="password" placeholder="********" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="passwordRegisterConfirm">Repita sua senha</Label>
                                <Input id="passwordRegisterConfirm" type="password" placeholder="********" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Fazer cadastro</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
