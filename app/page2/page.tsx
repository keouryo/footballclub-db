'use client';
import { useState } from 'react';
import {
  Button,
  Modal,
  TextInput,
  Select,
} from '@mantine/core';
import React from 'react';
import { IconFlagCog, IconPlayFootball, IconPlus, IconShieldCog, IconShirtSport, IconSoccerField, IconTrash } from '@tabler/icons-react';
import axios from 'axios';

const CreateMatch = async ({season, matchDate, scoreHomeAway, idAwayClub,idHomeClub}:{season:string,matchDate:string, scoreHomeAway:string,idAwayClub?:string,idHomeClub?:string  }) => {
  const data = await axios.post('api/matches', {season, matchDate, scoreHomeAway, idAwayClub,idHomeClub})

  console.log(data)
}

const CreateCountry = async ({countryName,countryCodeShort,continent}:{countryName:string, countryCodeShort:string,continent:string}) => {
  const data = await axios.post('api/coutries', {countryName,countryCodeShort,continent})
  console.log(data)
}
const CreateFootballClub = async ({clubName,
  foundationYear,
  city,
  clubCountry,
}:{clubName:string, foundationYear:string, city:string, clubCountry:string}) =>{
  const data = await axios.post('api/clubs', {clubName,foundationYear,city,clubCountry})
}


