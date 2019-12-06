
const ADD_PERSON = 'ADD_PERSON';
const DELETE_PERSON = 'DELETE_PERSON';


export function addPerson(person) {
  return {
    type: 'ADD_PERSON',
    person,
  };
}

export function deletePerson(person) {
  console.log("deleting.. in action.js");
  return {
    type: 'DELETE_PERSON',
    person,
  };
}
