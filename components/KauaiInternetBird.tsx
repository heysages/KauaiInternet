import Image from "next/image";

type KauaiInternetBirdProps = {
  size?: number;
  className?: string;
};

/** Official Kauai Internet bird mark */
export default function KauaiInternetBird({
  size = 44,
  className = "",
}: KauaiInternetBirdProps) {
  return (
    <Image
      src="/brand/kauai-internet-bird.png"
      alt=""
      width={size}
      height={size}
      className={`object-contain ${className}`}
      aria-hidden
      priority
    />
  );
}
