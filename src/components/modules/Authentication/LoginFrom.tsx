import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";




export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();

    const form = useForm();
    const [login] = useLoginMutation();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data)
        try {
            const res = await login(data).unwrap();
            console.log("Login successful:", res);
            toast.success("Login successful");
            // Redirect or perform other actions after successful login

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Login failed:", error);
            if (error.status === 401) {
                toast.error("Your Account is not verified. Please verify your account.");
                navigate("/verify", { state: data.email });
            }
        }

    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full md:w-1/3 md:mt-24 md:mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="exam@example.com" type="email" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is your email address
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" type="password" {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            Password must be at least 6 characters
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">Submit</Button>
                        </form>
                        <h2 className="text-center mt-3">Don't have an account? <a href="/register" className="text-indigo-600">Register</a></h2>
                    </Form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
