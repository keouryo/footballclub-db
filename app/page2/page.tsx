'use client'
import {
  Button,
  Group,
  Modal,
  Pagination,
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
  country: Country;
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
interface Filters {
  search: string;
  leagueid: string;
  season: string;
  homeClubId: string;
  page: number;
}
const CreateMatch = async ({season, matchDate, scoreHomeAway, idAwayClub,idHomeClub,idLeague}:{season:string,matchDate:string, scoreHomeAway:string,idAwayClub?:string,idHomeClub?:string,idLeague?:string  }) => {
  const data = await axios.post('api/matches', {season, matchDate, scoreHomeAway, idAwayClub,idHomeClub,idLeague})

  console.log(data)
}



const CreateCountry = async ({countryName,countryCodeShort,continent}:{countryName:string, countryCodeShort:string,continent:string}) => {
  const data = await axios.post('api/coutries', {countryName,countryCodeShort,continent})
  console.log(data)
}
const CreateLeague = async ({leagueName,leagueLevel,countryid}:{leagueName:string, leagueLevel:string, countryid:string}) =>{
  const data = await axios.post('api/leagues', {leagueName,leagueLevel,countryid})
  console.log(data)
}
const CreateClub = async ({
  clubName,
  city,
  countryId,
  foundationYear,
  leagueId,
}: {
  clubName: string;
  city: string;
  countryId: string; // Убедитесь, что это строка
  foundationYear: string;
  leagueId: string; // Убедитесь, что это строка
}) => {
  const data = await axios.post('/api/clubs', {
    clubName,
    city,
    countryId,
    foundationYear,
    leagueId,
  });
  console.log(data); // Исправлено отсутствующее закрытие скобки
}
export default function Page2() {
  const [allFootballClubs, setAllFootballClubs] = useState<FootballClub[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
const [leagues, setLeagues] = useState<League[]>([]);
const [footballClubs, setFootballClubs] = useState<FootballClub[]>([]);
const [matches, setMatches] = useState<Match[]>([]);
  const [season, setSeason] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [homeClub, setHomeClub] = useState('');
  const [awayClub, setAwayClub] = useState('');
  const [scoreHomeAway, setScoreHomeAway] = useState('');

  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [foundationYear, setFoundationYear] = useState('');
  const [clubName, setClubName] = useState('');
  const [city, setCity] = useState('');
  const [countryId, setCountryId] = useState('');
  const [leagueId, setLeagueId] = useState('');
const [filters, setFilters] = useState<Filters>({
    search: '',
    leagueid: '',
    season: '',
    homeClubId: '',
    page: 1,
  });
  const [matchDeleteModalOpened, setMatchDeleteModalOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageClubs, setCurrentPageClubs] = useState(1); // Добавлено отдельное состояние для клубов
  const [totalPagesClubs, setTotalPagesClubs] = useState(1); // Добавлено отдельное состояние для страниц клубов
  const [pageSize, setPageSize] = useState(10);
  const [clubModalOpened, setClubModalOpened] = useState(false);
  const [matchModalOpened, setMatchModalOpened] = useState(false);
  const [clubDeleteModalOpened, setClubDeleteModalOpened] = useState(false);
  const [leagueModalOpened, setLeagueModalOpened] = useState(false);
  const [countryModalOpened, setCountryModalOpened] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [countryName, setCountryName] = useState('');
const [countryCodeShort, setCountryCodeShort] = useState('');
const [continent, setContinent] = useState<string>('');
const [leagueName, setLeagueName] = useState('');
const [leagueLevel, setLeagueLevel] = useState('');
const [countryIdForLeague, setCountryIdForLeague] = useState<string | null>(null);

const startClubIndex = (currentPage - 1) * pageSize;
const endClubIndex = startClubIndex + pageSize;

const handleClubSubmit = async () => {
  try {
    // Проверяем, что все обязательные поля заполнены
    if (!clubName || !city || !foundationYear || !countryId || !leagueId) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    // Проверка на уникальность клуба
    const isClubExists = footballClubs.some(
      (club) =>
        club.clubName.toLowerCase() === clubName.toLowerCase() &&
        club.league.id === leagueId
    );

    if (isClubExists) {
      alert('Клуб с таким названием уже существует в данной лиге');
      return;
    }

    // Отправляем запрос на сервер
    await CreateClub({
      clubName,
      city,
      countryId,
      foundationYear,
      leagueId,
    });
    console.log('Клуб успешно создан:');
    // Обновляем список клубов
    fetchFootballClubs();
    // Очищаем форму
    setClubName('');
    setCity('');
    setFoundationYear('');
    setCountryId('');
    setLeagueId('');
    // Закрываем модальное окно
    setClubModalOpened(false);
    // Уведомление об успехе
    alert('Клуб успешно создан!');
  } catch (error) {
    console.error('Ошибка при добавлении клуба:', error);
    alert('Произошла ошибка при создании клуба.');
  }
};
const handleLeagueSubmit = async () => {
  // Проверяем, что все поля заполнены
  if (!leagueName || !leagueLevel || !countryIdForLeague) {
    alert('Пожалуйста, заполните все поля');
    return;
  }

  // Проверка на уникальность лиги
  const isLeagueExists = leagues.some((league) =>
    (league.leagueName.toLowerCase() === leagueName.toLowerCase() ||
    league.leagueLevel === leagueLevel ) &&
    league.country.id === countryIdForLeague
  );

  if (isLeagueExists) {
    alert('Лига с таким названием или уровнем уже существует в данной стране');
    return;
  }

  try {
    await CreateLeague({
      leagueName,
      leagueLevel,
      countryid: countryIdForLeague,
    });
    setLeagueModalOpened(false);
    setLeagueName('');
    setLeagueLevel('');
    setCountryIdForLeague(null);
    fetchLeagues();
    alert('Лига успешно создана');
  } catch (error) {
    console.error('Ошибка при создании лиги:', error);
    alert('Произошла ошибка при создании лиги');
  }
};

  const handleCountrySubmit = async () => {
    // Проверяем, что все поля заполнены
    if (!countryName || !countryCodeShort || !continent) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
  
    // Проверка на уникальность страны
    const isCountryExists = countries.some(
      (country) =>
        country.countryName.toLowerCase() === countryName.toLowerCase() ||
        country.countryCodeShort.toUpperCase() === countryCodeShort.toUpperCase()
    );
  
    if (isCountryExists) {
      alert('Страна с таким названием или кодом уже существует');
      return;
    }
  
    try {
      // Вызываем функцию создания страны
      await CreateCountry({
        countryName,
        countryCodeShort,
        continent,
      });
      // Закрываем модальное окно
      setCountryModalOpened(false);
      // Очищаем поля формы
      setCountryName('');
      setCountryCodeShort('');
      setContinent('');
      // Выводим уведомление об успешном создании
      alert('Страна успешно создана');
      // Обновляем список стран
      fetchCountries();
    } catch (error) {
      console.error('Ошибка при создании страны:', error);
      alert('Произошла ошибка при создании страны');
    }
  };
  const handleDeleteClub = async (clubId: string) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот клуб?');
    if (!confirmDelete) return;
  
    try {
      await axios.delete('/api/clubs', {
        data: { id: clubId }, // <== ВАЖНО! Иначе сервер не получит id
      });
  
      fetchFootballClubs(); // обновляем список после удаления
    } catch (error) {
      console.error('Ошибка при удалении клуба:', error);
    }
  };
  
  const handleMatchSubmit = async () => {
    if (!selectedLeagueId) {
      console.error('Ошибка: Лига не выбрана.');
      alert('Пожалуйста, выберите лигу.');
      return;
    }
    
    if (homeClub === awayClub) {
      console.error('Ошибка: Домашняя и гостевая команды должны быть разными.');
      alert('Домашняя и гостевая команды должны быть разными.');
      return;
    }
  
    // Проверка на уникальность матча
    const isMatchExists = matches.some(
      (match) =>
        match.season === season &&
        match.matchDate === matchDate &&
        match.homeClub.id === homeClub &&
        match.awayClub.id === awayClub
    );
  
    if (isMatchExists) {
      alert('Такой матч уже существует');
      return;
    }
  
    try {
      await CreateMatch({
        season,
        matchDate,
        scoreHomeAway,
        idLeague: selectedLeagueId,
        idAwayClub: awayClub,
        idHomeClub: homeClub,
      });
      // Уведомление об успешном создании матча
      alert('Матч успешно создан!');
      // Сброс состояний
      setMatchModalOpened(false);
      setSeason('');
      setMatchDate('');
      setScoreHomeAway('');
      setAwayClub('');
      setHomeClub('');
      setSelectedLeagueId(null); // Очищаем выбранную лигу
    } catch (error) {
      console.error('Ошибка при создании матча:', error);
      alert('Произошла ошибка при создании матча.');
    }
  };



  const handleDeleteMatch = async (matchId: string) => {
    const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот клуб?');
    if (!confirmDelete) return;
  
    try {
      await axios.delete('/api/matches', {
        data: { id: matchId }, // <== ВАЖНО! Иначе сервер не получит id
      });
  
      fetchMatches(); // обновляем список после удаления
    } catch (error) {
      console.error('Ошибка при удалении клуба:', error);
    }
  };

  
  const fetchFootballClubs = async (page = 1) => {
    try {
      const response = await axios.get(`/api/clubs?page=${page}&limit=${pageSize}`);
      setFootballClubs(response.data.clubs); // Устанавливаем только текущую страницу клубов
      setTotalPagesClubs(response.data.totalPages); // Устанавливаем totalPagesClubs
    } catch (error) {
      console.error('Ошибка при получении списка клубов:', error);
    }
  };
  const fetchAllFootballClubs = async () => {
    try {
      const response = await axios.get('/api/clubs?all=true'); // Или другой параметр для отключения пагинации
      console.log('Все клубы:', response.data.clubs);
      setAllFootballClubs(response.data.clubs);
    } catch (error) {
      console.error('Ошибка при загрузке всех клубов:', error);
    }
  };
  useEffect(() => {
    fetchFootballClubs(currentPageClubs); // Загружаем клубы с пагинацией для таблицы
  }, [currentPageClubs]);
  useEffect(() => {
    console.log('Вызываем fetchAllFootballClubs');
    fetchAllFootballClubs();
  }, []);
  // Исправьте функцию изменения страницы для клубов
  const handleClubPageChange = (page: number) => {
    if (page < 1 || page > totalPagesClubs) return;
    setCurrentPageClubs(page); // Это автоматически вызовет useEffect
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

// Исправлен useEffect для загрузки матчей
useEffect(() => {
  const fetchMatchesData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/matches?page=${currentPage}&limit=${pageSize}`);
      const data = await res.json();
      setMatches(data.matches);
      setTotalPages(data.totalPages); // Устанавливаем totalPages
    } catch (error) {
      console.error('Ошибка при загрузке матчей:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchMatchesData();
}, [currentPage]); // Используем currentPage

const handleMatchPageChange = (page: number) => {
  if (page < 1 || page > totalPages) return;
  setCurrentPage(page); // Это автоматически вызовет useEffect
};
const fetchMatches = async (page = 1) => {
  setLoading(true);
  try {
    const res = await fetch(`/api/matches?page=${page}&limit=${pageSize}`);
    const data = await res.json();
    setMatches(data.matches); // Устанавливаем только текущую страницу матчей
    setTotalPages(data.totalPages); // Устанавливаем totalPages
  } catch (error) {
    console.error('Ошибка при загрузке матчей:', error);
  } finally {
    setLoading(false);
  }
};
// Исправьте useEffect для матчей:
useEffect(() => {
  fetchMatches(currentPage);
}, [currentPage]);

  useEffect(() => {
    fetchCountries();
    fetchLeagues();
    fetchFootballClubs();
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
  <TextInput
    label="Год создания"
    placeholder="Введите год создания"
    value={foundationYear}
    onChange={(event) => setFoundationYear(event.target.value)}
  />
  <div className="flex items-center space-x-2">
  <Select
  label="Страна"
  placeholder="Выберите страну"
  data={countries.map((country) => ({
    value: country.id,
    label: country.countryName,
  }))}
  value={countryId}
  onChange={(value) => setCountryId(value || '')} // Убедитесь, что всегда строка
/>
    <Button
      variant="light"
      leftSection={<IconPlus size={16} />}
      onClick={() => setCountryModalOpened(true)}
    >
      Создать страну
    </Button>
  </div>
  <div className="flex items-center space-x-2">
    <Select
      label="Лига"
      placeholder="Выберите лигу"
      data={leagues.map((league) => ({
        value: league.id,
        label: league.leagueName,
      }))}
      value={leagueId}
      onChange={(value) => setLeagueId(value || ''
      )}
    />
    <Button
      variant="light"
      leftSection={<IconPlus size={16} />}
      onClick={() => setLeagueModalOpened(true)}
    >
      Создать лигу
    </Button>
  </div>
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
            Страница {currentPageClubs} из {totalPagesClubs}
          </p>
          <Pagination
            total={totalPagesClubs} // Используем totalPagesClubs
            value={currentPageClubs} // Используем currentPageClubs
            onChange={handleClubPageChange} // Используем handleClubPageChange
          />
      
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
      placeholder="Введите сезон (например, 24/25)"
      value={season}
      onChange={(event) => setSeason(event.target.value)}
      required
    />
    <TextInput
      label="Дата матча"
      placeholder="Введите дату матча (например, 15-02-2025)"
      value={matchDate}
      onChange={(event) => setMatchDate(event.target.value)}
      required
    />
   <Select
  label="Лига"
  placeholder="Выберите лигу"
  data={leagues.map((league) => ({
    value: league.id,
    label: league.leagueName,
  }))}
  value={selectedLeagueId}
  onChange={(value) => setSelectedLeagueId(value || null)} // Устанавливаем выбранную лигу
  required
/>

<Select
  label="Домашняя команда"
  placeholder="Выберите домашнюю команду"
  data={
    selectedLeagueId
      ? allFootballClubs
          .filter((club) => club.league.id === selectedLeagueId) // Фильтруем команды по лиге
          .map((club) => ({
            value: club.id,
            label: club.clubName,
          }))
      : [] // Если лига не выбрана, список пуст
  }
  value={homeClub}
  onChange={(value) => setHomeClub(value || '')}
  required
/>

<Select
  label="Гостевая команда"
  placeholder="Выберите гостевую команду"
  data={
    selectedLeagueId
      ? allFootballClubs
          .filter((club) => club.league.id === selectedLeagueId) // Фильтруем команды по лиге
          .map((club) => ({
            value: club.id,
            label: club.clubName,
          }))
      : [] // Если лига не выбрана, список пуст
  }
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
      disabled={!selectedLeagueId || !homeClub || !awayClub || !season || !matchDate || !scoreHomeAway}
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
              {matches.map((match) => (
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
    <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Страница {currentPage} из {totalPages}
          </p>
          <Pagination
            total={totalPages} // Используем totalPages
            value={currentPage} // Используем currentPage
            onChange={handleMatchPageChange} // Используем handlePageChange
          />
        </div>
      </div>
      </div>
      </Modal>
      <Modal
  opened={leagueModalOpened}
  onClose={() => setLeagueModalOpened(false)}
  title="Добавить лигу"
  centered
>
  <div className="space-y-4">
    {/* Поле для названия лиги */}
    <TextInput
      label="Название лиги"
      placeholder="Введите название лиги"
      value={leagueName}
      onChange={(event) => setLeagueName(event.target.value)}
      required
    />

    {/* Поле для уровня лиги */}
    <Select
      label="Уровень лиги"
      placeholder="Выберите уровень лиги"
      data={[
        { value: '1', label: 'Первая лига' },
        { value: '2', label: 'Вторая лига' },
        { value: '3', label: 'Третья лига' },
        { value: '4', label: 'Четвертая лига' },
        { value: '5', label: 'Пятая лига' },
        { value: '6', label: 'Шестая лига' },
      ]}
      value={leagueLevel}
      onChange={(value) => setLeagueLevel(value || '')}
      required
    />

    {/* Поле для выбора страны */}
    <Select
      label="Страна"
      placeholder="Выберите страну"
      data={countries.map((country) => ({
        value: country.id,
        label: country.countryName,
      }))}
      value={countryIdForLeague}
      onChange={(value) => setCountryIdForLeague(value || null)}
      required
    />

    {/* Кнопки действий */}
    <div className="flex justify-end space-x-2">
      <Button variant="default" onClick={() => setLeagueModalOpened(false)}>
        Отмена
      </Button>
      <Button onClick={handleLeagueSubmit}>Сохранить</Button>
    </div>
  </div>
</Modal>

<Modal
  opened={countryModalOpened}
  onClose={() => setCountryModalOpened(false)}
  title="Добавить страну"
  centered
>
  <div className="space-y-4">
  <TextInput
  label="Название страны"
  placeholder="Введите название страны"
  value={countryName}
  onChange={(event) => setCountryName(event.target.value)}
  required
/>
<TextInput
  label="Код страны (сокращенный)"
  placeholder="Введите код страны (например, RUS)"
  value={countryCodeShort}
  onChange={(event) => setCountryCodeShort(event.target.value)}
  maxLength={3}
  required
/>
<Select
  label="Континент"
  placeholder="Выберите континент"
  data={[
    { value: 'Europe', label: 'Европа' },
    { value: 'Asia', label: 'Азия' },
    { value: 'Africa', label: 'Африка' },
    { value: 'North America', label: 'Северная Америка' },
    { value: 'South America', label: 'Южная Америка' },
    { value: 'Oceania', label: 'Океания' },
  ]}
  value={continent}
  onChange={(value) => setContinent(value || '')}
  required
/>
    <div className="flex justify-end space-x-2">
      <Button variant="default" onClick={() => setCountryModalOpened(false)}>
        Отмена
      </Button>
      <Button onClick={handleCountrySubmit}>Сохранить</Button>
    </div>
  </div>
</Modal>
    </div>
  );
}
