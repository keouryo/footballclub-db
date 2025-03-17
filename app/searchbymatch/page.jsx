import { Button, Pagination, Select } from "@mantine/core";
import { IconBuildingStadium } from "@tabler/icons-react";

export default function Seachbymatch() {
    return (
        <div className="pt-5 pl-4 pb-6">
            <h1 className="text-2xl font-bold mb-4">Поиск по матчу</h1>

            <div className="bg-white shadow-md p-4 rounded-lg">
                <div className="flex justify-between items-center">
                    <Select placeholder="Год матча" className="w-1/4 mr-2" />
                    <Select placeholder="Выбрать сезон" className="w-1/4 mr-2" />
                    <Select placeholder="Выбрать лигу" className="w-1/4 mr-2" />
                    <Select placeholder="Выбрать команду" className="w-1/4" />
                </div>
            </div>

            <div className="mt-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Результаты поиска</h1>
                        <p className="text-sm font-extralight">Показ 1-10 из 142 результатов</p>
                    </div>

                    <div className="space-y-6">
                    
                        <div className="flex items-center justify-center p-6 bg-white shadow-md rounded-lg">
                            <div className="w-1/4 text-left space-y-2">
                                <p className="text-lg font-medium">Premier League</p>
                                <p className="text-md font-medium">Season 24/25</p>
                            </div>

                            <div className="flex flex-col items-center w-2/4 text-center space-y-2">
                                <div className="flex items-center justify-center space-x-6">
                                    <p className="text-xl font-bold">Manchester United</p>
                                    <span className="text-xl font-bold">2 - 1</span>
                                    <p className="text-xl font-bold">Liverpool</p>
                                </div>
                                <p className="text-md">15 March 2025</p>
                                <p className="text-md">Home: Manchester United</p>
                            </div>

                            <div className="w-1/4 flex justify-end">
                                <IconBuildingStadium className="size-12 opacity-50" />
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-6 bg-white shadow-md rounded-lg">
                            <div className="w-1/4 text-left space-y-2">
                                <p className="text-lg font-medium">Premier League</p>
                                <p className="text-md font-medium">Season 24/25</p>
                            </div>

                            <div className="flex flex-col items-center w-2/4 text-center space-y-2">
                                <div className="flex items-center justify-center space-x-6">
                                    <p className="text-xl font-bold">Liverpool</p>
                                    <span className="text-xl font-bold">0 - 0</span>
                                    <p className="text-xl font-bold">Manchester United</p>
                                </div>
                                <p className="text-md">20 October 2024</p>
                                <p className="text-md">Home: Liverpool</p>
                            </div>

                            <div className="w-1/4 flex justify-end">
                                <IconBuildingStadium className="size-12 opacity-50" />
                            </div>
                        </div>


                        <div className="flex items-center justify-center p-6 bg-white shadow-md rounded-lg">
                            <div className="w-1/4 text-left space-y-2">
                                <p className="text-lg font-medium">Premier League</p>
                                <p className="text-md font-medium">Season 24/25</p>
                            </div>

                            <div className="flex flex-col items-center w-2/4 text-center space-y-2">
                                <div className="flex items-center justify-center space-x-6">
                                    <p className="text-xl font-bold">Arsenal</p>
                                    <span className="text-xl font-bold">3 - 1</span>
                                    <p className="text-xl font-bold">Manchester United</p>
                                </div>
                                <p className="text-md">5 September 2024</p>
                                <p className="text-md">Home: Arsenal</p>
                            </div>

                            <div className="w-1/4 flex justify-end">
                                <IconBuildingStadium className="size-12 opacity-50" />
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
