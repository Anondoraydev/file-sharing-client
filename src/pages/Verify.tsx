import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Dot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    useSendOtpMutation,
    useVerifyOtpMutation,
} from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const OTP_LENGTH = 6;
const RESEND_TIME = 120;

const FormSchema = z.object({
    pin: z.string().length(OTP_LENGTH, "OTP must be 6 digits"),
});

export default function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state as string | undefined;

    const [timer, setTimer] = useState(RESEND_TIME);
    const intervalRef = useRef<number | null>(null);

    const [sendOtp, { isLoading: sending }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: { pin: "" },
        mode: "onSubmit",
    });

    /* ------------------------ UTILS ------------------------ */

    const startTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimer(RESEND_TIME);
        intervalRef.current = window.setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
    };

    const handleSendOtp = async () => {
        if (!email) return;

        const toastId = toast.loading("Sending OTP...");
        try {
            await sendOtp({ email }).unwrap();
            toast.success("OTP sent", { id: toastId });
            startTimer();
        } catch {
            toast.error("Failed to send OTP", { id: toastId });
        }
    };

    const onSubmit = async ({ pin }: z.infer<typeof FormSchema>) => {
        if (!email) return;

        const toastId = toast.loading("Verifying OTP...");
        try {
            await verifyOtp({ email, otp: pin }).unwrap();
            toast.success("OTP verified", { id: toastId });
            navigate("/", { replace: true }); // redirect to home
        } catch {
            toast.error("Invalid OTP", { id: toastId });
        }
    };

    /* ---------------------- LIFECYCLE ---------------------- */

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            navigate("/", { replace: true });
        }
    }, [email, navigate]);

    // Start timer safely (warning-free)
    useEffect(() => {
        if (!email) return;

        const timeoutId = setTimeout(() => {
            setTimer(RESEND_TIME); // initial timer
            const timerId = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            intervalRef.current = timerId;
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [email]);

    /* ---------------------- RENDER ------------------------ */

    return (
        <div className="grid h-screen place-content-center">
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>Verify your email</CardTitle>
                    <CardDescription>
                        Enter the 6-digit code sent to <br /> {email}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            id="otp-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="pin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>One-Time Password</FormLabel>
                                        <FormControl>
                                            <InputOTP maxLength={OTP_LENGTH} value={field.value} onChange={field.onChange}>
                                                <InputOTPGroup><InputOTPSlot index={0} /></InputOTPGroup>
                                                <InputOTPGroup><InputOTPSlot index={1} /></InputOTPGroup>
                                                <InputOTPGroup><InputOTPSlot index={2} /></InputOTPGroup>
                                                <Dot />
                                                <InputOTPGroup><InputOTPSlot index={3} /></InputOTPGroup>
                                                <InputOTPGroup><InputOTPSlot index={4} /></InputOTPGroup>
                                                <InputOTPGroup><InputOTPSlot index={5} /></InputOTPGroup>
                                            </InputOTP>
                                        </FormControl>

                                        <FormDescription className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="link"
                                                onClick={handleSendOtp}
                                                disabled={timer !== 0 || sending}
                                                className={cn("p-0", { "text-muted-foreground": timer !== 0 })}
                                            >
                                                Resend OTP
                                            </Button>
                                            <span>{timer}s</span>
                                        </FormDescription>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>

                <CardFooter className="justify-end">
                    <Button form="otp-form" type="submit" disabled={verifying}>
                        Verify
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
