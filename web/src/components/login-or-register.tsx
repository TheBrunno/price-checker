import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

const FormLoginSchema = z.object({
    email: z.string({
        message: "Insira um email"
    }).email({
        message: "Insira um email válido"
    }),
    password: z.string({
        message: "Insira uma senha"
    }).min(8, {
        message: "Insira uma senha com mais de 8 caracteres"
    })
})

const FormRegisterSchema = z.object({
    email: z.string({
        message: "Insira um email"
    }).email({
        message: "Insira um email válido"
    }),
    password: z.string({
        message: "Insira uma senha"
    }).min(8, {
        message: "Insira uma senha com mais de 8 caracteres"
    }),
    confirmPassword: z.string({
        message: "Repita a senha anterior"
    }).min(8, {
        message: "Insira uma senha com mais de 8 caracteres"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: 'Senhas não condizem',
    path: ['confirmPassword']
})


export function LoginOrRegister() {
    const formLogin = useForm<z.infer<typeof FormLoginSchema>>({
        resolver: zodResolver(FormLoginSchema),
    })

    const formRegister = useForm<z.infer<typeof FormRegisterSchema>>({
        resolver: zodResolver(FormRegisterSchema),
    })

    async function onSubmitLogin(data: z.infer<typeof formLogin>) {
        console.log(data);
        formLogin.reset();
    }

    async function onSubmitRegister(data: z.infer<typeof formRegister>) {
        console.log(data);
        formRegister.reset();
    }

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
                        <CardContent>
                            <Form {...formLogin}>
                                <form action="" className="grid gap-6" onSubmit={formLogin.handleSubmit(onSubmitLogin)}>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={formLogin.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="email">Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="email" placeholder="email@email.com" type="email" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={formLogin.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="password">Senha</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="password" placeholder="********" type="password" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit">Entrar na conta</Button>
                                </form>
                            </Form>
                        </CardContent>
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
                            <Form {...formRegister}>
                                <form action="" className="grid gap-6" onSubmit={formRegister.handleSubmit(onSubmitRegister)}>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={formRegister.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="email">Email</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="email" placeholder="email@email.com" type="email" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={formRegister.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="passwordRegister">Senha</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="passwordRegister" placeholder="********" type="password" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={formRegister.control}
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel htmlFor="passwordRegisterConfirm">Repita sua senha</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} id="passwordRegisterConfirm" placeholder="********" type="password" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit">Fazer cadastro</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
