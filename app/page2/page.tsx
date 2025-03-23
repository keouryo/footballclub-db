'use client'
import {
  Button,
  Group,
  Modal,
  Select,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import {
  IconEdit,
  IconPlus,
  IconShirtSport,
  IconSoccerField,
  IconTrash,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Country {
  id: string;
  countryName: string;
  countryCodeShort:string;
  continent:string
}

interface League {
  id: string;
  leagueName: string;
  leagueLevel: string;
}

interface FootballClub {
  id: string;
  clubName: string;
  city: string;
  country: Country; // если у тебя вложенный объект
  league: League;
  foundationYear: string;
}

interface Match {
  id: string;
  season: string;
  matchDate: string;
  homeClub: FootballClub;
  awayClub: FootballClub;
  scoreHomeAway: string;
  league: League;
}

const CreateMatch = async ({season, matchDate, scoreHomeAway, idAwayClub,idHomeClub}:{season:string,matchDate:string, scoreHomeAway:string,idAwayClub?:string,idHomeClub?:string  }) => {
  const data = await axios.post('api/matches', {season, matchDate, scoreHomeAway, idAwayClub,idHomeClub})

  console.log(data)
}

const CreateCountry = async ({countryName,countryCodeShort,continent}:{countryName:string, countryCodeShort:string,continent:string}) => {
  const data = await axios.post('api/coutries', {countryName,countryCodeShort,continent})
  console.log(data)
}
const CreateLeague = async ({leagueName,leagueLevel,countryid}:{leagueName:string, leagueLevel:string, countryid:string}) =>{
  const data = await axios.post('api/leagues', {leagueName,leagueLevel,countryid})
}

export default function Page2() {
  const [clubs, setClubs] = useState([]);
  const [countries, setCountries] = useState<Country[]>([]);
const [leagues, setLeagues] = useState<League[]>([]);
const [footballClubs, setFootballClubs] = useState<FootballClub[]>([]);
const [matches, setMatches] = useState<Match[]>([]);
  const [seasons, setSeasons] = useState([]);
  const [season, setSeason] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [scoreHomeAway, setScoreHomeAway] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [clubName, setClubName] = useState('');
  const [city, setCity] = useState('');
  const [countryId, setCountryId] = useState<string | null>(null);
  const [leagueId, setLeagueId] = useState<string | null>(null);

  const [matchDeleteModalOpened, setMatchDeleteModalOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [clubModalOpened, setClubModalOpened] = useState(false);
  const [matchModalOpened, setMatchModalOpened] = useState(false);
  const [clubDeleteModalOpened, setClubDeleteModalOpened] = useState(false);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const startIndex = (currentPage - 1) * pageSize;
const endIndex = startIndex + pageSize;
const currentMatches = matches.slice(startIndex, endIndex);

  const handleClubSubmit = async () => {
    try {
      await axios.post('/api/clubs', {
        clubName,
        city,
        countryId,
        leagueId,
      });
      fetchFootballClubs();
      setClubModalOpened(false);
      setClubName('');
      setCity('');
      setCountryId(null);
      setLeagueId(null);
    } catch (error) {
      console.error('Ошибка при добавлении клуба:', error);
    }
  };

  const handleDeleteClub = async (clubId: string) => {
    try {
      await axios.delete(`/api/clubs/${clubId}`);
      fetchFootballClubs();
    } catch (error) {
      console.error('Ошибка при удалении клуба:', error);
    }
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
      await axios.delete('/api/matches/${matchId}');
      const updatedMatches = matches.filter((match) => match.id !== matchId);
      setMatches(updatedMatches);
    } catch (error) {
      console.error('Ошибка при удалении матча:', error);
    }
  };

  const fetchFootballClubs = async () => {
    try {
      const response = await axios.get('/api/clubs');
      setFootballClubs(response.data.clubs);
    } catch (error) {
      console.error('Ошибка при получении списка клубов:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('/api/coutries');
      setCountries(response.data);
    } catch (error) {
      console.error('Ошибка при получении списка стран:', error);
    }
  };

  const fetchLeagues = async () => {
    try {
      const response = await axios.get('/api/leagues');
      setLeagues(response.data);
    } catch (error) {
      console.error('Ошибка при получении списка лиг:', error);
    }
  };

  const fetchMatches = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/matches`);
      const data = await res.json();

      setMatches(data.matches);
      setTotalPages(data.totalPages); // получаем totalPages из API ответа
      setCurrentPage(data.page);
    } catch (error) {
      console.error('Ошибка при загрузке матчей:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return; // защита от выхода за пределы страниц
    fetchMatches(page);
  };

  useEffect(() => {
    fetchMatches();
  }, []);


  useEffect(() => {
    fetchCountries();
    fetchLeagues();
    fetchFootballClubs();
    fetchMatches();
  }, []);

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4 ml-5">Редактирование базы данных</h1>
      <div className="flex flex-wrap space-y-4">
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
              onClick={() => setClubDeleteModalOpened(true)}
            >
              Удалить команду
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg w-1/2 ">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Редактировать футбольные матчи</h1>
            <IconSoccerField/>
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
        <div className='w-1/3'>

        </div>
      </div>


      {/* Модалка добавления клуба */}
      <Modal
        opened={clubModalOpened}
        onClose={() => setClubModalOpened(false)}
        title="Добавить футбольный клуб"
        centered
      >
        <TextInput
          label="Название клуба"
          placeholder="Введите название клуба"
          value={clubName}
          onChange={(event) => setClubName(event.target.value)}
        />
        <TextInput
          label="Город"
          placeholder="Введите город"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <Select
          label="Страна"
          placeholder="Выберите страну"
          data={countries.map((country) => ({
            value: country.id,
            label: country.countryName,
          }))}
          value={countryId}
          onChange={(value) => setCountryId(value)}
        />
        <Select
          label="Лига"
          placeholder="Выберите лигу"
          data={leagues.map((league) => ({
            value: league.id,
            label: league.leagueName,
          }))}
          value={leagueId}
          onChange={(value) => setLeagueId(value)}
        />
        <Button className="mt-4 w-full" onClick={handleClubSubmit}>
          Добавить клуб
        </Button>
      </Modal>

      {/* Модалка удаления клуба */}
      <Modal
        opened={clubDeleteModalOpened}
        onClose={() => setClubDeleteModalOpened(false)}
        title={
          <div className="flex text-center items-center text-lg font-bold">
            Удалить футбольный клуб
          </div>
        }
        centered
        size="auto"
      >
        <div className="overflow-x-auto">
          <Table striped highlightOnHover withTableBorder withColumnBorders className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Название клуба
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Год создания
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Название лиги
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Город
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Страна
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {footballClubs.map((club) => (
                <tr key={club.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {club.clubName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {club.foundationYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {club.league?.leagueName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {club.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {club.country?.countryName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <Button
                      variant="light"
                      color="red"
                      radius="xl"
                      onClick={() => handleDeleteClub(club.id)}
                      leftSection={<IconTrash size={16} />}
                    >
                      Удалить
                    </Button>
                    
                  </td>
                </tr>
              ))}
              
            </tbody>
          </Table>
        </div>
         {/* Нижняя панель с пагинацией */}
  <div className="flex justify-between items-center mt-4">
    <p className="text-sm text-gray-500">
      Страница {currentPage} из {totalPages}
    </p>
    <div>
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
      </div>
      </div>
      </Modal>

      {/* Модалка добавления матча */}
      <Modal
        opened={matchModalOpened}
        onClose={() => setMatchModalOpened(false)}
        title="Добавить футбольный матч"
        centered
        size="md"
      >
        <div className="space-y-4">
          <TextInput
            label="Сезон"
            placeholder="Введите сезон (например, 2024/2025)"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
            required
          />

          <TextInput
            label="Дата матча"
            placeholder="Введите дату матча (например, 2025-04-15)"
            value={matchDate}
            onChange={(event) => setMatchDate(event.target.value)}
            required
          />

          <Select
            label="Домашняя команда"
            placeholder="Выберите домашнюю команду"
            data={footballClubs.map((club) => ({
              value: club.id,
              label: club.clubName,
            }))}
            value={homeClub}
            onChange={(value) => setHomeClub(value || '')}
            required
          />

          <Select
            label="Гостевая команда"
            placeholder="Выберите гостевую команду"
            data={footballClubs.map((club) => ({
              value: club.id,
              label: club.clubName,
            }))}
            value={awayClub}
            onChange={(value) => setAwayClub(value || '')}
            required
          />

          <TextInput
            label="Счет матча"
            placeholder="Введите счет (например, 2-1)"
            value={scoreHomeAway}
            onChange={(event) => setScoreHomeAway(event.target.value)}
            required
          />

          <Button
            className="w-full mt-4"
            onClick={handleMatchSubmit}
            disabled={!homeClub || !awayClub || !season || !matchDate || !scoreHomeAway}
          >
            Добавить матч
          </Button>
        </div>
      </Modal>
       {/* Окно удаления матча */}
       <Modal
        opened={matchDeleteModalOpened}
        onClose={() => setMatchDeleteModalOpened(false)}
        title={
          <div className="flex justify-center  text-lg font-bold">
            Удалить матч
          </div>
        }
        centered
        size="auto"
      >
        <div className="overflow-x-auto">
        <Table striped highlightOnHover withTableBorder withColumnBorders className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Сезон
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Дата
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Лига
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
                    {match.league?.leagueName}
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
          </Table>
        </div>

         {/* Нижняя панель с пагинацией */}
  <div className="flex justify-between items-center mt-4">
    <p className="text-sm text-gray-500">
      Страница {currentPage} из {totalPages}
    </p>
    <div>
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
      </div>
      </div>
      </Modal>
    </div>
  );
}
