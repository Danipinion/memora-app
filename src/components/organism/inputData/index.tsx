import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface inputDataProps {
    name: string;
    placeholder: string;
}

export default function InputData({ placeholder, name }: inputDataProps) {
    return (
        <div className="relative">
            <FormField
            name={name} 
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input style={{ boxShadow: 'none' }} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                </FormItem>
            )}
        />
        </div>
    )
}
