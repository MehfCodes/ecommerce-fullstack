import React from 'react';
import CollectionItem from './../collection-item/collectionItem';
import './collectionPreview.scss';
function CollectionPreview({ title, items }) {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((item, index) => index < 4)
          .map(({ id, ...otherItems }) => (
            <CollectionItem key={id} {...otherItems} />
          ))}
      </div>
    </div>
  );
}

export default CollectionPreview;
