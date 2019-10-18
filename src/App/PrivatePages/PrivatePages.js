import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import './PrivatePages.scss';

function PrivatePages({
  component: Component, logged, menu, loadLogout, ...rest
}) {
  logged = true;
  return (
    <Route
      {...rest}
      render={props => (logged ? (
        <div className="private-pages">
          <div className="private-pages-content">
            <Component {...props} />
          </div>
        </div>
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      ))}
    />
  );
}

export default PrivatePages;