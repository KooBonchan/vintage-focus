import { useParams } from "react-router";

export function ProductDetail() {
  const { id } = useParams();
  return (
    <>
    상품 상세: 상품번호 {id}
    </>
  );
}
