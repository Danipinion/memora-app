import { Button } from "@/components/ui/button";

interface ButtonProps {
    isPending: boolean;
    label?: string;
    type?: "submit" | "button";
}

export const ButtonAuth = ({ isPending, label, type }: ButtonProps) => {
    return (
        <Button
            type={type}
            disabled={isPending}
            className="w-full bg-purple text-white border border-transparent hover:bg-white hover:text-purple hover:border-purple hover:border-1 transition-all duration-200"
        >
            {isPending ? "Memproses..." : label}
        </Button>
    );
};