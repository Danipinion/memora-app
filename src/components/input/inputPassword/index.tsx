import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface InputPasswordProps {
  name: string;
  placeholder: string;
  control: Control<any>;
}

export const InputPassword = ({ name, placeholder, control }: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className="focus-visible:border-purple focus-visible:ring-transparent"
              />
              <div
                className="absolute right-3 top-5 -translate-y-1/2 cursor-pointer text-gray-400"
                onClick={toggleVisibility}
              >
                <FontAwesomeIcon className="w-4 h-4" icon={showPassword ? faEyeSlash : faEye} />
              </div>
            </div>
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
};