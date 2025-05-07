import { useState } from "react";
import { message, Spin, Upload, UploadProps } from "antd";
import uploadIcon from "../assets/uploadIcon.svg";
import { getPublicUrl, uploadFile } from "../api/uploadFile";
const { Dragger } = Upload;

interface UploadFileProps {
  countFile?: number;
  setAvatarUrl: (url: string) => void;
}

const UploadFile = ({ countFile = 1, setAvatarUrl }: UploadFileProps) => {
  const [uploading, setUploading] = useState(false);
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: countFile,
    accept: ".svg, .png, .jpg, .jpeg",
    onChange: async (info) => {
      if (info.file.status === "done" || info.file.status === "error") {
        setUploading(false);
        if (info.file.status === "done") {
          try {
            const response = await uploadFile(info.file.originFileObj as File);
            const publicUrl = getPublicUrl(response.path);
            setAvatarUrl(publicUrl);
            message.success("File uploaded successfully.");
          } catch (error) {
            message.error("File upload failed.");
            console.error("Error uploading file:", error);
          }
        }
      }
      if (info.file.status === "uploading") {
        setUploading(true);
      }
    },
    customRequest: async ({ onSuccess }) => {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess("ok");
        }
      }, 2000); // simulate loading
    },
    showUploadList: false,
  };
  return (
    <Dragger className="w-full bg-blue-300 rounded-2xl" {...uploadProps}>
      <div className="flex items-center gap-4">
        {uploading ? (
          <Spin />
        ) : (
          <img
            src={uploadIcon}
            alt="uploadIcon"
            className="h-[50px] w-[50px] rounded-full "
          />
        )}
        <p className="text-white text-[0.95rem]">
          <b>Click to upload</b> or drag and drop <br />
          SVG, PNG, or JPG file.
        </p>
      </div>
    </Dragger>
  );
};

export default UploadFile;
