import { createContext } from "react";

type ContentContextType = {
}

const ContentContext = createContext<ContentContextType | null>(null);

export default ContentContext;