import withAuth from "@/features/auth/hoc/withAuth";
import useAuth from "@/features/auth/hooks/useAuth";
import MintForm from "@/features/mint/components/MintForm";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";
import GalleryList from "../components/GalleryList";

const GalleryListPage: NextPage = () => {
  const { user, logout } = useAuth();

  return (
    <main>
      <header>
        <h1>NFT 갤러리</h1>
      </header>

      <ConnectButton />

      <div className="flex flex-col gap-12">
        <article>
          <p>{user?.displayName} 님 어서오세요~</p>
          <button onClick={logout}>로그아웃</button>
        </article>

        <article>
          <h2>민팅하기</h2>
          <p>내 이미지를 민팅해봅시다.</p>
          <div>
            <MintForm />
          </div>
        </article>

        <article>
          <h2>NFT 리스트</h2>
          <GalleryList />
        </article>
      </div>
    </main>
  );
};

export default withAuth(GalleryListPage);
