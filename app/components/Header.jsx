import { Button, NavLink } from "@mantine/core"
import {IconBallFootball, IconChartBarPopular, IconInputSearch, IconTablePlus} from "@tabler/icons-react"



export default function Header(){
    return(
    <header className="text-2xl pt-4 pl-5 pr-5 pb-4">
        <div className="flex items-center ">
        <IconBallFootball/> 
            <div className="flex-auto ">
            <h1>Футбольная база данных</h1>
            </div>
            <div>
                <Button variant="white" color="#171717"  rightSection= {<IconChartBarPopular/>}>Статистика</Button>

            </div>
            <div>
                <Button variant="white" color="#171717" rightSection= {<IconInputSearch/>}>Поиск </Button>
            </div>
            <div>
                <Button variant="white" color="#171717" rightSection= {<IconTablePlus/>}> Добавить </Button>
            </div>
        </div>

    </header>
    )
}