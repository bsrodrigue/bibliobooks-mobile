import { createChapter, deleteChapter, editChapter } from "../../../api/chapters";
import useCall from "../../../api/useCall";

export function useChapterWorkshop() {
    const { call: create, isLoading: isCreateLoading } = useCall(createChapter, {
        successMessage: "Chapitre créé avec succès!"
    });
    const { call: edit, isLoading: isEditLoading } = useCall(editChapter, {
        successMessage: "Chapitre modifié avec succès!"
    });
    const { call: del, isLoading: isDelLoading } = useCall(deleteChapter, {
        successMessage: "Chapitre supprimé avec succès!"
    });


    return {
        create, edit, del, isCreateLoading, isEditLoading, isDelLoading
    }
}