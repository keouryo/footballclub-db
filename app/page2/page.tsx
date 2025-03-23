'use client';
import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  TextInput,
  Select,
  Group,
} from '@mantine/core';
import React from 'react';
import {
  IconFlagCog,
  IconPlus,
  IconShirtSport,
  IconTrash,
  IconSoccerField,
} from '@tabler/icons-react';
import axios from 'axios';

interface ClubType {
  id: string;
  clubName: string;
  city: string;
  country?: {
    countryName: string;
  };
}
interface Country {
  id: string;
  countryName: string;
}

interface League {
  id: string;
  leagueName: string;
}


type Match = {
  id: string;
  homeClub: {
    id: string;
    clubName: string;
  };
  awayClub: {
    id: string;
    clubName: string;
  };
  matchDate: string;
  scoreHomeAway: string;
  season: string;
};

const CreateMatch = async ({
  season,
  matchDate,
  scoreHomeAway,
  idAwayClub,
  idHomeClub,
}: {
  season: string;
  matchDate: string;
  scoreHomeAway: string;
  idAwayClub?: string;
  idHomeClub?: string;
}) => {
  const data = await axios.post('api/matches', {
    season,
    matchDate,
    scoreHomeAway,
    idAwayClub,
    idHomeClub,
  });
  console.log(data);
};

const CreateCountry = async ({
  countryName,
  countryCodeShort,
  continent,
}: {
  countryName: string;
  countryCodeShort: string;
  continent: string;
}) => {
  const data = await axios.post('api/coutries', {
    countryName,
    countryCodeShort,
    continent,
  });
  console.log(data);
};

const CreateLeague = async ({
  leagueName,
  leagueLevel,
  countryid,
}: {
  leagueName: string;
  leagueLevel: string;
  countryid: string;
}) => {
  const data = await axios.post('api/leagues', {
    leagueName,
    leagueLevel,
    countryid,
  });
};

export default function Page2() {
  const [leagueModalOpened, setLeagueModalOpened] = useState(false);
  const [countryModalOpened, setCountryModalOpened] = useState(false);
  const [clubModalOpened, setClubModalOpened] = useState(false);
  const [matchModalOpened, setMatchModalOpened] = useState(false);
  const [footballClubs, setFootballClubs] = useState<ClubType[]>([]);
  const [leagueLevel, setLeagueLevel] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryCodeShort, setCountryCodeShort] = useState('');
  const [continent, setContinent] = useState('');
  const [clubName, setClubName] = useState('');
  const [foundationYear, setFoundationYear] = useState('');
  const [city, setCity] = useState('');
  const [clubCountry, setClubCountry] = useState('');
  const [clubLeague, setClubLeague] = useState('');
  const [season, setSeason] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [scoreHomeAway, setScoreHomeAway] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [homeClub, setHomeClub] = useState('');

  const [clubs, setClubs] = useState<ClubType[]>([]);
