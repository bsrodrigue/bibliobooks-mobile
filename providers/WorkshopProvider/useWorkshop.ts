import { useContext } from "react";
import ContentContext from "./WorkshopContext";

export default function useContent() {
    const context = useContext(ContentContext);
    return { ...context };
}