import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import MD_view from '../../components/MD_view';
import { useDispatch } from 'react-redux';
import { createTeam } from '../../Redux/Actions/teams';
import { BiLockAlt } from 'react-icons/bi';
import Member_tile from '../../components/member/Member_tile';
import { AiOutlinePlus } from 'react-icons/ai';
import uuid4 from 'uuid4';
function NewTeam_View({ user }) {
  const dispatch = useDispatch();
  const [md, setMd] = useState('');
  let [name, setName] = useState('');
  const [open, setOpen] = useState(true);
  const [description_short, setDescription_short] = useState('');
  //states
  //setters in inputs
  //new sinatra endpoints /POST
  //new redux action
  //check markdown syntax after succ /POST

  //new
  const [roleValue, setRole] = useState('');
  const [members, setMembers] = useState([]);

  //new functions
  function addMember() {
    setMembers([
      ...members,
      {
        id: uuid4(),
        role: '',
      },
    ]);
  }
  //
  function findMemberInMembersAndEditRole({ role, id }) {
    // Function to edit a member by ID
    const editMember = (role, id) => {
      // Use map to create a new array with the edited member
      const updatedMembers = members.map((member) =>
        member.id === id ? { ...member, role: role } : member
      );

      setMembers(updatedMembers);
    };
    //
    editMember(role, id);
  }
  //
  function createTeamFunc() {
    const user_id = user.id;
    const creator = {
      id: 0,
      role: roleValue,
      user_id: user_id,
    };
    console.log(members);
    let priv_members = members;
    priv_members.unshift(creator);
    console.log(priv_members);
    dispatch(
      createTeam({
        name: name,
        creator_id: user_id,
        description_short: description_short,
        description_md: md,
        open: open,
        members: priv_members,
      })
    );
    setMembers([]);
  }
  return (
    <div className='w-100 pt-5' style={{ height: 'max-content' }}>
      <Row className='g-0'>
        <Col className='p-3' xs={12} md={6}>
          <Form.Group className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='title'
              placeholder='Name of the team'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Short description</Form.Label>
            <Form.Control
              as='textarea'
              onChange={(e) => setDescription_short(e.target.value)}
              placeholder='Briefly describe the purpose of this team'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>README.md</Form.Label>
            <MD_view editor={true} md={md} setMd={setMd} />
          </Form.Group>
          {/* <Form.Label>Privacy</Form.Label>
          <div>
            <ToggleButtonGroup type='radio' name='options' defaultValue={open}>
              <ToggleButton
                variant='outline-light'
                //   className='custom-button'
                id='tbg-radio-1'
                onChange={(e) => setOpen(e.target.value)}
                value={true}
              >
                Open
              </ToggleButton>
              <ToggleButton
                variant='outline-light'
                //   className='custom-button'
                id='tbg-radio-2'
                onChange={(e) => setOpen(e.target.value)}
                value={false}
              >
                Private
              </ToggleButton>
            </ToggleButtonGroup>
          </div> */}
        </Col>
        <Col className='p-3' xs={12} md={6}>
          <Form.Group className='w-100 h-100 d-flex flex-column'>
            <Form.Label>Team Size & Roles</Form.Label>
            <div
              className='w-100 border-gray rounded flex-fill p-2'
              style={{ minHeight: '400px' }}
            >
              <small className='text-secondary'>Taken roles</small>
              <Member_tile
                user={user}
                role_input={true}
                set={setRole}
                value={roleValue}
              />
              <small className='text-secondary'>Open roles</small>
              <div id='members-list'>
                {members.map((member) => {
                  return (
                    <Member_tile
                      member={member}
                      findMemberInMembersAndEditRole={
                        findMemberInMembersAndEditRole
                      }
                      role_input={true}
                      // role_input={true}
                      // set={setRole}
                      // value={roleValue}
                    />
                  );
                })}
              </div>
              <div className='w-100 d-flex justify-content-end align-items-center'>
                <div
                  style={{ height: '40px', aspectRatio: 1 / 1 }}
                  className='custom-button border-gray rounded d-flex justify-content-center align-items-center'
                  onClick={addMember}
                >
                  <AiOutlinePlus size={20} />
                </div>
              </div>
            </div>
          </Form.Group>
        </Col>
        <div className='' xs={12}>
          <div className='p-3 w-100 d-flex justify-content-end'>
            <Button variant='outline-light' onClick={() => createTeamFunc()}>
              Create
            </Button>
          </div>
        </div>
      </Row>
    </div>
  );
}

export default NewTeam_View;