// Инициализация useState с типами
const [countries, setCountries] = useState<Country[]>([]);
const [leagues, setLeagues] = useState<League[]>([]);

  const [matches, setMatches] = useState<Match[]>([]);
  const [matchDeleteModalOpened, setMatchDeleteModalOpened] = useState(false);
  const [clubDeleteModalOpened, setClubDeleteModalOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const continentOptions = [
    { value: 'Africa', label: 'Africa' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'North America', label: 'North America' },
    { value: 'South America', label: 'South America' },
  ];

  // Загрузка данных для стран, клубов и лиг из API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countriesData = await axios.get('/api/coutries');
        const clubsData = await axios.get('/api/clubs');
        const leaguesData = await axios.get('/api/leagues');
        const matchesResponse = await axios.get('api/matches');

        setMatches(Array.isArray(matchesResponse.data) ? matchesResponse.data : []);
        setCountries(countriesData.data);
        setClubs(clubsData.data);
        setLeagues(leaguesData.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await fetch('/api/clubs');
        const data = await res.json();
        if (Array.isArray(data.clubs)) {
          setFootballClubs(data.clubs);
        } else {
          console.error('Ожидался массив clubs, а пришло:', data);
        }
      } catch (error) {
        console.error('Ошибка при получении клубов:', error);
      }
    };
    fetchClubs();
  }, []);

  const indexOfLastMatch = currentPage * pageSize;
  const indexOfFirstMatch = indexOfLastMatch - pageSize;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);
  const totalPages = Math.ceil(matches.length / pageSize);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const clubOptions =
    matches.length > 0
      ? [
          { value: matches[0].homeClub.id, label: matches[0].homeClub.clubName },
          { value: matches[0].awayClub.id, label: matches[0].awayClub.clubName },
        ]
      : [];

  const handleCountrySubmit = () => {
    CreateCountry({ countryName, countryCodeShort, continent });
    setCountryModalOpened(false);
    setCountryName('');
    setCountryCodeShort('');
    setContinent('');
  };

  const handleClubSubmit = () => {
    console.log({
      clubName,
      foundationYear,
      city,
      clubCountry,
      clubLeague,
    });
    setClubModalOpened(false);
    setClubName('');
    setFoundationYear('');
    setCity('');
    setClubCountry('');
    setClubLeague('');
  };

  const handleMatchSubmit = () => {
    CreateMatch({
      season,
      matchDate,
      scoreHomeAway,
      idAwayClub: awayClub,
      idHomeClub: homeClub,
    });
    setMatchModalOpened(false);
    setSeason('');
    setMatchDate('');
    setScoreHomeAway('');
    setAwayClub('');
    setHomeClub('');
  };

  const handleDeleteMatch = async (matchId: string) => {
    try {
      await axios.delete(`/api/matches/${matchId}`);
      const updatedMatches = matches.filter((match) => match.id !== matchId);
      setMatches(updatedMatches);
    } catch (error) {
      console.error('Ошибка при удалении матча:', error);
    }
  };

  const handleDeleteClub = async (clubId: string) => {
    try {
      await axios.delete(`/api/clubs/${clubId}`);
      const updatedClubs = footballClubs.filter((club) => club.id !== clubId);
      setFootballClubs(updatedClubs);
    } catch (error) {
      console.error('Ошибка при удалении клуба:', error);
    }
  };

  const handleCreateLeague = () => {
    CreateLeague({ leagueName, leagueLevel, countryid: clubCountry });
    setLeagueName('');
    setLeagueLevel('');
    setCountryName('');
  };

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4 ml-5">Редактирование базы данных</h1>
      <div className="flex flex-wrap space-y-4">
        {/* Редактирование футбольных команд */}
        <div className="bg-white shadow-md p-4 rounded-lg w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Редактировать футбольные команды</h1>
            <IconShirtSport />
          </div>
          <div className="flex flex-col mt-4">
            <Button
              className="w-full"
              variant="filled"
              color="#181363"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setClubModalOpened(true)}
            >
              Добавить команду
            </Button>
            <Button
              className="w-full mt-3"
              variant="filled"
              color="#7C7C80"
              radius="xl"
              leftSection={<IconTrash />}
              onClick={() => {
                console.log('Открываем модальное окно для удаления команды');
                setClubDeleteModalOpened(true);
              }}
            >
              Удалить команду
            </Button>
          </div>
        </div>

        {/* Редактирование футбольных матчей */}
        <div className="bg-white shadow-md p-4 rounded-lg w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Редактировать футбольные матчи</h1>
            <IconSoccerField />
          </div>
          <div className="flex flex-col mt-4">
            <Button
              className="w-full"
              variant="filled"
              color="#181363"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setMatchModalOpened(true)}
            >
              Добавить матч
            </Button>
            <Button
              className="w-full mt-3"
              variant="filled"
              color="#7C7C80"
              radius="xl"
              leftSection={<IconTrash />}
              onClick={() => setMatchDeleteModalOpened(true)}
            >
              Удалить матч
            </Button>
          </div>
        </div>
      </div>
      {/* Модальные окна */}
      {/* Окно добавления команды */}
      <Modal
        opened={clubModalOpened}
        onClose={() => setClubModalOpened(false)}
        title="Добавить футбольную команду"
        centered
      >
        <div className="space-y-4">
          <TextInput
            label="Название команды"
            placeholder="Введите название команды"
            value={clubName}
            onChange={(event) => setClubName(event.target.value)}
            required
          />
          <TextInput
            label="Год основания"
            placeholder="Введите год основания (YYYY)"
            value={foundationYear}
            onChange={(event) => setFoundationYear(event.target.value)}
            required
          />
          <TextInput
            label="Город"
            placeholder="Введите город"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
          <div className="flex items-center space-x-2">
            <Select
              label="Страна"
              placeholder="Выберите страну"
              data={
                countries && countries.length > 0
                  ? countries.map((country) => ({
                      value: country.id,
                      label: country.countryName,
                    }))
                  : []
              }
              value={clubCountry}
              onChange={(value: string | null) => setClubCountry(value || '')}

              required
            />
            <Button
              variant="outline"
              color="gray"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setCountryModalOpened(true)}
            >
              Добавить страну
            </Button>
          </div>
          <div className="flex items-center space-x-2">
          <Select
  label="Выбери лигу"
  data={leagues.map(league => ({
    value: league.id,
    label: league.leagueName
  }))}
  onChange={(value) => {
    if (value) setClubLeague(value);
  }}
/>

            <Button
              variant="outline"
              color="gray"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setLeagueModalOpened(true)}
            >
              Добавить лигу
            </Button>
          </div>
          <Button className="w-full mt-4" onClick={handleClubSubmit}>
            Добавить команду
          </Button>
        </div>
      </Modal>

      {/* Остальные модальные окна... */}

      {/* Окно удаления матча */}
      <Modal
        opened={matchDeleteModalOpened}
        onClose={() => setMatchDeleteModalOpened(false)}
        title="Удалить матч"
        centered
        size="lg"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Сезон
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Команда дома
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Команда гости
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Счет
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMatches.map((match) => (
                <tr key={match.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {match.season}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {match.matchDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {match.homeClub?.clubName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {match.awayClub?.clubName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {match.scoreHomeAway}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Button
                      variant="light"
                      color="red"
                      radius="xl"
                      onClick={() => handleDeleteMatch(match.id)}
                      leftSection={<IconTrash size={16} />}
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Пагинация */}
        <Group className='position="apart" mt="md"'>
          <p className="text-sm text-gray-500">
            Страница {currentPage} из {totalPages}
          </p>
          <Group className='spacing="xs"' >
            <Button
              variant="default"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Предыдущая
            </Button>
            <Button
              variant="default"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Следующая
            </Button>
          </Group>
        </Group>
      </Modal>
    </div>
  );
}