import Image from "next/image";
import { thumbnail01 } from "../../public/assets/assets";
import { star } from "../../public/assets/assets";
import { TTmdbMedia, TTmdbMovie } from "@/type/movie";
import { FaHeartCirclePlus } from "react-icons/fa6";
import Link from "next/link";

export default function MovieCard(props: TTmdbMedia) {
  const { id, poster_path, vote_average } = props;
  const title = "title" in props ? props.title : props.original_name;
  const release_date =
    "release_date" in props ? props.release_date : props.first_air_date;

  return (
    <Link className="w-[240px] flex-shrink-0" href={`/movie-detail/${id}`}>
      <img
        src={
          `https://image.tmdb.org/t/p/w500/${poster_path}` || thumbnail01.src
        }
        alt=""
        className="h-[360px] rounded-md"
      />

      <div className="flex items-start justify-between mt-4">
        <div className="flex flex-col gap-2">
          <h4 className="line-clamp-1 text-white font-bold text-xl">{title}</h4>
          <p className="text-sm font-bold text-white">
            {release_date.substr(0, 4)}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-200">
            <div className="flex items-center gap-2 font-bold">
              <Image
                src={star.src}
                alt="star"
                width={18}
                height={18}
                className="object-contain"
              />
              <span className="text-primary">{vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <button type="submit">
          <FaHeartCirclePlus className="text-[28px] text-white hover:animate-ping" />
        </button>
      </div>
    </Link>
  );
}
