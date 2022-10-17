export const Input = ({ type = "", min, max, errors = false, placeholder = "", register, name = "", customNameError = "", isCustomError = false, disabled = false, accept, className = "" }) => {

    return (
        <div>
            <input id={name} name={name} accept={accept} min={min} max={max} disabled={disabled} className={`${className} appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors ? "border-red-500 text-red-500" : ""}`} type={type} placeholder={placeholder}  {...register} />

            {errors.type === "required" && <div style={{
                paddingTop: "5px"
            }}>
                <p className="text-red-500 text-xs italic">{name} is required!!</p>
            </div>}
            {errors.type === "validate" && <div style={{
                paddingTop: "5px"
            }}>
                <p className="text-red-500 text-xs italic">{customNameError}</p>
            </div>}

            {isCustomError && <div style={{
                paddingTop: "5px"
            }}>
                <p className="text-red-500 text-xs italic">{customNameError}</p>
            </div>}

        </div>
    )
}

export const Textarea = ({ errors = false, placeholder = "", register, name = "", customNameError }) => {
    return <div>
        <textarea className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors ? "border-red-500 text-red-500" : ""}`} placeholder={placeholder} {...register}></textarea>
        {errors.type === "required" && <div style={{
            paddingTop: "5px"
        }}>
            <p className="text-red-500 text-xs italic">{name} is required!!</p>
        </div>}
        {errors.type === "validate" && <div style={{
            paddingTop: "5px"
        }}>
            <p className="text-red-500 text-xs italic">{customNameError}</p>
        </div>}
    </div>

}

export const Selected = ({ children, errors = false, placeholder = "", register, name = "", customNameError }) => {
    return <div>
        <select className={` block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors ? "border-red-500 text-red-500" : ""}`} placeholder={placeholder} {...register}>
            {children}
        </select>
        {errors.type === "required" && <div style={{
            paddingTop: "5px"
        }}>
            <p className="text-red-500 text-xs italic">{name} is required!!</p>
        </div>}
        {errors.type === "validate" && <div style={{
            paddingTop: "5px"
        }}>
            <p className="text-red-500 text-xs italic">{customNameError}</p>
        </div>}
    </div>
}