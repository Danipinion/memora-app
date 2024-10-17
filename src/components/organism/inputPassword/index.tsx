import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/ui/input"; 
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface InputDataProps {
  name: string;
  placeholder: string;
  field?: any;
}

export default function InputPassword({
  placeholder,
  name,
  field,
}: InputDataProps) {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <FormField
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center">
                <Input
                  type={showPassword ? "text" : "password"}
                  style={{
                    boxShadow: "none",
                    paddingRight: "40px",
                    height: "40px",
                  }}
                  placeholder={placeholder}
                  {...field}
                />
                <div
                  onClick={PasswordVisibility}
                  className="absolute right-3 cursor-pointer"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
              </div>
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
