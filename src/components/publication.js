import React from 'react';

const Publications = ({ data }) => (
  <section>
    <h1 className="section-header">Publications</h1>
    {data.map(item => (
      <article className="my-5" key={item.title}>
        <h2 className="item-header">{item.title}</h2>
        <h3 className="item-sub">{item.publisher}</h3>
        <p className="py-4">{item.description}</p>
      </article>
    ))}
  </section>
);

export default Publications;
