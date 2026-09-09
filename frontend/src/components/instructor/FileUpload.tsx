import { useRef } from "react";

interface FileUploadProps {
  label: string;
  hint: string;
  fileName: string;
  onFileSelected: (fileName: string) => void;
  accept?: string;
}

export default function FileUpload({ label, hint, fileName, onFileSelected, accept }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="field full">
      <label>{label}</label>
      <div className="upload" onClick={() => inputRef.current?.click()}>
        <div className="upload-icon">↑</div>
        <strong>{fileName ? "Change document" : label}</strong>
        {fileName ? <div className="upload-filename">✓ {fileName}</div> : <div className="upload-hint">{hint}</div>}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => onFileSelected(e.target.files?.[0]?.name ?? "")}
        />
      </div>
    </div>
  );
}
