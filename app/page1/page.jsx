import { Button, Pagination, Select } from "@mantine/core";
import { Input } from "@mantine/core";
import { IconSearch, IconBuildingStadium } from "@tabler/icons-react";

export default function Page1() {
    return (
        <div className="pt-5 pl-4 pb-6">
            <h1 className="text-2xl font-bold mb-4">Поиск по клубу</h1>
            <div className="bg-white shadow-md p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <Input
                        rightSection={<IconSearch />}
                        placeholder="Поиск по клубам..."
                        className="w-1/3 mr-2"
                    />
                    <Select placeholder="Выбрать страну" className="w-1/6 mr-2" />
                    <Select placeholder="Выбрать лигу" className="w-1/6 mr-2" />
                    <Select placeholder="Выбрать город" className="w-1/6 mr-2" />
                    <Select placeholder="Выбрать год основания" className="w-1/6" />
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
                                <p className="text-sm">Premier League - Manchester, England - Est. 1878</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
                            <IconBuildingStadium className="size-12 opacity-50 mr-4" />
                            <div>
                                <p className="text-lg font-bold">Real Madrid</p>
                                <p className="text-sm">La Liga - Madrid, Spain - Est. 1902</p>
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