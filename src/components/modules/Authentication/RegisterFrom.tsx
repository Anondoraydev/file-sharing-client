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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";


const registerSchema = z.object({
  displayName: z.string().min(2, {
    error: "Name is to short"
  }).max(50),
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters"
  }),
  confirmPassword: z.string().min(6, {
    error: "Confirm Password must be at least 6 characters"
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [register] = useRegisterMutation();
  const navigate = useNavigate();


  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
    }
    try {
      const result = await register(userInfo).unwrap();
      console.log("Registration successful:", result);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }

  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full md:w-1/3 md:mt-24 md:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Anondo Ray" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password </FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Password does not match
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
            <h2 className="text-center mt-3">Already have an account?<a href="/login" className="text-indigo-600"> Sign up</a></h2>
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
