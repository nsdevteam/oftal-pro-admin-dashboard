export interface AttachmentProps {
  label: string;
  files?: FileList;
  isEditable: boolean;
  onChange: (file: FileList) => void;
}
