// reducers/people.js

const ADD_PERSON = 'ADD_PERSON';
const DELETE_PERSON = 'DELETE_PERSON';


const initialState = { people: [{ start: '2017-09-06 22:30:00',
          end: '2017-09-06 23:30:00',
          title: 'Dr. Mariana Joseph',
          summary: '3412 Piedmont Rd NE, GA 3032',
          color: 'green'}] }

export default function peopleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PERSON:
      return {
        people: [...state.people, action.person],
      };
    case DELETE_PERSON:

      return {
        people: state.people.filter(p => p.start!== action.person.start),
      };
    default:
      return state;
  }
}
