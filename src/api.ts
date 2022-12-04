const BASE_URL = `https://api.coinpaprika.com/v1`;

// 리액트 문법이 없어서 파일 확장자를 ts로 한거임
export async function fetchCoins(){
  return fetch(`${BASE_URL}/coins`).then(
    response => response.json())
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistroy(coinId:string){
  const endDate = Math.floor(Date.now() / 1000)
  // 일주일전
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`).then((response) =>
    response.json()
  );
}