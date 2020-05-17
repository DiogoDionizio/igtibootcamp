window.addEventListener('load', () => {
  doMap();
  doFilter();
  doForEach();
  doReduce();
  doFind();
  doSome();
  doEvery();
  doSort();

  // Spread
  doSpread();
  console.log(doRest(1, 2));
  console.log(doRest(1, 2, 1000, 100));

  // Destruring
  doDestructuring();

});

function doDestructuring() {
  const first = people.results[0];

  // Repetitivo
  //const username = first.login.username;
  //const password = first.login.password;

  // Usando destructuring
  const {username, password } = first.login;

  console.log(username);
  console.log(password);
}

function doRest(...numbers){
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

function doSpread(){
  const marriedMen = people.results.filter(person => person.name.title === 'Mr');
  const marriedWoman = people.results.filter(person => person.name.title === 'Ms');

  const marriedPeople = [...marriedMen, ...marriedWoman, {msg: 'oi'}];

  console.log('Casados: ');
  console.log(marriedPeople);
}

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

// Filtrar um array
function doFilter(){
  const olderThan50 = people.results.filter(person => {
    return person.dob.age > 50;
  });

  console.log(olderThan50);
}

// ForEach
function doForEach(){
  const mappedPeople = doMap();

  mappedPeople.forEach(person => {
    person.nameSize = person.name.title.length + person.name.first.length + person.name.last.length;
  });

  console.log(mappedPeople);
}

// Somar as idades
function doReduce(){
  const totalAges = people.results.reduce((accumulator, current) => {
    return accumulator + current.dob.age;
  }, 0);

  console.log(totalAges);
}

function doFind(){
  const found = people.results.find(person => {
    return person.location.state === 'Minas Gerais';
  });

  console.log(found);
}

function doSome(){
  const found = people.results.some(person => {
    return person.location.state === 'Amazonas';
  });

  console.log(found);
}

function doEvery(){
  const every = people.results.every(person => {
    return person.nat === 'BR';
  });

  console.log(every);
}

function doSort() {
  const mappedNames = people.results.map(person => {
    return person.name.first;
  })
  .filter(person => person.startsWith('A'))
  .sort();

  console.log(mappedNames);
}