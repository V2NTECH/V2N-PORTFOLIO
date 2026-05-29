import enguiaSite from '../../assets/img/enguiaSite.png'

export function HeroRibbon() {
  return (
    <div
      className="hero-ribbon pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div className="hero-ribbon__glow" />
      <img
        src={enguiaSite}
        alt=""
        className="hero-ribbon__img"
        width={520}
        height={900}
        draggable={false}
      />
    </div>
  )
}
