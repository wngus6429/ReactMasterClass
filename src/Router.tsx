import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

interface IRouterProps {
  // toggleDark: () => void; //void는 아무것도 없다고
  // isDark: boolean;
}
// function Router({ toggleDark, isDark }: IRouterProps) {
function Router({}: IRouterProps) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/:coinId'>
          {/* <Coin isDark={isDark} /> */}
          <Coin />
        </Route>
        <Route path='/'>
          {/* <Coins toggleDark={toggleDark} /> */}
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
