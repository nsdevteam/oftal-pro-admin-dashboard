export interface AttachmentProps {
  label: string;
  disabled: boolean;
  supportingText?: string;
  onChange: (file: FileList) => void;
}
