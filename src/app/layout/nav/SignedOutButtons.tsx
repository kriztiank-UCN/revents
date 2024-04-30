import { MenuItem, Button } from 'semantic-ui-react';
// import { useAppDispatch } from '../../store/store';
// import { openModal } from '../../common/modals/modalSlice';

type Props = {
    setAuth: (value: boolean) => void;
}

export default function SignedOutButtons({setAuth}: Props) {
    // const dispatch = useAppDispatch();

    return (
        <MenuItem position='right'>
            <Button 
                basic inverted 
                content='Login' 
                // onClick={() => dispatch(openModal({type: 'LoginForm'}))} />
                onClick={() => setAuth(true)} />
            <Button 
                basic 
                inverted content='Register' 
                style={{ marginLeft: '0.5em' }} 
                // onClick={() => dispatch(openModal({type: 'RegisterForm'}))}
            />
        </MenuItem>
    )
}