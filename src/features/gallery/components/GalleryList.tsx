/* eslint-disable @next/next/no-img-element */
import { MintPayload } from "@/features/mint/components/MintForm";
import { database } from "@/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";

const GalleryList = () => {
  const [list, setList] = useState<MintPayload[]>([]);

  useEffect(() => {
    const dbInstance = collection(database, "nfts");

    const q = query(dbInstance);

    getDocs(q).then((querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => doc.data() as MintPayload);

      setList(list);
    });
  }, []);

  return (
    <ul>
      {list.map((item) => (
        <li key={item.hash} className="mb-2 border border-1 border-black m-2">
          <img src={item.imageUrl} alt={item.title} width={120} height={120} />
          <p>{item.title}</p>
          <p>{item.description}</p>
          <a
            href={`https://goerli.etherscan.io/tx/${item.hash}`}
            target="_blank"
            rel="noreferrer"
          >
            {item.hash}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default GalleryList;
