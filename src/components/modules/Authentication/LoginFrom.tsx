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
import { useForm, type SubmitHandler } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { setCredentials } from "@/redux/features/auth.slice";

type LoginFormValues = {
    email: string;
    password: string;
};

export function LoginForm({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useForm<LoginFormValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [login, { isLoading }] = useLoginMutation();

    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        try {
            // ✅ Login API call
            const res = await login(data).unwrap();

            // ✅ Set user + token in Redux
            dispatch(
                setCredentials({
                    user: res.user,
                    accessToken: res.accessToken,
                })
            );

            toast.success("Login successful");
            navigate("/", { replace: true });
        } catch (error) {
            const err = error as FetchBaseQueryError & {
                data?: { message?: string; code?: string };
            };

            //  Account not verified → redirect to OTP verify page
            if (err.status === 401) {
                toast.error("Your account is not verified. Please verify first.");
                navigate("/verify", { state: data.email });
                return;
            }

            //  User not registered → redirect to register
            if (err.status === 404 || err.data?.code === "USER_NOT_FOUND") {
                toast.error("Account not found. Please register first.");
                navigate("/register", { state: { email: data.email } });
                return;
            }

            toast.error(err.data?.message ?? "Login failed. Try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="w-full md:w-1/3 md:mt-24 md:mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="example@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                rules={{ required: "Password is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>

                        <p className="text-center mt-3 text-sm">
                            Don&apos;t have an account?{" "}
                            <button
                                onClick={() => navigate("/register")}
                                className="text-indigo-600 hover:underline"
                            >
                                Register
                            </button>
                        </p>
                    </Form>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center text-xs">
                By continuing, you agree to our{" "}
                <a href="#" className="underline">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline">
                    Privacy Policy
                </a>
                .
            </FieldDescription>
        </div>
    );
}
