import { useField, useFormikContext } from "formik";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = ["00", "15", "30", "45"];

export const FormikTimeDropdown = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {field.value ? field.value : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-4 gap-2 max-h-60 overflow-auto">
        {hours.map(h =>
          minutes.map(m => {
            const value = `${h}:${m}`;
            return (
              <Button
                key={value}
                size="sm"
                variant="ghost"
                onClick={() => setFieldValue(name, value)}
              >
                {value}
              </Button>
            );
          })
        )}
      </PopoverContent>
    </Popover>
  );
};
