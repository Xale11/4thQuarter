import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Context, { useStateContext } from './context/context';
import Cms from './components/Cms';
import AllCothes from './cmsComponents/AllCothes';
import BrandMsg from './cmsComponents/BrandMsg';
import Policies from './cmsComponents/Policies';
import Contact from './cmsComponents/Contact';
import Squad from './cmsComponents/Squad';
import GalleryEditor from './cmsComponents/GalleryEditor';
import Home from './components/Home';
import Brand from './components/Brand';
import Gallery from './components/Gallery';
import ItemPage from './components/ItemPage';
import PoliciesPage from './components/PoliciesPage';
import ContactUs from './components/ContactUs';
import Shop3 from './components/Shop3';
import Cart from './components/Cart';
import Delivery from './cmsComponents/Delivery';
import Login from './components/Login';
import Success from './components/Success';
import Cancel from './components/Cancel';
import { Helmet } from 'react-helmet';



function App() {

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>4th Quarter</title>
      </Helmet>
      <Context>
        {false && <div className="cartAbsolute">
          <Cart></Cart>
        </div>}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Shop3/>}/>
              <Route path="/shop" element={<Shop3/>}/>
              <Route path="/brand" element={<Brand/>}/>
              <Route path="/gallery" element={<Gallery/>}/>
              <Route path="/policies" element={<PoliciesPage/>}/>
              <Route path="/contact" element={<ContactUs/>}/>
              <Route path="/success" element={<Success/>}/>
              <Route path="/cancel" element={<Cancel/>}/>
              <Route path="/cms" element={<Cms/>}/>
              <Route path="/cms/allclothes" element={<AllCothes/>}/>
              <Route path="/cms/brandMsg" element={<BrandMsg/>}/>
              <Route path="/cms/policies" element={<Policies/>}/>
              <Route path="/cms/contact" element={<Contact/>}/>
              <Route path="/cms/squad" element={<Squad/>}/>
              <Route path="/cms/gallery" element={<GalleryEditor/>}/>
              <Route path="/cms/shipping" element={<Delivery/>}/>
              <Route path="/shop/:itemId" element={<ItemPage/>}/>
            </Routes>
          </BrowserRouter>
      </Context>
      
    </div>
  );
}

export default App;
