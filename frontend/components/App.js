// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id

let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs
  const [formValues, setFormValues] = useState({ fname: '', lname: '', bio: '' });
  console.log(members)

  useEffect(() => {
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values

    const member = members.find(member => member.id === editing);
    if (member) {
      setFormValues({ fname: member.fname, lname: member.lname, bio: member.bio });
    }

  }, [editing])

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
    const { name, value } = evt.target;
    setFormValues({ ...formValues, [name]: value });
  }
  const edit = id => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
    setEditing(id);
    console.log(id)
  }
  const submitNewMember = () => {
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state

    setMembers(members.concat({
      fname: formValues.fname,
      lname: formValues.lname,
      bio: formValues.bio
    }));
  }
  const editExistingMember = () => {
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state

    const member = members.findIndex(member => member.id === editing);
    if (member !== 1) {
      const upMembers = [...members];
      upMembers[member] = {
        ...upMembers[member],
        fname: formValues.fname,
        lname: formValues.lname,
        bio: formValues.bio
      }
      
      setMembers(upMembers);
    }
  }
  const onSubmit = evt => {
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting
    evt.preventDefault();
    if (editing) {
      editExistingMember();
    } else {
      submitNewMember();
    }
    
    setFormValues({ fname: '', lname: '', bio: '' });
  }

  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input 
            onChange={onChange} 
            value={formValues.fname} 
            type="text" 
            placeholder="Type First Name" 
            name='fname'
            />
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input 
            onChange={onChange} 
            value={formValues.lname} 
            type="text" 
            placeholder="Type Last Name" 
            name='lname'
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea 
            onChange={onChange} 
            value={formValues.bio}
            placeholder="Type Bio" 
            name='bio'
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
