'use client'

import React, { useEffect, useState } from 'react'
import { Button, Pagination, Select, Input, Loader } from '@mantine/core'
import { IconBuildingStadium, IconSearch } from '@tabler/icons-react'
import axios from 'axios'

export default function SearchByLeague() {
  // Состояния для фильтров
  const [searchValue, setSearchValue] = useState('')
  const [selectedLeague, setSelectedLeague] = useState('')
  const [selectedLeagueLevel, setSelectedLeagueLevel] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('')

  // Исходные списки
  const [initialCountriesList, setInitialCountriesList] = useState([])

  // Данные
  const [continentsList, setContinentsList] = useState([])
  const [leagueLevelsList, setLeagueLevelsList] = useState([])
  const [leaguesList, setLeaguesList] = useState([])

  // Фильтрованные данные
  const [countriesList, setCountriesList] = useState([])

  const [results, setResults] = useState([])

  // Состояния загрузки
  const [isLoading, setIsLoading] = useState(false)

  // Получаем страны и лиги при монтировании компонента
  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [countriesRes, leaguesRes] = await Promise.all([
        axios.get('/api/coutries'),
        axios.get('/api/leagues'),
      ])

      const countries = countriesRes.data
      const leagues = leaguesRes.data

      // Уникальные континенты
      const uniqueContinents = Array.from(
        new Set(countries.map((country: any) => country.continent))
      ).map((continent) => ({
        value: continent,
        label: continent,
      }))

      // Уникальные уровни лиг
      const uniqueLeagueLevels = Array.from(
        new Set(leagues.map((league: any) => league.leagueLevel))
      ).map((level) => ({
        value: level,
        label: level,
      }))

      const mappedCountries = countries.map((country: any) => ({
        value: String(country.id),
        label: country.countryName,
        continent: country.continent,
      }))

      const mappedLeagues = leagues.map((league: any) => ({
        id: String(league.id),
        label: league.leagueName,
        value: String(league.id),
        leagueLevel: league.leagueLevel,
        countryId: String(league.countryid), // Используем countryid
      }))

      setInitialCountriesList(mappedCountries)
      setCountriesList(mappedCountries)
      setLeaguesList(mappedLeagues)
      setContinentsList(uniqueContinents)
      setLeagueLevelsList(uniqueLeagueLevels)
    } catch (error) {
      console.error('Ошибка при загрузке данных', error)
    }
  }




  const handleCountryFilter = (leagueLevel: string) => {
    setSelectedLeagueLevel(leagueLevel)

    if (!leagueLevel) {
      console.log('Сброс фильтра лиг. Восстановление полного списка стран.')
      setCountriesList(initialCountriesList)
      return
    }

    // Логируем исходные данные
    console.log('Исходные лиги:', leaguesList)
    console.log('Исходные страны:', initialCountriesList)

    // Фильтруем лиги по уровню
    const filteredLeagues = leaguesList.filter(
      (league) => league.leagueLevel === leagueLevel
    )

    console.log('Отфильтрованные лиги:', filteredLeagues)

    // Проверка, что каждая лига содержит countryid
    const countryIds = Array.from(
      new Set(
        filteredLeagues
          .map((league) => {
            // Логируем каждый countryid
            console.log('league.countryid', league.countryId)
            return league.countryId ? String(league.countryId) : null // Проверяем наличие countryId
          })
          .filter((id) => id !== null) // Убираем null значения
      )
    )

    console.log('ID стран из отфильтрованных лиг:', countryIds)

    // Фильтруем страны по найденным countryIds
    const filteredCountries = initialCountriesList.filter((country) =>
      countryIds.includes(String(country.value)) // Сравниваем с полем value (id страны)
    )

    console.log('Отфильтрованные страны:', filteredCountries)

    // Обновляем список стран
    setCountriesList(filteredCountries)

    // Если текущая выбранная страна не входит в отфильтрованный список, сбрасываем её
    if (!countryIds.includes(selectedCountry)) {
      console.log('Сброс выбранной страны:', selectedCountry)
      setSelectedCountry('')
    }
  }

  const handleSearch = async () => {
    setIsLoading(true);
  
    try {
      console.log('Search parameters:', {
        search: searchValue,
        leagueId: selectedLeague,
        leagueLevel: selectedLeagueLevel,
        countryId: selectedCountry,
        continent: selectedContinent,
      });
  
      const response = await axios.get('/api/leagues', {
        params: {
          search: searchValue,
          leagueId: selectedLeague,
          leagueLevel: selectedLeagueLevel,
          countryId: selectedCountry,
          continent: selectedContinent,
        },
      });
  
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при поиске лиг', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pt-5 pl-4 pb-6 pr-4">
      <h1 className="text-2xl font-bold mb-4">Поиск по лигам и странам</h1>

      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        {/* Фильтры */}
        <div className="flex flex-wrap gap-4">
          <Input
            rightSection={<IconSearch />}
            placeholder="Поиск по названию лиги..."
            className="flex-1 min-w-[200px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />

          <Select
            placeholder="Выбрать уровень лиги"
            className="flex-1 min-w-[200px]"
            data={leagueLevelsList}
            value={selectedLeagueLevel}
            onChange={(val) => handleCountryFilter(val || '')}
          />

          <Select
            placeholder="Выбрать страну"
            className="flex-1 min-w-[200px]"
            data={countriesList}
            value={selectedCountry}
            onChange={(val) => setSelectedCountry(val || '')}
          />

          <Select
            placeholder="Выбрать континент"
            className="flex-1 min-w-[200px]"
            data={continentsList}
            value={selectedContinent}
            onChange={(val) => setSelectedContinent(val || '')}
          />
        </div>

        {/* Кнопка поиска на новой строке */}
        <div className="flex justify-start">
          <Button onClick={handleSearch}>Поиск</Button>
        </div>
      </div>

      {/* Loader при загрузке */}
      {isLoading && (
        <div className="flex justify-center mt-6">
          <Loader />
        </div>
      )}

      {/* Если нет результатов */}
      {!isLoading && results.length === 0 && (
        <div className="flex justify-center mt-6 text-gray-500">
          Ничего не найдено
        </div>
      )}

      {/* Если есть результаты */}
      {!isLoading && results.length > 0 && (
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Результаты поиска</h1>
              <p className="text-sm font-extralight">
                Показано {results.length} результатов
              </p>
            </div>

            <div className="space-y-4">
              {results.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center p-4 bg-white shadow-md rounded-lg"
                >
                  <IconBuildingStadium className="size-12 opacity-50 mr-4" />

                  <div>
                    <p className="text-lg font-bold">{item.leagueName}</p>
                    <p className="text-sm text-gray-600">
                      Страна: {item.country.countryName} | Уровень лиги:{' '}
                      {item.leagueLevel} | Континент:{' '}
                      {item.country.continent}
                    </p>
                  </div>
                </div>
              ))}

              {/* Пагинация (заглушка) */}
              <div className="flex justify-center mt-4">
                <Pagination total={1} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
