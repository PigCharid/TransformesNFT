import { useGlobalState } from '../store'
const Loading = () => {
  const [loading] = useGlobalState('loading')

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen
      flex items-center justify-center bg-black 
      bg-opacity-50 transform transition-transform
      duration-300 ${loading.show ? 'scale-100' : 'scale-0'}`}
    >
      <div
        className="flex flex-col justify-center
        items-center bg-[#151c25] shadow-xl 
        shadow-[#7749E7] rounded-xl 
        min-w-min px-10 pb-2 text-white font-rajdhani font-bold "
      >
        <div className="flex flex-row justify-center items-center">
          <div className="lds-dual-ring scale-50"></div>
          <p className="text-lg">Transformers is accelerating...</p>
        </div>
        <p className=" font-bold">{loading.msg}</p>
      </div>
    </div>
  )
}

export default Loading
