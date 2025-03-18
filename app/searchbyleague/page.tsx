import { Button, Pagination, Select } from "@mantine/core";
import React from "react";
import { IconBuildingStadium } from "@tabler/icons-react";

export default function Seachbyleague() {
    return (
        <div className="pt-5 pl-4 pb-6">
            <h1 className="text-2xl font-bold mb-4">Поиск по лиге и стране</h1>
            <div className="bg-white shadow-md p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    
                    <Select placeholder="Выбрать лигу" className="w-1/4 mr-2" />
                    <Select placeholder="Выбрать уровень лиги" className="w-1/4 mr-2" />
                    <Select placeholder="Выбрать страну" className="w-1/4 mr-2" />
                    <Select placeholder="Выбрать континент" className="w-1/4" />
                </div>
            </div>

            <div className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Результаты поиска</h1>
                        <p className="text-sm font-extralight">Показ 1-10 из 142 результатов</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
                            <IconBuildingStadium className="size-12 opacity-50 mr-4" />
                            <div>
                                <p className="text-lg font-bold">Manchester United</p>
                                <p className="text-sm">Country England | League level: First division | Continent Europe</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
                            <IconBuildingStadium className="size-12 opacity-50 mr-4" />
                            <div>
                                <p className="text-lg font-bold">Real Madrid</p>
                                <p className="text-sm">Country Spain | League level : First division | Continent Europe</p>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                        <Pagination total={10} />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}