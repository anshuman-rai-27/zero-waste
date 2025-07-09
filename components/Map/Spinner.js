'use client'
import { Puff } from "react-loader-spinner"

function Spinner(){
    return (
        <div className="absolute w-[100vw] h-[100vh] flex justify-center items-center bg-none z-50">
            <Puff
                height={80}
                width={80}
                color="red"
                ariaLabel="loading"
            />
        </div>
    )
}

export default Spinner
