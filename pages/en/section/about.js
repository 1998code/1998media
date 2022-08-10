import Image from "next/future/image"

export default function About() {
  return (
    <div id="about" className="max-w-7xl mx-auto py-16 md:mb-20 px-4 sm:py-24 sm:px-6 lg:px-8 bg-orange-200 bg-opacity-50">
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        <h2 className="max-w-md mx-auto text-3xl font-extrabold text-orange-900 text-center lg:max-w-xl lg:text-left">
          I'm a <span className="text-orange-500">Software Engineer</span> working on <span className="text-orange-700">UI Design, App Development & Neural Network, plus Deep Machine Learning Research</span>.
          <br /><br />
          As an <span className="underline decoration-orange-500 decoration-2">outgoing & motivated</span> person with <span className="underline decoration-orange-500 decoration-wavy decoration-2">unlimited</span> creativity, studying within a great IT environment. <span className="text-yellow-600">Eager to work in a large and professional MNC in Design and Programming related industry in the future.</span>
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