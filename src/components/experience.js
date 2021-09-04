import React from 'react';
import { size, first, castArray } from 'lodash';

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
          {size(item.description) > 1 ? (
            <ul class="list-disc px-5">
              {castArray(item.description).map(des => (
                <li className="py-1">{des}</li>
              ))}
            </ul>
          ) : (
            <p className="py-6"> {first(item.description)} </p>
          )}
        </article>
      ))}
  </section>
);

export default Experience;
