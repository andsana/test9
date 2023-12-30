import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Categories from './containers/Categories/Categories';
import EditCategory from './containers/EditCategory/EditCategory';
import NewCategory from './containers/NewCategory/NewCategory';

function App() {


  return (
    <Layout>
      <Routes>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/update-category/:id" element={<EditCategory/>}/>
        <Route path="/new-category" element={<NewCategory/>}/>
        <Route path="*" element={<h2>Not found</h2>}/>
      </Routes>
    </Layout>
  );
}

export default App;
