import { toast } from 'react-hot-toast';

export const handleChangeCSV =
  (transformer: (text: string) => void) =>
  async (files: FileList): Promise<void> => {
    const file = files?.[0];

    if (!file) {
      toast.error('Something went wrong');
      return;
    }

    if (file.type !== 'text/csv') {
      toast.error('Make sure that you are sending a CSV File');
      return;
    }

    const text = await file.text();

    transformer(text);
  };
