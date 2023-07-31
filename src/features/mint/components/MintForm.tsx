/* eslint-disable @next/next/no-img-element */

import { collection, addDoc } from "firebase/firestore";
import Uploader from "./Uploader";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import { database } from "@/firebase/config";
import { useAccount } from "wagmi";

import { writeContract } from "@wagmi/core";
import { nftListABI } from "../contract/abi";
import { uploadToIPFS } from "../utils/ipfs";

export interface MintPayload {
  title: string;
  description: string;
  imageUrl: string;
  hash?: string;
}

const MintForm: React.FC = () => {
  const { isConnected } = useAccount();

  const { register, handleSubmit, setValue, watch, reset } =
    useForm<MintPayload>({
      defaultValues: {
        title: "",
        description: "",
        imageUrl: "",
      },
    });

  const onSubmit = async (payload: MintPayload) => {
    if (!isConnected) {
      toast.error("월렛에 연결되어 있지 않습니다.");
      return;
    }

    const cid = await uploadToIPFS({
      name: payload.title,
      description: payload.description,
      image: payload.imageUrl,
    });

    if (!cid) {
      toast.error("IPFS 업로드에 실패했습니다.");
      return;
    }

    try {
      const { hash } = await writeContract({
        address: "0x9ec98e51d1820c8749a2ef6f604616cc7f4609c9",
        abi: nftListABI,
        functionName: "mintNFT",
        args: [`ipfs://${cid}`, payload.title, payload.description],
      });

      const dbInstance = collection(database, "nfts");
      const { id } = await addDoc(dbInstance, {
        ...payload,
        hash,
      });

      // TODO: 상세 페이지 이동 만들어야 함

      reset();
    } catch (error: unknown) {
      // FirebaseError
      if (error instanceof FirebaseError) {
        console.error("[FIREBASE ERROR] ", error);
        toast.error(`[${error.code}] 에러가 발생했습니다.`);
      } else {
        console.error("[ERROR] ", error);
        toast.error(`에러가 발생했습니다.`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Uploader
          onUpload={(url) => {
            setValue("imageUrl", url);
          }}
        />
        {watch().imageUrl && (
          <a href={watch().imageUrl} target="_blank" rel="noreferrer">
            <img
              src={watch().imageUrl}
              width={120}
              height={120}
              alt="업로드한 이미지"
              title="업로드한 이미지"
            />
          </a>
        )}
      </div>

      <div>
        <label htmlFor="title">제목</label>
        <input type="text" id="title" {...register("title")} />
      </div>
      <div>
        <label htmlFor="description">설명</label>
        <textarea id="description" {...register("description")} />
      </div>
      <button type="submit">민팅하기</button>
    </form>
  );
};

export default MintForm;
