export default function Header() {
    return (
        <a id="header" className="h-screen text-center flex flex-col justify-center bg-gradient-to-b dark:from-[var(--arc-palette-background)] dark:text-[var(--arc-palette-foregroundPrimary)]" href="#about">
            <h1 data-aos="zoom-in" data-aos-delay="250" data-aos-duration="500" className="text-8xl font-bold mb-3 dark:text-white">Hi <i className="fa-light fa-hand-wave text-orange-500"></i> I'm <span className="text-orange-600 dark:text-orange-300 underline decoration-dotted decoration-2 underline-offset-8">MING</span> !</h1>
            <h2 data-aos="zoom-in" data-aos-delay="750" data-aos-duration="500" className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-400">Glad to see you here <i className="fa-regular fa-face-laugh-wink"></i></h2>
        </a>
    )
}