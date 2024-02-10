import { IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonLoading, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {logInOutline,personCircleOutline} from 'ionicons/icons';
import Intro from '../components/Intro';
import { Preferences } from '@capacitor/preferences';
import axios from 'axios';  // Importer Axios

const INTRO_KEY = 'intro-seen';
const TOKEN_KEY = 'authToken';
const Id_User = 'idUser';

const Login: React.FC = () => {
    const router = useIonRouter();
    const [introSeen,setIntroSeen] = useState(false);
    const [present,dismiss] = useIonLoading();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


const doLogin = async (event: any) => {
    event.preventDefault();
    await present('Logging in ...');

    try {
        const response = await axios.post('https://vaikaback-production.up.railway.app/auth', {
            email: email,
            mdp: password,
          });
    
          if (response.status === 200) {
            const data = response.data;
            console.log('Login successful', data);
            localStorage.setItem(TOKEN_KEY, data.token);
            localStorage.setItem(Id_User, data.user.idUtilisateur);
            router.push('/app', 'root');
          } else {
            console.error('Login failed');
            console.log(response);
          }
    } catch (error) {
        console.error('Error during login:', error);
    } finally {
        dismiss();
    }
};


    useEffect(()=>{
        const checkStorage = async ()=>{
            const seen = await Preferences.get({ key: INTRO_KEY});
            console.log(seen)
            setIntroSeen(seen.value === 'true');
        }
        checkStorage();
    },[]);

    const finishIntro = async() => {

        setIntroSeen(true);
        Preferences.set({key : INTRO_KEY,value: 'true'})
    }

    const seeIntroAgain = () =>{
        setIntroSeen(false)
        Preferences.remove({key : INTRO_KEY})
    }

    return (
        <>
        {!introSeen ? (
            <Intro onFinish={finishIntro}/>
        ):(
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonGrid fixed>
                    <IonRow class='ion-justify-content-center'>
                        <IonCol sizeLg='6'>
                        <IonCard>
                            <IonCardContent>
                            <form onSubmit={doLogin}>
                                        <IonInput
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Email'
                                            type='email'
                                            placeholder='tsiory@gmail.com'
                                            value={email}
                                            onIonChange={(e) => setEmail(e.detail.value!)}
                                        ></IonInput>
                                        <IonInput
                                            className='ion-margin-top'
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Password'
                                            type='password'
                                            placeholder='password'
                                            value={password}
                                            onIonChange={(e) => setPassword(e.detail.value!)}
                                        ></IonInput>
                                        <IonButton type='submit' className='ion-margin-top' expand='block'>
                                            Login
                                            <IonIcon icon={logInOutline} slot='end' />
                                        </IonButton>
                                        <IonButton color={'primary'}  routerLink="/register" type='button' className='ion-margin-top' expand='block'>
                                            Create account
                                        <IonIcon icon={personCircleOutline} slot='end'/>
                                        </IonButton> 
                                        <IonButton onClick={seeIntroAgain} fill='clear' color={'medium'}  size='small' type='button' className='ion-margin-top' expand='block'>
                                            Intro again
                                            <IonIcon icon={personCircleOutline} slot='end'/>
                                        </IonButton>    
                                    </form>
                            </IonCardContent>
                        </IonCard>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                
            </IonContent>
            <IonFooter>
                <IonToolbar>Toolbar</IonToolbar>
            </IonFooter>
        </IonPage>
        )}
        </>
    );
};

export default Login;