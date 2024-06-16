export default function HomeBanner() {
  return (
    <>
      <article className="h-80 flex items-center px-4">
        <div className="container mx-auto poppins text-white flex flex-col justify-center font-bold h-full">
          <h3 className="text-[18px] xs:text-[20px] sm:text-[30px] text-primary">
            어라? 이 작품 봤던 것 같은데...
            <br />
            아! 이 작품 보기로 했었는데...
          </h3>
          <h4 className="text-xl sm:text-2xl text-dark-4f">
            작품 시청 기록을 쉽게 관리해요 (˵ •̀ ᴗ - ˵ ) ✧
          </h4>
        </div>
      </article>
    </>
  );
}
