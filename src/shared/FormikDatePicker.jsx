import { useField, useFormikContext } from 'formik';
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const FormikDatePicker = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const selectedDate = field.value ? new Date(field.value) : null;

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left">
            {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setFieldValue(name, date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
