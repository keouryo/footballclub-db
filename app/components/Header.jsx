'use client'
import { Button, Popover, Select } from "@mantine/core"
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
                <Button variant="white" color="#171717" rightSection= {<IconChartBarPopular/>}>Статистика</Button>
            </div>
            <div>
            <Popover>
                    <Popover.Target>
                        <Button variant="white" color="#171717" rightSection= {<IconChartBarPopular/>}>Поиск</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                         <Select
                            rightSection={<></>}
                            label=""
                            placeholder="Выберите критерий"
                            // Поиск по клубу - вывести всех игроков / поиск по лиге и стране - вывести все клубы выбранной лиги и страны/ поиск матчей - вывести все матчи для определенной команды
                            data={['Поиск по клубу', 'Поиск по лиге и стране', 'Поиск матчей']}
                            comboboxProps={{ withinPortal: false }}
                         />
                     </Popover.Dropdown>
                </Popover>
            </div>
            <div>
                <Button variant="white" color="#171717" rightSection= {<IconTablePlus/>}> Добавить </Button>
            </div>
        </div>

    </header>
    )
}