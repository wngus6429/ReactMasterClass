// 리액트 문법이 없어서 파일 확장자를 ts로 한거임
export async function fetchCoins(){
  return fetch('https://api.coinpaprika.com/v1/coins').then(
    response => response.json())
}