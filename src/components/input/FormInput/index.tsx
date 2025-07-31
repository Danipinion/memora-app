
import { Input, InputProps } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> extends InputProps {
  control: Control<T>;
  name: FieldPath<T>;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  className,
  ...props
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              {...props}
              className={cn(
                "focus-visible:border-purple focus-visible:ring-transparent",
                className
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}