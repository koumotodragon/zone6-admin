// import { useSubmit } from "react-router-dom";
import { ImCross } from "react-icons/im";
export const Tag = ({ children }: any) => {
    // const submit = useSubmit()
    return <>
        {children}
        <ImCross />
    </>
}