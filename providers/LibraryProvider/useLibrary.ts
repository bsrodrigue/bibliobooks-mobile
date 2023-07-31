import { useContext } from "react";
import ContentContext from "./LibraryContext";

export default function useContent() {
    return useContext(ContentContext);
}