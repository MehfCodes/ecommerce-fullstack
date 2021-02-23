import { Route } from 'react-router-dom';
import collectionsOverview from '../../components/collections-overview/collections-overview';
import CollectionPage from '../collection/collection-page';

function Shop({ match }) {
  console.log(match);
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={collectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
  );
}

export default Shop;
