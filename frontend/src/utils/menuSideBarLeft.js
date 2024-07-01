import path from "./path"
import icons from "./icons"

const GoHome = icons.GoHome
const TbCategoryPlus = icons.TbCategoryPlus
const MdContactPhone = icons.MdContactPhone

const menuSideBarLeft = [
    {
        text: 'Home',
        path: path.home,
        icon: <GoHome size={24} />,
    },
    {
        text: 'Search game',
        path: path.search_game,
        icon: <TbCategoryPlus size={24} />,
    },
    {
        text: 'Contact',
        path: path.contact,
        icon: <MdContactPhone size={24} />,
    },
]

export default menuSideBarLeft