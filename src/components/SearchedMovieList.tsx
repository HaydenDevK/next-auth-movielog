"use client";

import { resetMovieAction, searchMovieActionMore } from "@/libs/actions";
import { TTmdbMedia } from "@/type/movie";
import { useEffect, useRef } from "react";
import { FaHeartCirclePlus } from "react-icons/fa6";
import Loader from "./Loader";
import Link from "next/link";

export default function SearchedMovieList({
  searchedMediaList,
  searchKeyword,
}: {
  searchedMediaList: TTmdbMedia[];
  searchKeyword: FormDataEntryValue;
}) {
  const pageRef = useRef(2);
  useEffect(() => {
    return () => {
      resetMovieAction();
    };
  }, []);
  if (searchedMediaList.length > 1)
    return (
      <>
        <h3 className="mb-3 text-md font-[500] leading-normal text-primary">
          "{searchKeyword.toString()}" 검색 결과
        </h3>
        <ul className="max-h-40 border border-dark-4f rounded-lg overflow-y-scroll">
          {searchedMediaList.map((media: TTmdbMedia) => (
            <li key={media.id}>
              <form className="flex gap-[14px] h-11 pr-[14px] py-lg">
                <input required type="hidden" value={"movie.title"} />
                <Link
                  href={`media-detail/${media.id}`}
                  className="w-full pl-[14px] rounded-lg text-[14px] font-[500] leading-normal text-left text-light-ac hover:text-primary"
                  type="submit"
                >
                  {"title" in media ? media.title : media.original_name}
                </Link>

                <button>
                  <FaHeartCirclePlus className="text-[20px] text-primary hover:animate-ping" />
                </button>
              </form>
            </li>
          ))}
          <Loader
            handleInView={() => {
              searchMovieActionMore(
                searchKeyword.toString(),
                pageRef.current.toString()
              );
              pageRef.current++;
            }}
          />
        </ul>
      </>
    );
}
