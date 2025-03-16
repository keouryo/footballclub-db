import { Button, Select } from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch, IconBuildingStadium } from "@tabler/icons-react";

export default function Page1(){
    return(
        <div className="pt-5 pl-4 pb-6 ">
            <div className="">
            <h1 className="text-2xl font-bold pl-6 ">Поиск по клубу</h1>
            <div className="flex justify-between bg-white shadow-md pl-2 ">
            <div className="p-4  rounded-lg  mr-4 w-2/5">
                <Input rightSection={<IconSearch/>} placeholder="Поиск по клубу"/>
            </div>
            
            <div className="p-4  rounded-lg  mr-4 w-1/6">
                <Select placeholder="Выбрать страну"/>
            </div>
            <div className="p-4  rounded-lg  mr-4 w-1/6">
                <Select placeholder="Выбрать лигу"/>
            </div>
            <div className="p-4  rounded-lg  mr-4 w-1/6">
            <Select placeholder="Выбрать город"/>
            </div>
            <div className="p-4  rounded-lg  mr-4 w-1/6">
            <Select placeholder="Выбрать год создания"/>
            </div>
            </div>
            </div>
            <div className="pt-6">
        <div className=" bg-white rounded-lg shadow-md ">
            <div className="flex justify-between pt-6 items-center  ">
            <h1 className="text-2xl font-bold pl-6">Результаты поиска</h1>
            <p className="text-sm font-extralight mr-4">Отображение 1-10 результатов из 50</p>
            </div>
            <div className="flex justify-start pl-6 pt-6 pb-6 bg-white shadow-md">
            <IconBuildingStadium className="size-12 opacity-50"/>
            <div className="  pl-6">
                 <p className="text-lg font-bold">
                    Manchester United
                </p>
                <div className="text-sm">
                    <p>Premier League   Manchester,England   Est.1878</p>
                </div>
            </div>
            </div>
            <div className="flex justify-start pl-6 pt-6 pb-6 bg-white shadow-md">
            <IconBuildingStadium className="size-12 opacity-50"/>
            <div className="  pl-6">
                 <p className="text-lg font-bold">
                    Manchester United
                </p>
                <div className="text-sm">
                 <p>Premier League   Manchester,England   Est.1878</p>
                </div>
            </div>
            </div>
            </div>
        </div>
        </div>

    )
}
