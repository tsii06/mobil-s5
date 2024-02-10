import React, { useState } from 'react';
import { IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter, IonToast } from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';
import axios from 'axios';

const Register: React.FC = () => {
    const router = useIonRouter();
    const [formData, setFormData] = useState({
        nom: '',
        adresse: '',
        email: '',
        contact: '',
        mdp: '',
        cin: ''
    });
    const [showToast, setShowToast] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const doRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Appel API pour l'inscription
            await axios.post('https://vaikaback-production.up.railway.app/utilisateur', formData);
            console.log(formData)
            // Redirection vers la page de connexion après inscription réussie
            router.push('/');
        } catch (error) {
            console.error('Error registering:', error);
            setShowToast(true); // Afficher un message d'erreur
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'secondary'}>
                    <IonButton slot='start'>
                        <IonBackButton defaultHref='/'/>
                    </IonButton>
                    <IonTitle>Create Account</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent scrollY={false}>
                <IonGrid fixed>
                    <IonRow className='ion-justify-content-center'>
                        <IonCol sizeLg='6'>
                            <IonCard>
                                <IonCardContent>
                                    <form onSubmit={doRegister}>
                                        <IonInput
                                            name='nom'
                                            value={formData.nom}
                                            onIonChange={handleChange}
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Nom'
                                            type='text'
                                            placeholder='Nom'
                                        />
                                        <IonInput
                                            name='adresse'
                                            value={formData.adresse}
                                            onIonChange={handleChange}
                                            className='ion-margin-top'
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Adresse'
                                            type='text'
                                            placeholder='Adresse'
                                        />
                                        <IonInput
                                            name='email'
                                            value={formData.email}
                                            onIonChange={handleChange}
                                            className='ion-margin-top'
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Email'
                                            type='email'
                                            placeholder='Email'
                                        />
                                        <IonInput
                                            name='contact'
                                            value={formData.contact}
                                            onIonChange={handleChange}
                                            className='ion-margin-top'
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Contact'
                                            type='text'
                                            placeholder='Contact'
                                        />
                                        <IonInput
                                            name='mdp'
                                            value={formData.mdp}
                                            onIonChange={handleChange}
                                            className='ion-margin-top'
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='Mot de passe'
                                            type='password'
                                            placeholder='Mot de passe'
                                        />
                                        <IonInput
                                            name='adresse'
                                            value={formData.cin}
                                            onIonChange={handleChange}
                                            className='ion-margin-top'
                                            labelPlacement='floating'
                                            fill='outline'
                                            label='CIN'
                                            type='text'
                                            placeholder='CIN'
                                        />
                                        <IonButton type='submit' className='ion-margin-top' expand='block'>
                                            Create my account
                                            <IonIcon icon={checkmarkDoneOutline} slot='end'/>
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
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Error registering. Please try again."
                duration={3000}
                color="danger"
            />
        </IonPage>
    );
};

export default Register;
