# 사내 온보딩을 위한 회원제 NFT 프로젝트 (Onboarding Membership NFT Project)

이 프로젝트는 사내 온보딩을 위한 회원제 NFT 프로젝트입니다.
This project aims to create a membership-based NFT project for internal onboarding purposes.

Firebase를 통해 서비스 로직을 구현하였으며, Goerli 체인을 이용하여 컨트랙트가 배포되어 있습니다.
Firebase is utilized for implementing the service logic, while the contracts are deployed on the Goerli chain.

배포된 컨트랙트에 대한 확인은 [이 문서](/src/features/mint/contract/nftList.md)에서 가능합니다.
You can confirm the deployed contracts in [the document](/src/features/mint/contract/nftList.md).

## Reference

- [https://nft.storage/](https://nft.storage/) - 원리 파악용
  (For understanding the principles)
- [https://firebase.google.com/docs/guides?hl=ko](https://firebase.google.com/docs/guides?hl=ko) - 파이어베이스를 통한 서비스 로직 구현용
  (For implementing the service logic using Firebase)
- [https://opensea.io/](https://opensea.io/) - 디자인 또는 플로우 참고용
  (For design and flow reference)

## 비기능적 요구사항 (Non-Functional Requirements)

- 유저는 아이디와 비밀번호를 통해 로그인할 수 있어야 합니다.
  (Users can log in using their ID and password.)
- 로그인 이후에는 Goerli 체인에 연결된 지갑을 사용할 수 있어야 합니다.
  (After logging in, users can use a wallet connected to the Goerli chain.)
- 연결된 지갑으로 민팅된 NFT를 리스트 형식으로 볼 수 있어야 합니다.
  (Users can view minted NFTs in a list format using the connected wallet.)
- 유저는 자신의 이미지를 업로드하여 NFT를 민팅할 수 있어야 합니다.
  (Users can upload their images to mint NFTs.) - 민팅 시 제목과 설명 메타데이터를 입력할 수 있어야 합니다. (최대 20자, 한글 가능)
  (Users can enter title and description metadata (up to 20 characters, including Korean) during minting.) - 파일 업로드를 지원해야 합니다.
  (File upload support is required.)
- 민팅 이후에는 자신의 이미지가 리스트에 표시되어야 합니다.
  (After minting, users' images should be displayed in the list.)

## 화면 설계 (UI Design)

1. 로그인 (Login)

2. 회원가입 (Sign Up)

3. 민팅 플레이그라운드 (리스트 형식) (Minting Playground in List Format)

   - 자유롭게 디자인 가능
     (Design can be flexible.)
   - 썸네일, 제목, 민팅 날짜는 필수적으로 표시되어야 합니다.
     (Thumbnail, title, and minting date should be displayed.)
   - 상단에 폼 UI 또는 모달 버튼이 있어야 합니다.
     (There should be a form UI or modal button at the top.)

4. 민팅 상세페이지 (상세페이지 형식) (Minting Detail Page)
   - 민팅한 이미지와 메타데이터, 민팅한 날짜 표시
     (Display minted image, metadata, and minting date.)
   - 스캐너에서 보기 버튼과 리스트로 돌아가기 버튼 제공
     (Provide a button to view the image using a scanner and a button to return to the list.)

## 기능적 요구사항 (Functional Requirements)

- Firebase를 이용해야 합니다.
  (Firebase should be used.)
  - Firebase의 Authentication API를 이용하여 로그인 과정을 수행합니다.
    (Firebase Authentication API is used for the login process.)
  - Firebase의 Storage API를 통해 NFT에 민팅할 이미지를 볼 수 있어야 합니다.
    (Firebase Storage API is used to view images for minting NFTs.)
  - Firebase의 Firestore API를 통해 "회원 전용" 간단한 CRUD를 구현해야 합니다.
    (Firebase Firestore API is used to implement simple CRUD operations for members-only content.)

데이터 저장 형식은 다음과 같습니다: (The data storage format is as follows:)

```tsx
type NFTList = NFTItem[];

interface NFTItem {
  [PK]: string; // 고윳값, 형식은 어떤 것이든 상관없음 (Unique identifier, any format)
  address: `0x{string}`; // NFT의 괴를리 네트워크 상에서의 주소 (Address of the NFT on the Goerli network)
  thumbnail: string; // Storage 상에서의 주소 (Address on Storage)
  uid: string; // 업로드한 유저의 고유 PK (firebase에서 제공함) (Unique PK of the user who uploaded it (provided by Firebase))
  title: string; // NFT의 타이틀 메타데이터 (민팅시 입력된 값) (NFT title metadata (input during minting))
  description: string; // NFT의 description 메타데이터 (민팅시 입력된 값) (NFT description metadata (input during minting))
}
```
