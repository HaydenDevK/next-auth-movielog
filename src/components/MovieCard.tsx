import Image from "next/image";
import { thumbnail01 } from "../../public/assets/assets";
import { star } from "../../public/assets/assets";
import { TTmdbMovie } from "@/type/movie";
import { FaHeartCirclePlus } from "react-icons/fa6";

export default function MovieCard(props: TTmdbMovie) {
  return (
    <div>
      <img src={thumbnail01.src} alt="" className="rounded-md" />

      <div className="flex items-start justify-between mt-4">
        <div className="flex flex-col gap-2">
          <h4 className="line-clamp-1 text-white font-bold text-xl">
            {"title"}
          </h4>
          <div className="flex justify-between items-center text-sm text-gray-200">
            <div className="flex items-center gap-2 font-bold">
              <Image
                src={star.src}
                alt="star"
                width={18}
                height={18}
                className="object-contain"
              />
              <span className="text-primary">{"rate"}</span>
              <span className="text-primary font-bold">{"date"}</span>
            </div>
          </div>
        </div>
        <button type="submit">
          <FaHeartCirclePlus className="text-[28px] text-white hover:animate-ping" />
        </button>
      </div>
    </div>
  );
}
