import Image from "next/future/image"

export default function About() {
  return (
    <div id="about" className="max-w-7xl mx-auto py-16 md:mb-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-orange-200 dark:bg-orange-800 bg-opacity-50">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="max-w-md mx-auto text-3xl font-extrabold text-orange-900 dark:text-orange-100 text-center lg:max-w-xl lg:text-left">
          我是一名 <span className="text-orange-500 dark:text-orange-400"><i class="fa-regular fa-computer-classic"></i> 軟件工程師</span>，致力於 <span className="text-orange-700 dark:text-orange-300"><i class="fa-regular fa-sidebar"></i> 用戶界面設計、<i class="fa-regular fa-command"></i> 應用程式開發、<i class="fa-regular fa-brain-circuit"></i> 人工神經網絡規劃，以及 <i class="fa-regular fa-server"></i> 深度機器學習研究</span>。
          <br /><br />
          作為一個 <i class="fa-regular fa-person-to-portal"></i> <span className="underline decoration-orange-500 decoration-2">外向且積極進取</span> <i class="fa-regular fa-person-from-portal"></i> 的人，具有<span className="underline decoration-orange-500 decoration-wavy decoration-2">無限</span>的創造力 <i class="fa-regular fa-paintbrush-pencil"></i>，在優秀的 IT 環境中學習。<span className="text-yellow-600 dark:text-yellow-400">渴望未來在設計和編程相關專業行業的大型跨國公司工作 <i class="fa-regular fa-briefcase"></i> </span>。
        </h2>
        <div className="flow-root self-center mt-8 lg:mt-0">
          <div className="-mt-4 -ml-8 flex flex-wrap lg:-ml-4">
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <Image className="h-24 dark:hidden" src="/logos/CityU.png" alt="CityU" />
              <Image className="h-24 hidden dark:block" src="/logos/CityU_dark.png" alt="CityU" />
            </div>
            <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
              <Image className="h-24 dark:hidden" src="/logos/PolyU.webp" alt="PolyU" />
              <Image className="h-24 hidden dark:block" src="/logos/PolyU_dark.webp" alt="PolyU" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}