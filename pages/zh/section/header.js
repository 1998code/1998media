export default function Header() {
    return (
        <a id="header" className="h-screen text-center flex flex-col justify-center" href="#about">
            <h1 className="text-8xl font-bold mb-3">嗨 <i class="fa-light fa-hand-wave text-orange-500"></i> 我是 <span class="text-orange-600 underline decoration-dotted decoration-2 underline-offset-8">MING</span>！</h1>
            <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-400">很高興見到你 <i class="fa-regular fa-face-laugh-wink"></i></h2>
        </a>
    )
}