import { Link, useNavigate } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
// import { useAppSelector } from '../../store/store';
// import { signOut } from 'firebase/auth';
// import { auth } from '../../config/firebase';

type Props = {
    setAuth: (value: boolean) => void;
}

export default function SignedInMenu({setAuth}: Props) {
    // const {currentUser} = useAppSelector(state => state.auth);
    const navigate = useNavigate();

    async function handleSignOut() {
        // await signOut(auth)
        setAuth(false);
        navigate('/');
    }

    return (
        <Menu.Item position='right'>
            <Image avatar spaced='right' src={'/user.png'} />
            <Dropdown pointing='top left' text='Bob'>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus' />
                    <Dropdown.Item text='My profile' icon='user' />
                    <Dropdown.Item text='My account' icon='settings' />
                    <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}