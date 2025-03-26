'use client'
import React, { useEffect, useState } from 'react'
import { Button, Pagination, Select, Loader } from '@mantine/core'
import { IconBuildingStadium } from '@tabler/icons-react'
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

interface SelectOption {
  value: string
  label: string
}

export default function SearchByLeague() {
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const [countriesList, setCountriesList] = useState<SelectOption[]>([])
  const [leaguesList, setLeaguesList] = useState<League[]>([])
  const [filteredLeagues, setFilteredLeagues] = useState<SelectOption[]>([])
  const [filteredCountries, setFilteredCountries] = useState<SelectOption[]>([])
  const [results, setResults] = useState<League[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isCountryFiltered, setIsCountryFiltered] = useState(false) // Новое состояние
  const [isLeagueFiltered, setIsLeagueFiltered] = useState(false) // Новое состояние

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    updateFilters()
    handleSearch()
  }, [selectedLeague, selectedCountry])

  const fetchInitialData = async () => {
    try {
      const [countriesRes, leaguesRes] = await Promise.all([
        axios.get('/api/coutries'),
        axios.get('/api/leagues'),
      ]);
  
      const countries: Country[] = countriesRes.data;
      const leagues: League[] = leaguesRes.data;
  
      // Создаем Set уникальных ID стран, у которых есть лиги
      const countryIdsWithLeagues = new Set(
        leagues
          .filter((league) => league.countryid !== null)
          .map((league) => league.countryid)
      );
  
      // Фильтруем страны, оставляя только те, у которых есть лиги
      const filteredCountries = countries.filter((country) =>
        countryIdsWithLeagues.has(String(country.id))
      );
  
      const mappedCountries: SelectOption[] = filteredCountries.map((country) => ({
        value: String(country.id),
        label: country.countryName,
      }));
  
      const mappedLeagues: League[] = leagues.map((league) => ({
        ...league,
        id: String(league.id),
        leagueLevel: league.leagueLevel,
        countryid: league.countryid,
      }));
  
      setCountriesList(mappedCountries);
      setLeaguesList(mappedLeagues);
      setFilteredCountries(mappedCountries); // Начальное состояние фильтрованных стран
      setFilteredLeagues(leaguesList.map((league) => ({ value: league.id, label: league.leagueName })));
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  };

  const updateFilters = () => {
    if (isCountryFiltered && selectedCountry) {
      // Фильтруем лиги по выбранной стране
      setFilteredLeagues(
        leaguesList
          .filter(league => league.countryid === selectedCountry)
          .map(league => ({ value: league.id, label: league.leagueName }))
      )
    } else {
      // Восстанавливаем полный список лиг
      setFilteredLeagues(leaguesList.map(league => ({ value: league.id, label: league.leagueName })))
    }

    if (isLeagueFiltered && selectedLeague) {
      // Фильтруем страны по выбранной лиге
      const league = leaguesList.find(league => league.id === selectedLeague)
      if (league && league.countryid) {
        setFilteredCountries(countriesList.filter(country => country.value === league.countryid))
      } else {
        setFilteredCountries([])
      }
    } else {
      // Восстанавливаем полный список стран
      setFilteredCountries(countriesList)
    }
  }

  const handleFilterSelection = (type: 'country' | 'league', value: string | null) => {
    if (type === 'country') {
      // При выборе страны очищаем лигу и обновляем флаг фильтрации
      setSelectedCountry(value)
      setSelectedLeague(null)
      setIsCountryFiltered(true)
      setIsLeagueFiltered(false) // Сбрасываем фильтр лиг
      if (value) {
        setFilteredLeagues(
          leaguesList
            .filter(league => league.countryid === value)
            .map(league => ({ value: league.id, label: league.leagueName }))
        )
      } else {
        setFilteredLeagues(leaguesList.map(league => ({ value: league.id, label: league.leagueName })))
      }
    } else if (type === 'league') {
      // При выборе лиги очищаем страну и обновляем флаг фильтрации
      setSelectedLeague(value)
      setIsLeagueFiltered(true)
      setIsCountryFiltered(false) // Сбрасываем фильтр стран
      if (value) {
        const league = leaguesList.find(league => league.id === value)
        if (league && league.countryid) {
          setSelectedCountry(league.countryid)
          setFilteredCountries(countriesList.filter(country => country.value === league.countryid))
        } else {
          setSelectedCountry(null)
          setFilteredCountries([])
        }
      } else {
        setSelectedCountry(null)
        setFilteredCountries(countriesList)
      }
    }
  }

  const handleSearch = async () => {
    setIsLoading(true)

    try {
      const response = await axios.get('/api/leagues', {
        params: {
          leagueId: selectedLeague,
          countryId: selectedCountry,
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
      <h1 className="text-2xl font-bold mb-4">Поиск по стране и лиге</h1>

      <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
        <div className="flex flex-wrap gap-4">
          <Select
            placeholder="Выбрать страну"
            className="flex-1 min-w-[200px]"
            data={isCountryFiltered ? filteredCountries : countriesList}
            value={selectedCountry}
            onChange={(val) => handleFilterSelection('country', val || null)}
          />
          <Select
            placeholder="Выбрать лигу"
            className="flex-1 min-w-[200px]"
            data={isCountryFiltered ? filteredLeagues : leaguesList.map(league => ({ value: league.id, label: league.leagueName }))}
            value={selectedLeague}
            onChange={(val) => handleFilterSelection('league', val || null)}
          />
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
                <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}