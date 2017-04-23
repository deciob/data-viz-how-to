/* eslint-disable no-unused-vars */
import React from 'react';
import Link from './Link';
/* eslint-enable no-unused-vars */

const Navigation = () => (
  <section className="navigation">
    <div className="navigation-group">
      <Link name='intro'>Intro</Link>
      <Link name='viz' options={{dataset: 'viz1', version: 'a'}}>Viz 1a</Link>
      <Link name='viz' options={{dataset: 'viz1', version: 'b'}}>Viz 1b</Link>
      <Link name='viz' options={{dataset: 'viz2', version: 'a'}}>Viz 2a</Link>
    </div>
  </section>
);

export default Navigation;
