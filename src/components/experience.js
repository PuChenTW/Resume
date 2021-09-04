import React from 'react';
import { map, castArray, get } from 'lodash';

const Experience = ({ data }) => (
  <section>
    <h1 className="section-header">Experience</h1>
    {data &&
      data.map((item, i) => (
        <article className="my-5" key={`${item.company}-${i}`}>
          <h2 className="item-header">{item.role}</h2>
          <h3 className="item-sub">
            {item.company} | {item.start} - {item.end || 'PRESENT'}
          </h3>
          <ul class="list-disc px-5">
            {map(castArray(get(item, 'description')), des => (
              <li className="py-1">{des}</li>
            ))}
          </ul>
        </article>
      ))}
  </section>
);

export default Experience;