export default function Page2() {
 


  const [leagueModalOpened, setLeagueModalOpened] = useState(false);
  const [countryModalOpened, setCountryModalOpened] = useState(false);
  const [playerModalOpened, setPlayerModalOpened] = useState(false);
  const [clubModalOpened, setClubModalOpened] = useState(false);
  const [matchModalOpened, setMatchModalOpened] = useState(false);


  const [leagueLevel, setleagueLevel] = useState('');


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
    { value: 'Africa', label: 'Africa' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'North America', label: 'North America' },
    { value: 'South America', label: 'South America' },
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
    { value: 'cm895fki90000c1a83axxizg', label: 'Liverpool' },
    { value: 'cm895fkia0001c1a8sg0udma6', label: 'Arsenal' },
    { value: 'cm895fkib0002c1a8ryrxwiss', label: 'Manchester City' },
    { value: 'cm895fkib0003c1a83b2xqqvx', label: 'Chelsea' },
    { value: 'cm895fkic0004c1a85jt9equ', label: 'Newcastle United' },
    { value: 'cm895fkid0005c1a8fhe2pcy', label: 'Fullham' },
    { value: 'cm895fkid0006c1a8y2olt1r7', label: 'Tottenham' },
    { value: 'cm895fkid0007c1a8fv33zdxq', label: 'Everton' },
    { value: 'cm895fkie0008c1a8orrlo72s', label: 'Manchester United' },
    { value: 'cm895fkie0009c1a84fanisfz', label: 'Aston Villa' },
    { value: 'cm895zdgf0000c1xgc16nn6v', label: 'Real Madrid' },
    { value: 'cm895zdggh0002c1xgyjoh8m1', label: 'Barcelona' },
    { value: 'cm895zdh0003c1xgwet89qv9', label: 'Sevilla' },
    { value: 'cm895zdg0004c1xgzpr0fiij7', label: 'Villarreal' },
    { value: 'cm895zdg0005c1xgfvr4z7y', label: 'Athletic Bilbao' },
    { value: 'cm895cg7r0007c1xgn0s0n8z', label: 'Bayern Munich' },
    { value: 'cm895cg7r0008c1xgjxd43h0', label: 'Bayer Leverkusen' },
    { value: 'cm895cg7s0009c1xge5jei9s2', label: 'Eintracht Frankfurt' },
    { value: 'cm895cg7s000ac1xg3syxp1c4', label: 'RB Leipzig' },
    { value: 'cm895cg7t000bc1xgtgpwvo5q7', label: 'Wolfsburg' },
    { value: 'cm8969gku000dc1xgrm19rcu', label: 'Napoli' },
    { value: 'cm8969gv000ec1xg9hnnz7f2', label: 'Inter Milan' },
    { value: 'cm8969gkv000fc1xgi08uy6dx', label: 'Atalanta' },
    { value: 'cm8969gkw000gc1xg1n9ukbtr', label: 'Lazio' },
    { value: 'cm8969gkw000hc1xgsh13q525', label: 'Juventus' },
    { value: 'cm8969gkw000ic1xgoox2dqij7', label: 'AFC Milan' },
    { value: 'cm896cpm7000kc1xgfvo903gb', label: 'Paris Saint-Germain' },
    { value: 'cm896cpm8000lc1xgbxickpnnp', label: 'Marseille' },
    { value: 'cm896cpm8000mc1xg3sdgndgm', label: 'Monaco' },
    { value: 'cm896cpm8000nc1xghkg37nhna', label: 'Nice' },
    { value: 'cm896cpm8000oc1xg9icml5dr', label: 'Lyon' },
    { value: 'cm896frnn000qc1xg1tcn6f35', label: 'Cologne' },
    { value: 'cm896frnn000rc1xgtx22wd4v', label: 'Hamburg' },
    { value: 'cm896frno000sc1xgy8csjb1', label: 'Fortuna Düsseldorf' },
    { value: 'cm896frno000tc1xgs0t1p0c8', label: 'Hertha Berlin' },
    { value: 'cm896izgy000uc1xgfek74our', label: 'Sheffield United' },
    { value: 'cm896izgz000vc1xg3xadwwnl', label: 'Leeds United' },
    { value: 'cm896izgz000wc1xgh6giyo4w', label: 'Burnley' },
    { value: 'cm896izh0000xc1xgnk5v0913', label: 'Sunderland' },
    { value: 'cm896izh1000yc1xg9viweic', label: 'Queens Park Rangers' },
    { value: 'cm896ioht000zc1xgm8tigbti', label: 'Genk' },
  ];

  const countryOptions = [
    { value: 'cm895i5kn000uc1a8dzf57rvr', label: 'England' },
  { value: 'cm8960h24000c1xgzwpkitpy', label: 'Spain' },
  { value: 'cm8966dxv000cc1xgwjupt4q', label: 'Germany' },
  { value: 'cm896a9jv000jc1xg6ppdbo5p', label: 'Italy' },
  { value: 'cm896dg6000pc1xgo880mmwl6', label: 'France' },
  { value: 'cm896oead0012c1xg8fkabyn', label: 'Belgium' },
  { value: 'cm896tgwq0019c1xg8e4lihua', label: 'Portugal' },
  { value: 'cm896w809001dc1xgao0mpeli', label: 'Netherlands' },
  ];

  const leagueOptions = [
    { value: 'cm8972v0a0000c1q8tfy342s7', label: 'English Premier League' },
  { value: 'cm8972v0b0001c1q81krqnq3y', label: 'La Liga' },
  { value: 'cm8972v0b0002c1q8qv2yhphh', label: 'Bundesliga' },
  { value: 'cm8972v0b0003c1q85cfy9mz1', label: 'Serie A' },
  { value: 'cm8972v0c0004c1q8pvf8943fk', label: 'Ligue 1' },
  { value: 'cm8972v0c0005c1q89q6raz2e', label: 'Bundesliga 2' },
  { value: 'cm8972v0c0006c1q8ruk8wpxc', label: 'EFL Championship' },
  { value: 'cm8972v0c0007c1q8nrdxg5s', label: 'Jupiler Pro League' },
  { value: 'cm8972vd0008c1q8bmah9ty3', label: 'Serie B' },
  { value: 'cm8972vd0009c1q86m5dl18xx', label: 'Liga NOS' },
  { value: 'cm8972vd000ac1q8x6ucvuef', label: 'Eredivisie' },
  ];

  // Обработчики отправки форм
  const handleCountrySubmit = () => {
    CreateCountry({ countryName, countryCodeShort, continent });
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
    CreateFootballClub({
      clubName,
      foundationYear,
      city,
      clubCountry
    });
    setClubModalOpened(false);
    setClubName('');
    setFoundationYear('');
    setCity('');
    setClubCountry('');
  };

  const handleMatchSubmit = () => {
    CreateMatch({season, matchDate, scoreHomeAway, idAwayClub:awayClub,idHomeClub:homeClub})
    setMatchModalOpened(false);
    setSeason('');
    setMatchDate('');
    setScoreHomeAway('');
    setAwayClub('');
    setHomeClub('');
    setMatchLeague('');
  };
  const handleCreateLeague = () => {
    CreateLeague([{leagueName,leagueLevel,countryid}])
    setMatchLeague('');
    setleagueLevel('');
    setCountryName('');
  }

  return (
    <div className="pt-5 pl-4 pb-6">
      <h1 className="text-2xl font-bold mb-4 ml-5">Редактирование базы данных</h1>
      <div className="flex flex-wrap space-y-4">
        

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
        <TextInput label="Название лиги" placeholder="Введите название лиги" required/>
        <Select
          label="Уровень лиги"
          placeholder="Выберите уровень лиги"
          data={[
            { value: '1', label: 'First league' },
            { value: '2', label: 'Second league' },
            { value: '3', label: 'Third league' },
            { value: '4', label: 'Fourth league' },
            { value: '5', label: 'Fivth league' },
            { value: '6', label: 'Sixth league' },
          ]}
          value=''
          required
        />
        <Select
          label="Страна"
          placeholder="Выберите страну"
          data={countryOptions}
          required
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
            placeholder="Введите год рождения (YYYY)"
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
            required
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