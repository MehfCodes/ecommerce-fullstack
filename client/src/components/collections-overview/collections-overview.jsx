import './collections.overview.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import CollectionPreview from '../collection-preview/collectionPreview';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector';

function CollectionsOverview({ collections }) {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollection }) => (
        <CollectionPreview key={id} {...otherCollection} />
      ))}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});
export default connect(mapStateToProps)(CollectionsOverview);
