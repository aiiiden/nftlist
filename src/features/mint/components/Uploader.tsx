import { FirebaseError } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ComponentPropsWithRef } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";

interface UploaderProps extends ComponentPropsWithRef<"input"> {
  onUpload: (downloadURL: string) => void;
}

const Uploader: React.FC<UploaderProps> = ({
  onUpload,
  onChange,
  ...props
}) => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // firebase storage에 이미지 업로드
    const file = event.target.files?.[0];
    const extention = file?.name.split(".").pop();
    if (!file) {
      return;
    }

    try {
      // firebase storage에 이미지 업로드
      const storage = getStorage();
      const storageRef = ref(storage, "mint/" + v4() + "." + extention);

      // 업로드
      const snapshot = await uploadBytes(storageRef, file);

      // 업로드한 파일의 다운로드 URL 가져오기
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 업로드한 파일의 다운로드 URL을 부모 컴포넌트로 전달
      onUpload(downloadURL);
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(`${error.code}: 파일 업로드에 실패했습니다.`);
      }
    }
  };
  return (
    <div>
      <label htmlFor="upload">이미지 업로드</label>
      <input
        type="file"
        id="upload"
        accept="image/*"
        onChange={handleUpload}
        {...props}
      />
    </div>
  );
};

export default Uploader;
