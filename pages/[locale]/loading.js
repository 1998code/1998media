export default function Loading(props) {
  return (
    // <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 text-3xl text-orange-400 dark:text-orange-300 px-3">
    //   <i className="fa fa-circle-notch fa-spin text-9xl" />
    // </div>
    <div
      id="header"
      className="h-[95vh] text-center flex flex-col justify-center bg-gradient-to-b dark:from-[var(--arc-palette-background)] dark:text-[var(--arc-palette-foregroundPrimary)]"
    >
      <div className="mb-3 bg-gray-100 dark:bg-gray-900 w-[45vw] h-24 mx-auto rounded-md animate-pulse"></div>
      <div className="bg-gray-100 dark:bg-gray-900 w-[50vw] h-16 mx-auto rounded-md animate-pulse"> </div>
      <div className="h-[60vh] hidden sm:block">
        <spline-viewer
          url="https://cdn.1998.media/3ds/pig.splinecode"
          events-target="global"
        ></spline-viewer>
      </div>
    </div>
  );
}
