export default function InstitutionalHeader() {
  return (
    <div className="relative z-30 border-b border-black/10 bg-white shadow-[0_2px_10px_rgba(7,20,38,.14)]">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-5 px-6 py-2.5">
        <img
          src="/assets/institutional/logo-kemendikdasmen.png"
          alt="Kementerian Pendidikan Dasar dan Menengah"
          className="block h-9 w-auto flex-none md:h-14"
        />
        <div className="flex flex-wrap items-center gap-4 md:gap-[22px]">
          <img src="/assets/institutional/logo-pendidikan-bermutu.png" alt="Pendidikan Bermutu Untuk Semua" className="block h-5 w-auto md:h-[34px]" />
          <img src="/assets/institutional/logo-ramah.png" alt="Kemendikdasmen RAMAH" className="block h-5 w-auto md:h-[34px]" />
          <img src="/assets/institutional/logo-sobat-smp.png" alt="Sobat SMP" className="block h-[23px] w-auto md:h-[38px]" />
        </div>
      </div>
    </div>
  );
}
