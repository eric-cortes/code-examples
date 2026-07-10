import { Select } from 'rds-ui-system';
import { ReactElement } from 'react';

interface TimeOption {
  id: string;
  name: string;
}

interface Props {
  onChange: (selectedOption: TimeOption) => void;
  label: string;
  formDate?: unknown;
}

export default function TimeSelect({
  onChange,
  label,
  formDate,
}: Props): ReactElement {
  const generateTimeOptions = (): { id: string; name: string }[] => {
    const options: { id: string; name: string }[] = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, '0');
      const timeString = `${hourString}:00`;
      options.push({ id: hourString, name: timeString });
    }
    return options;
  };

  const optionsValues = generateTimeOptions();

  return (
    <Select
      selectedOptions={formDate}
      id="Satrt Time"
      label={label}
      options={optionsValues}
      onSelectionChange={onChange}
    />
  );
}
