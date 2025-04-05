import { useField, useFormikContext } from 'formik';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const FormikSelect = ({ name, label, options }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div>
      <label>{label}</label>
      <Select
        value={field.value}
        onValueChange={(value) => setFieldValue(name, value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
