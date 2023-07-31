import { NFTStorage, File } from "nft.storage";

interface Metadata {
  name: string;
  description: string;
  image: string;
}

export const uploadToIPFS = async (metadata: Metadata) => {
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY,
  });
  const metadataFile = new File([JSON.stringify(metadata)], "metadata.json", {
    type: "application/json",
  });
  const cid = await client.storeBlob(metadataFile);
  return cid;
};
