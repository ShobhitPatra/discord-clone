import { UploadDropzone } from "@uploadthing/react";
import "@uploadthing/react/styles.css";
import { X } from "lucide-react";
import Image from "next/image";
interface FileUploadComponentProps {
  endpoint: "serverImage" | "messageFile";
  onChange: (url?: string) => void;
  value: string;
}
const FileUploadComponent = ({
  endpoint,
  onChange,
  value,
}: FileUploadComponentProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="h-24 w-24 relative ">
        <Image fill src={value} alt="uploaded-file" className="rounded-full" />
        <button className="absolute bg-red-500  rounded-full p-1 text-white top-0 right-0">
          <X onClick={() => onChange("")} className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};
export default FileUploadComponent;
