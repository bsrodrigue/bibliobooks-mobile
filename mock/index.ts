import { Chapter, Novel } from "../types";

const description = "Il s’agit d’une histoire vraiment et franchement historique. Rien de plus vrai que l’histoire de l’histoire de vos meilleures histoires historiques. J’avais juste la flemme d’utiliser un lorem ipsum, ironique..."

export const novels: Novel[] = [
    {
        title: "La grande aventure - Tome 1",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/dragon.jpg"),
        status: "published"
    },
    {
        title: "La grande aventure - Tome 2",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/lizard.jpg"),
        status: "published"
    },
    {
        title: "La grande aventure - Tome 3",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/traditional.jpg"),
        status: "published"
    },
    {
        title: "La grande aventure - Tome 4",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/action.jpg"),
        status: "published"
    },
    {
        title: "La grande aventure - Tome 5",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/fantasy.jpg"),
        status: "draft"
    },
    {
        title: "La grande aventure - Tome 6",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/lizard.jpg"),
        status: "draft"
    },
    {
        title: "La grande aventure - Tome 7",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/dragon.jpg"),
        status: "draft"
    },
    {
        title: "La grande aventure - Tome 8",
        description,
        chapterCount: 26,
        imgSrc: require("../assets/images/romance.jpg"),
        status: "archived"
    },
];

const paragraph = "In nostrud ullamco ullamco proident magna labore proident ex laboris. Pariatur velit ut nulla ipsum reprehenderit. Deserunt dolore officia veniam ad eiusmod eu incididunt est dolore anim ipsum culpa culpa consectetur. Culpa elit tempor mollit ullamco sint commodo. Laborum elit et cupidatat qui magna. Elit commodo proident commodo officia anim nostrud exercitation.";

export const chapters: Chapter[] = [
    {
        id: "1",
        title: "Prologue: The Dawn of Exodia",
        body: paragraph,
        status: "published",
    },
    {
        id: "2",
        title: "Chapitre 1: Booba le boss",
        body: paragraph,
        status: "published",
    },
    {
        id: "3",
        title: "Chapitre 2: Kaaris et Booba",
        body: paragraph,
        status: "published",
    },
    {
        id: "4",
        title: "Chapitre 3: Les racailles du quartier",
        body: paragraph,
        status: "published",
    },
    {
        id: "5",
        title: "Chapitre 4: Le daron de Booba",
        body: paragraph,
        status: "published",
    },
    {
        id: "6",
        title: "Chapitre 5: La ceinture sanglante du Padre del Booba",
        body: paragraph,
        status: "published",
    },
    {
        id: "7",
        title: "Chapitre 6: Booba contre Kaaris",
        body: paragraph,
        status: "draft",
    },
];