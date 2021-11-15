import axios from 'axios';
import Aside from '../components/Aside';
import Header from '../components/Header';
import Main from '../components/Main';
import Nav from '../components/Nav';

export default class MainPage {
  constructor({ $app, initState }) {
    this.state = {
      ...initState,
      reviews: [],
      isModalDisplay: false,
    };
    $app.innerHTML = '';
    this.header = new Header({ $app, initState: this.state.curUserId });

    this.nav = new Nav({
      $app,
      initState: { menuList: ['좋아요순', '최신순'], navClassName: 'main' },
    });

    this.main = new Main({
      $app,
      initState: { page: 'main', reviews: this.state.reviews, flexDirection: 'row' },
    });

    this.aside = new Aside({
      $app,
      initState: [...new Set(this.state.reviews.flatMap(review => review.tags))],
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.header.setState(this.state.curUserId);
    this.main.setState({ reviews: this.state.reviews });
    this.aside.setState([...new Set(this.state.reviews.flatMap(review => review.tags))]);
  }

  async init() {
    const { data: reviews } = await axios.get('/reviews/all');
    this.setState({
      ...this.state,
      reviews,
    });
  }
}
