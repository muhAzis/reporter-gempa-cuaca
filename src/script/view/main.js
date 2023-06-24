import moment from 'moment';
import { async } from 'regenerator-runtime';

const main = () => {
  const baseUrlWeather = 'https://cuaca-gempa-rest-api.vercel.app/weather';
  const baseUrlQuake = 'https://cuaca-gempa-rest-api.vercel.app/quake';

  const getQuake = async () => {
    try {
      const response = await fetch(baseUrlQuake);
      const responseJson = await response.json();

      if (responseJson.error) {
        alert(`Error: ${responseJson.message}`);
      } else {
        console.log('Data Gempa berhasil didapat!');
        console.log(responseJson.data);
        headline(responseJson.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getWeather = async (data) => {
    try {
      const prov = `/${data.provinsi}`;
      const kab = `/${data.kabupaten}`;

      const response = await fetch(`${baseUrlWeather}${prov}${kab}`);
      const responseJson = await response.json();

      if (responseJson.error) {
        alert(`Error: ${responseJson.message}`);
      } else {
        console.log('Data Cuaca berhasil didapat!');
        console.log(responseJson.data);
        weatherCards(responseJson.data, data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const headline = (quakeData) => {
    const headline = document.querySelector('.headline');

    headline.innerHTML = '';
    headline.innerHTML = `
      <p>
        <b>!Info Gempa Terkini</b>: Tanggal ${quakeData.tanggal}, pukul ${quakeData.jam}, gempa berkekuatan ${quakeData.magnitude}sr dengan kedalaman ${quakeData.kedalaman}. ${quakeData.wilayah}. ${quakeData.potensi}
      </p>
    `;
  };

  const weatherCards = (weatherData, data) => {
    const weatherContainer = document.querySelector('.weatherContainer');
    weatherContainer.innerHTML = '';
    moment.locale('id');

    if (!data.provinsi == '') {
      if (!data.kabupaten == '') {
        weatherData.params.forEach((param) => {
          if (param.id == 'weather') {
            // const timeNow = '';
            param.times.forEach((time) => {
              const wDate = time.datetime.slice(0, 8);
              const wTime = time.datetime.slice(8, 10);
              let icon = '';

              if (parseInt(wTime) <= parseInt(moment().format('H')) && parseInt(wTime) > parseInt(moment().format('H')) - 6 && wDate == moment().format('YMMDD')) {
                switch (time.code) {
                  case '0':
                    icon = 'bi bi-brightness-high-fill';
                    break;
                  case '1':
                    icon = 'bi bi-cloud-sun-fill';
                    break;
                  case '2':
                    icon = 'bi bi-cloud-sun-fill';
                    break;
                  case '3':
                    icon = 'bi bi-cloud-fill';
                    break;
                  case '4':
                    icon = 'bi bi-clouds-fill';
                    break;
                  case '5':
                    icon = 'bi bi-cloud-haze2-fill';
                    break;
                  case '10':
                    icon = 'bi bi-cloud-haze-fill';
                    break;
                  case '45':
                    icon = 'bi bi-cloud-fog-fill';
                    break;
                  case '60':
                    icon = 'bi bi-cloud-drizzle-fill';
                    break;
                  case '61':
                    icon = 'bi bi-cloud-rain-fill';
                    break;
                  case '63':
                    icon = 'bi bi-cloud-rain-heavy-fill';
                    break;
                  case '80':
                    icon = 'bi bi-umbrella-fill';
                    break;
                  case '95':
                    icon = 'bi bi-cloud-lightning-rain-fill';
                    break;
                  case '97':
                    icon = 'bi bi-cloud-lightning-rain-fill';
                    break;
                }

                weatherContainer.innerHTML += `
                <div class="weatherCard">
                  <i class="${icon}"></i>
                  <p class="nameKabupaten">${weatherData.description}</p>
                  <p class="nameCuaca">${time.name}</p>
                  <p>Tanggal data: ${time.datetime.slice(0, 4)}/${time.datetime.slice(4, 6)}/${time.datetime.slice(6, 8)}</p>
                  <p>Waktu data: ${time.datetime.slice(8, 10)}:${time.datetime.slice(10)}</p>
                </div>
                `;
              }
            });
          }
        });
      } else {
        weatherData.areas.forEach((area) => {
          area.params.forEach((param) => {
            if (param.id == 'weather') {
              // const timeNow = '';
              param.times.forEach((time) => {
                const wDate = time.datetime.slice(0, 8);
                const wTime = time.datetime.slice(8, 10);
                let icon = '';

                if (parseInt(wTime) <= parseInt(moment().format('H')) && parseInt(wTime) > parseInt(moment().format('H')) - 6 && wDate == moment().format('YMMDD')) {
                  switch (time.code) {
                    case '0':
                      icon = 'bi bi-brightness-high-fill';
                      break;
                    case '1':
                      icon = 'bi bi-cloud-sun-fill';
                      break;
                    case '2':
                      icon = 'bi bi-cloud-sun-fill';
                      break;
                    case '3':
                      icon = 'bi bi-cloud-fill';
                      break;
                    case '4':
                      icon = 'bi bi-clouds-fill';
                      break;
                    case '5':
                      icon = 'bi bi-cloud-haze2-fill';
                      break;
                    case '10':
                      icon = 'bi bi-cloud-haze-fill';
                      break;
                    case '45':
                      icon = 'bi bi-cloud-fog-fill';
                      break;
                    case '60':
                      icon = 'bi bi-cloud-drizzle-fill';
                      break;
                    case '61':
                      icon = 'bi bi-cloud-rain-fill';
                      break;
                    case '63':
                      icon = 'bi bi-cloud-rain-heavy-fill';
                      break;
                    case '80':
                      icon = 'bi bi-umbrella-fill';
                      break;
                    case '95':
                      icon = 'bi bi-cloud-lightning-rain-fill';
                      break;
                    case '97':
                      icon = 'bi bi-cloud-lightning-rain-fill';
                      break;
                  }

                  weatherContainer.innerHTML += `
                  <div class="weatherCard">
                    <i class="${icon}"></i>
                    <p class="nameKabupaten">${area.description}</p>
                    <p class="nameCuaca">${time.name}</p>
                    <p>Tanggal data: ${time.datetime.slice(0, 4)}/${time.datetime.slice(4, 6)}/${time.datetime.slice(6, 8)}</p>
                    <p>Waktu data: ${time.datetime.slice(8, 10)}:${time.datetime.slice(10)}</p>
                  </div>
                  `;
                }
              });
            }
          });
        });
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    getQuake();

    document.getElementById('submitBtn').addEventListener('click', (event) => {
      const provinsi = document.getElementById('provinsi');
      const kabupaten = document.getElementById('kabupaten');

      const refProvinsi = provinsi.value.toLowerCase();
      const refKabupaten = kabupaten.value.toLowerCase();

      const dataInput = {
        provinsi: refProvinsi.replace(' ', '-'),
        kabupaten: refKabupaten.replace(' ', '-'),
      };

      getWeather(dataInput);
      console.log(dataInput);

      provinsi.value = '';
      kabupaten.value = '';
    });
  });
};

export default main;
