import { Slide } from "../../types";

export const slides: Slide[] = [
    {
        id: '1',
        title: "Ecrivez",
        description: 'Libérez votre créativité et donnez naissance à des histoires formidables que vous partagerez avec une communauté nombreuse.',
        image: require('../../assets/illustrations/onboarding1.png')
    },
    {
        id: '2',
        title: "Lisez",
        description: 'Découvrez des tonnes d’histoires de genres différents! De l’aventure, de l’action, de la fantaisie et bien plus encore.',
        image: require('../../assets/illustrations/onboarding2.png')
    },
    {
        id: '3',
        title: "Partagez",
        description: 'Ne profitez pas seul de vos histoires favorites, partagez avec tous vos amis ce que vous aimez lire.',
        image: require('../../assets/illustrations/onboarding3.png'),
        nextTitle: "Terminer"
    },
]

