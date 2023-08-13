import { useContext } from "react";
import ContentContext from "./LibraryContext";

export default function useContent() {
    const context = useContext(ContentContext);
    return { ...context }
}