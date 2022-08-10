import Image from "next/future/image"

export default function About() {
  return (
    <div id="about" className="max-w-7xl mx-auto py-16 md:mb-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-orange-200 bg-opacity-50">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="max-w-md mx-auto text-3xl font-extrabold text-orange-900 text-center lg:max-w-xl lg:text-left">
          我是一名<span className="text-orange-500">軟件工程師</span>，致力於 <span className="text-orange-700">UI 設計、應用程序開發和神經網絡以及深度機器學習研究</span>。
          <br /><br />
          作為一個<span className="underline decoration-orange-500 decoration-2">外向且積極進取</span>的人，具有<span className="underline decoration-orange-500 decoration-wavy decoration-2">無限</span>的創造力，在良好的 IT 環境中學習。<span className="text-yellow-600">渴望未來在設計和編程相關行業的大型專業跨國公司工作</span>。
        </h2>
        <div className="flow-root self-center mt-8 lg:mt-0">
          <div className="-mt-4 -ml-8 flex flex-wrap lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <Image className="h-24" src="/logos/CityU.png" alt="CityU" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <Image className="h-24" src="/logos/PolyU.webp" alt="PolyU" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}