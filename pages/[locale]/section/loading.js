export default function Loading(props) {

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen gap-6 text-3xl text-orange-400 dark:text-orange-300">
            <i className="fa fa-circle-notch fa-spin text-9xl" />
            <span className="animate-pulse">Initalizing, please wait a moment...</span>
        </div>
    )
}