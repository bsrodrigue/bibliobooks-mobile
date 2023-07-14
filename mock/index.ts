import { Novel } from "../types";

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


