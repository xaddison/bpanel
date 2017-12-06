import React from 'react';
import PropTypes from 'prop-types';

import './sidebar.scss';
import { pluginMetaProps } from '../../containers/App/App';
import logo from '../../assets/logo.png';

const sidebarItem = ({
  name,
  path,
  icon = 'cog',
  subItem = false,
  children
}) => (
  <Link
    to={path}
    className={`nav-item sidebar-link ${subItem ? 'subItem' : ''}`}
  >
    <div className="sidebar-item">
      <i className={`fa fa-${icon} sidebar-item-icon`} />
      {name}
      {children}
    </div>
  </Link>
);

const Sidebar = ({ sidebarItems }) => {
  const commitHash = process.env.__COMMIT__.slice(0, 7);
  const version = process.env.__VERSION__;
  return (
    <nav className="d-flex flex-column sidebar col-sm-2">
      <Link to="/">
        <div className="sidebar-logo">
          <img src={logo} className="logo" width="60" height="60" />
        </div>
      </Link>
      {sidebarItems.map((plugin, index) => {
        // mapping through each parent item to create the sidebar nav element
        const sidebarItemProps = { ...plugin };
        if (plugin.subItems) {
          // if this sidebar item has sub items
          // then we need to create and append the children elements
          sidebarItemProps.children = plugin.subItems.map(
            (subItem, subIndex) => {
              const props = {
                ...subItem,
                subItem: true,
                key: `${index}-${subIndex}`
              };
              return React.createElement(sidebarItem, props);
            }
          );
        }

        return React.createElement(sidebarItem, {
          ...sidebarItemProps,
          key: index
        });
      })}
      <div className="sidebar-footer mt-auto text-center">
        <h5>bPanel</h5>
        <p className="version subtext text-truncate">version: {version}</p>
        <p className="commit subtext text-truncate">
          commit hash: {commitHash}
        </p>
      </div>
      <div className="col-sm-1" />
    </nav>
  );
};

const sidebarItemPropTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  subItem: PropTypes.bool
};

sidebarItem.propTypes = {
  ...sidebarItemPropTypes,
  children: PropTypes.arrayOf(PropTypes.element)
};

Sidebar.propTypes = {
  sidebarItems: PropTypes.arrayOf(
    PropTypes.shape({
      ...pluginMetaProps,
      subItems: PropTypes.arrayOf(PropTypes.shape(pluginMetaProps))
    })
  )
};

export default Sidebar;
