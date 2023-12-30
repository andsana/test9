import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Categories from './containers/Categories/Categories';
import EditCategory from './containers/EditCategory/EditCategory';
import NewCategory from './containers/NewCategory/NewCategory';
import NewTransaction from './containers/NewTransaction/NewTransaction';
import EditTransaction from './containers/EditTrasaction/EditTransaction';
import Transactions from './containers/Transactions/Transactions';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/new-category" element={<NewCategory/>}/>
        <Route path="/update-category/:id" element={<EditCategory/>}/>
        <Route path="/" element={<Transactions/>}/>
        <Route path="/new-transaction" element={<NewTransaction/>}/>
        <Route path="/update-transaction/:id" element={<EditTransaction/>}/>
        <Route path="*" element={<h2>Not found</h2>}/>
      </Routes>
    </Layout>
  );
}

export default App;
