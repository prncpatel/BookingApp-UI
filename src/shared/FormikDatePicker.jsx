import { useField, useFormikContext } from 'formik';
import dayjs from 'dayjs';
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
            {selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            value={selectedDate}
            onChange={(date) => setFieldValue(name, date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
