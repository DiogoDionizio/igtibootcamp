window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
});

// MAP
function doMap(){
  const nameEmailArray = people.results.map(person => {
    return {
      name: person.name,
      email: person.email
    };
  });

  console.log(nameEmailArray);
  return nameEmailArray;
} 

function doFilter(){
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

function doForEach(){
  const mappedPeople = doMap();

  mappedPeople.forEach(person => {
    person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
  });

  console.log(mappedPeople);
}