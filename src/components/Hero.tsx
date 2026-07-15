export function Hero() {
  return (
    <section
      className="relative flex h-[267px] w-full items-center justify-center overflow-hidden rounded-[20px] border border-brand-soft"
      style={{
        backgroundImage: "url(/images/gov-grant/gov-banner-img.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex flex-col items-center gap-6 px-10 text-center">
        <div>
          <p className="text-sm font-bold text-white/80">AI 기반 과제 추천 서비스</p>
          <h2 className="mt-3 text-[28px] font-bold leading-snug text-white">
            우리 기관에 딱 맞는 과제를
            <br />
            매일 아침 추천받고 알림으로 확인해보세요!
          </h2>
        </div>
        <button
          type="button"
          className="rounded-[5px] bg-white px-[25px] py-[14px] text-base font-bold text-brand hover:brightness-95"
        >
          과제 추천 정보 수정하기
        </button>
      </div>
    </section>
  );
}
