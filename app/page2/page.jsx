'use client';
import { useState } from 'react';
import {
  Button,
  Modal,
  TextInput,
  Select,
} from '@mantine/core';
import { IconFlagCog, IconPlayFootball, IconPlus, IconShieldCog, IconShirtSport, IconSoccerField, IconTrash } from '@tabler/icons-react';

export default function Page2() {

  const [leagueModalOpened, setLeagueModalOpened] = useState(false);
  const [countryModalOpened, setCountryModalOpened] = useState(false);
  const [playerModalOpened, setPlayerModalOpened] = useState(false);
  const [clubModalOpened, setClubModalOpened] = useState(false);
  const [matchModalOpened, setMatchModalOpened] = useState(false);


  const [countryName, setCountryName] = useState('');
  const [countryCodeShort, setCountryCodeShort] = useState('');
  const [continent, setContinent] = useState('');

  const [playerName, setPlayerName] = useState('');
  const [playerPosition, setPlayerPosition] = useState('');
  const [playerBirthdayDate, setPlayerBirthdayDate] = useState('');
  const [playerClubName, setPlayerClubName] = useState('');

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
  const [matchLeague, setMatchLeague] = useState('');

 
  const continentOptions = [
    { value: 'Africa', label: 'Африка' },
    { value: 'Asia', label: 'Азия' },
    { value: 'Europe', label: 'Европа' },
    { value: 'North America', label: 'Северная Америка' },
    { value: 'South America', label: 'Южная Америка' },
    { value: 'Oceania', label: 'Океания' },
  ];

  const positionOptions = [
    { value: 'GK', label: 'Goalkeeper (GK)' },
    { value: 'CB', label: 'Center Back (CB)' },
    { value: 'LB', label: 'Left Back (LB)' },
    { value: 'RB', label: 'Right Back (RB)' },
    { value: 'CDM', label: 'Central Defensive Midfielder (CDM)' },
    { value: 'CM', label: 'Central Midfielder (CM)' },
    { value: 'CAM', label: 'Central Attacking Midfielder (CAM)' },
    { value: 'RW', label: 'Right Winger (RW)' },
    { value: 'LW', label: 'Left Winger (LW)' },
    { value: 'ST', label: 'Striker (ST)' },
  ];

  const clubOptions = [
    { value: 'Manchester United', label: 'Manchester United' },
    { value: 'Real Madrid', label: 'Real Madrid' },
    { value: 'Bayern Munich', label: 'Bayern Munich' },
    { value: 'Paris Saint-Germain', label: 'Paris Saint-Germain' },
    { value: 'Juventus', label: 'Juventus' },
  ];

  const countryOptions = [
    { value: 'England', label: 'England' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Italy', label: 'Italy' },
    { value: 'France', label: 'France' },
  ];

  const leagueOptions = [
    { value: 'Premier League', label: 'Premier League' },
    { value: 'La Liga', label: 'La Liga' },
    { value: 'Bundesliga', label: 'Bundesliga' },
    { value: 'Serie A', label: 'Serie A' },
    { value: 'Ligue 1', label: 'Ligue 1' },
  ];

  // Обработчики отправки форм
  const handleCountrySubmit = () => {
    console.log({ countryName, countryCodeShort, continent });
    setCountryModalOpened(false);
    setCountryName('');
    setCountryCodeShort('');
    setContinent('');
  };

  const handlePlayerSubmit = () => {
    console.log({
      playerName,
      playerPosition,
      playerBirthdayDate,
      playerClubName,
    });
    setPlayerModalOpened(false);
    setPlayerName('');
    setPlayerPosition('');
    setPlayerBirthdayDate('');
    setPlayerClubName('');
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
    console.log({
      season,
      matchDate,
      scoreHomeAway,
      awayClub,
      homeClub,
      matchLeague,
    });
    setMatchModalOpened(false);
    setSeason('');
    setMatchDate('');
    setScoreHomeAway('');
    setAwayClub('');
    setHomeClub('');
    setMatchLeague('');
  };

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4 ml-5">Редактирование базы данных</h1>
      <div className="flex flex-wrap space-y-4">
        <div className="bg-white shadow-md p-4 rounded-lg w-1/3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Редактировать игроков</h1>
            <IconPlayFootball />
          </div>
          <div className="flex flex-col mt-4">
            <Button
              className="w-full"
              variant="filled"
              color="#181363"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setPlayerModalOpened(true)}
            >
              Добавить игрока
            </Button>
            <Button
              className="w-full mt-3"
              variant="filled"
              color="#7C7C80"
              radius="xl"
              leftSection={<IconTrash />}
            >
              Удалить игрока
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg w-1/3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Редактировать страны</h1>
            <IconFlagCog />
          </div>
          <div className="flex flex-col mt-4">
            <Button
              className="w-full"
              variant="filled"
              color="#181363"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setCountryModalOpened(true)}
            >
              Добавить страну
            </Button>
            <Button
              className="w-full mt-3"
              variant="filled"
              color="#7C7C80"
              radius="xl"
              leftSection={<IconTrash />}
            >
              Удалить страну
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg w-1/3">
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Редактировать лиги</h1>
            <IconShieldCog />
          </div>
          <div className="flex flex-col mt-4">
            <Button
              className="w-full"
              variant="filled"
              color="#181363"
              radius="xl"
              leftSection={<IconPlus />}
              onClick={() => setLeagueModalOpened(true)}
            >
              Добавить лигу
            </Button>
            <Button
              className="w-full mt-3"
              variant="filled"
              color="#7C7C80"
              radius="xl"
              leftSection={<IconTrash />}
            >
              Удалить лигу
            </Button>
          </div>
        </div>

   
        <div className="bg-white shadow-md p-4 rounded-lg w-1/3">
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
            >
              Удалить команду
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md p-4 rounded-lg w-1/3 ">
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
            >
              Удалить матч
            </Button>
          </div>
        </div>
        <div className='w-1/3'>

        </div>
      </div>

 
      <Modal
        opened={leagueModalOpened}
        onClose={() => setLeagueModalOpened(false)}
        title="Добавить лигу"
        centered
      >
        <TextInput label="Название лиги" placeholder="Введите название лиги" />
        <Select
          label="Уровень лиги"
          placeholder="Выберите уровень лиги"
          data={[
            { value: 'first', label: 'Первая лига' },
            { value: 'second', label: 'Вторая лига' },
          ]}
        />
        <Select
          label="Страна"
          placeholder="Выберите страну"
          data={countryOptions}
        />
        <div className="flex justify-end mt-4">
          <Button variant="default" onClick={() => setLeagueModalOpened(false)}>
            Отмена
          </Button>
          <Button className="ml-2" onClick={() => setLeagueModalOpened(false)}>
            Сохранить
          </Button>
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
            data={continentOptions}
            value={continent}
            onChange={setContinent}
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

      <Modal
        opened={playerModalOpened}
        onClose={() => setPlayerModalOpened(false)}
        title="Добавить игрока"
        centered
      >
        <div className="space-y-4">
          <TextInput
            label="Имя игрока"
            placeholder="Введите имя игрока"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
            required
          />
          <Select
            label="Позиция"
            placeholder="Выберите позицию"
            data={positionOptions}
            value={playerPosition}
            onChange={setPlayerPosition}
            required
          />
          <TextInput
            label="Дата рождения"
            placeholder="Введите дату рождения (YYYY-MM-DD)"
            value={playerBirthdayDate}
            onChange={(event) => setPlayerBirthdayDate(event.target.value)}
            required
          />
          <Select
            label="Клуб"
            placeholder="Выберите клуб"
            data={clubOptions}
            value={playerClubName}
            onChange={setPlayerClubName}
            required
          />
          <div className="flex justify-end space-x-2">
            <Button variant="default" onClick={() => setPlayerModalOpened(false)}>
              Отмена
            </Button>
            <Button onClick={handlePlayerSubmit}>Сохранить</Button>
          </div>
        </div>
      </Modal>

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
          <Select
            label="Страна"
            placeholder="Выберите страну"
            data={countryOptions}
            value={clubCountry}
            onChange={setClubCountry}
          />
          <Select
            label="Лига"
            placeholder="Выберите лигу"
            data={leagueOptions}
            value={clubLeague}
            onChange={setClubLeague}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="default" onClick={() => setClubModalOpened(false)}>
              Отмена
            </Button>
            <Button onClick={handleClubSubmit}>Сохранить</Button>
          </div>
        </div>
      </Modal>

      <Modal
        opened={matchModalOpened}
        onClose={() => setMatchModalOpened(false)}
        title="Добавить футбольный матч"
        centered
      >
        <div className="space-y-4">
          <TextInput
            label="Сезон"
            placeholder="Введите сезон (например, 2023-2024)"
            value={season}
            onChange={(event) => setSeason(event.target.value)}
            required
          />
          <TextInput
            label="Дата матча"
            placeholder="Введите дату матча (YYYY-MM-DD)"
            value={matchDate}
            onChange={(event) => setMatchDate(event.target.value)}
            required
          />
          <TextInput
            label="Счет (дома-в гостях)"
            placeholder="Введите счет (например, 2:1)"
            value={scoreHomeAway}
            onChange={(event) => setScoreHomeAway(event.target.value)}
            required
          />
          <Select
            label="Хозяева"
            placeholder="Выберите домашнюю команду"
            data={clubOptions}
            value={homeClub}
            onChange={setHomeClub}
            required
          />
          <Select
            label="Гости"
            placeholder="Выберите гостевую команду"
            data={clubOptions}
            value={awayClub}
            onChange={setAwayClub}
            required
          />
          <Select
            label="Лига"
            placeholder="Выберите лигу"
            data={leagueOptions}
            value={matchLeague}
            onChange={setMatchLeague}
            required
          />
          <div className="flex justify-end space-x-2">
            <Button variant="default" onClick={() => setMatchModalOpened(false)}>
              Отмена
            </Button>
            <Button onClick={handleMatchSubmit}>Сохранить</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}