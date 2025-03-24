'use client'
import React, { useEffect, useState } from 'react'
import { Button, Pagination, Select, Input, Loader } from '@mantine/core'
import { IconBuildingStadium, IconSearch } from '@tabler/icons-react'
import axios from 'axios'

export interface Country {
  id: string
  countryName: string
  countryCodeShort: string
  continent: string
}

export interface League {
  id: string
  leagueName: string
  leagueLevel: string
  countryid: string | null
  country?: Country
  clubCount?: number
}

export interface FootballClub {
  id: string
  clubName: string
  foundationYear: string
  city: string
  countryid?: string | null
  leagueid?: string | null
}

export interface Match {
  id: string
  season: string
  matchDate: string
  scoreHomeAway: string
  idAwayClub?: string | null
  idHomeClub?: string | null
  idLeague?: string | null
}

export interface Player {
  id: string
  name: string
  position: string
  birthdayDate: string
  clubId?: string | null
}

interface SelectOption {
  value: string
  label: string
  continent?: string
}

export default function SearchByLeague() {
  const [searchValue, setSearchValue] = useState('')
  const [selectedLeague, setSelectedLeague] = useState('')
  const [selectedLeagueLevel, setSelectedLeagueLevel] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedContinent, setSelectedContinent] = useState('')

  const [initialCountriesList, setInitialCountriesList] = useState<SelectOption[]>([])
  const [continentsList, setContinentsList] = useState<SelectOption[]>([])
  const [leagueLevelsList, setLeagueLevelsList] = useState<SelectOption[]>([])
  const [leaguesList, setLeaguesList] = useState<League[]>([])

  const [countriesList, setCountriesList] = useState<SelectOption[]>([])
  const [results, setResults] = useState<League[]>([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [countriesRes, leaguesRes] = await Promise.all([
        axios.get('/api/coutries'),
        axios.get('/api/leagues'),
      ])

      const countries: Country[] = countriesRes.data
      const leagues: League[] = leaguesRes.data

      const uniqueContinents: SelectOption[] = Array.from(
        new Set(countries.map((country) => country.continent))
      )
        .map((continent) => ({
          value: String(continent),
          label: String(continent),
        }))
        .sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label))

      const uniqueLeagueLevels: SelectOption[] = Array.from(
        new Set(leagues.map((league) => league.leagueLevel))
      )
        .map((level) => ({
          value: String(level),
          label: String(level),
        }))
        .sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label))

      const mappedCountries: SelectOption[] = countries
        .map((country) => ({
          value: String(country.id),
          label: country.countryName,
          continent: country.continent,
        }))
        .sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label))

      const mappedLeagues: League[] = leagues
        .map((league) => ({
          ...league,
          id: String(league.id),
          leagueLevel: league.leagueLevel,
          countryid: league.countryid,
        }))
        .sort((a: League, b: League) => a.leagueName.localeCompare(b.leagueName))

      setInitialCountriesList(mappedCountries)
      setCountriesList(mappedCountries)
      setLeaguesList(mappedLeagues)
      setContinentsList(uniqueContinents)
      setLeagueLevelsList(uniqueLeagueLevels)
    } catch (error) {
      console.error('Ошибка при загрузке данных', error)
    }
  }

  const handleCountryFilter = (countryId: string) => {
    setSelectedCountry(countryId)

    // Фильтруем доступные лиги по выбранной стране
    const filteredLeagues = leaguesList.filter(
      (league) => league.countryid === countryId
    )

    // Получаем уникальные уровни лиг для выбранной страны
    const uniqueLevels = Array.from(
      new Set(filteredLeagues.map((league) => league.leagueLevel))
    )
      .map((level) => ({
        value: String(level),
        label: String(level),
      }))
      .sort((a, b) => a.label.localeCompare(b.label))

    setLeagueLevelsList(uniqueLevels)

    if (!filteredLeagues.some((league) => league.leagueLevel === selectedLeagueLevel)) {
      setSelectedLeagueLevel('')  // Сброс уровня лиги, если нет подходящих лиг
    }
  }

  const handleSearch = async () => {
    setIsLoading(true)

    try {
      console.log('Search parameters:', {
        search: searchValue,
        leagueId: selectedLeague,
        leagueLevel: selectedLeagueLevel,
        countryId: selectedCountry,
        continent: selectedContinent,
      })

      const response = await axios.get('/api/leagues', {
        params: {
          search: searchValue,
          leagueId: selectedLeague,
          leagueLevel: selectedLeagueLevel,
          countryId: selectedCountry,
          continent: selectedContinent,
        },
      })

      setResults(response.data)
    } catch (error) {
      console.error('Ошибка при поиске лиг', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-5 pl-4 pb-6 pr-4">
      <h1 className="text-2xl font-bold mb-4">Поиск по лигам и странам</h1>

      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div className="flex flex-wrap gap-4">
          <Input
            rightSection={<IconSearch />}
            placeholder="Поиск по названию лиги..."
            className="flex-1 min-w-[200px]"
            value={searchValue}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />

          <Select
            placeholder="Выбрать страну"
            className="flex-1 min-w-[200px]"
            data={countriesList}
            value={selectedCountry}
            onChange={(val) => handleCountryFilter(val || '')}
          />
          <Select
            placeholder="Выбрать уровень лиги"
            className="flex-1 min-w-[200px]"
            data={leagueLevelsList}
            value={selectedLeagueLevel}
            onChange={(val) => setSelectedLeagueLevel(val || '')}
          />

          <Select
            placeholder="Выбрать континент"
            className="flex-1 min-w-[200px]"
            data={continentsList}
            value={selectedContinent}
            onChange={(val) => setSelectedContinent(val || '')}
          />
        </div>

        <div className="flex justify-start">
          <Button onClick={handleSearch}>Поиск</Button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center mt-6">
          <Loader />
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="flex justify-center mt-6 text-gray-500">
          Ничего не найдено
        </div>
      )}

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
              {results.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <div className="flex items-center">
                    <IconBuildingStadium className="size-12 opacity-50 mr-4" />
                    <p className="text-lg font-bold">{item.leagueName}</p>
                    <p className="text-lg ml-2">
                      Страна: {item.country?.countryName || 'Неизвестно'} |
                      Уровень лиги: {item.leagueLevel} |
                      Континент: {item.country?.continent || 'Неизвестно'} |
                      Количество клубов: {item.clubCount || 0}
                    </p>
                  </div>
                </div>
              ))}

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
