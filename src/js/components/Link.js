import React, {PropTypes} from 'react';
import Routes from '../Routes';

const Link = ({
  name,
  options,
  children,
  ...props
}) =>
  <a {...props} href={'#' + Routes.generate(name, options)}>{children}</a>;

Link.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default Link;
