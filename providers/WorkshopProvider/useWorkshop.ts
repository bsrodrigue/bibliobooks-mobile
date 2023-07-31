import { useContext } from "react";
import ContentContext from "./WorkshopContext";

export default function useContent() {
    return useContext(ContentContext);
}