import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputDataProps {
  name: string;
  placeholder: string;
  field?: any;
}

export default function InputData({
  placeholder,
  name,
  field,
}: InputDataProps) {
  return (
    <div className="relative">
      <FormField
        name={name}
        render={() => (
          <FormItem>
            <FormControl>
              <Input
                style={{ boxShadow: "none" }}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
