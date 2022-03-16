import {useState} from "react";

import './App.css';

import Header from './components/header/header.component';
import Content from './components/content/content.component';
import Footer from './components/footer/footer.components';

import { SearchTextContext } from "./contexts/searchContext";
import {PageContext} from "./contexts/pageContext";

function App() {

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [nItems, setnItems] = useState(20);

  const SearchContext = {searchText, setSearchText};
  const pageContext = {page, setPage, nItems, setnItems};

  return (
    <div className="App">
      <SearchTextContext.Provider value={SearchContext}>
        <PageContext.Provider value={pageContext}>
          <Header></Header>
          <Content></Content>
          <Footer></Footer>
        </PageContext.Provider>
      </SearchTextContext.Provider>
    </div>
  );
}

export default App;
