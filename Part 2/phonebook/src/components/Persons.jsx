import React from 'react';

const Persons = (props) => {

  return (
    <div>
      {props.persons
        .filter((p) => {
          return p.name.toUpperCase().includes(props.newSearch.toUpperCase());
        })
        .map((p) => {
          return (
            <div key={p.id}>
            {p.name} - {p.number}
            <button onClick={()=>{props.handleButtonDelete(p)}}>delete</button>
            </div>
          );
        })}
    </div>
  );
}

export default Persons;