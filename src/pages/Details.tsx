import React from 'react';
import {IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonBackButton, IonButtons, IonTabs } from '@ionic/react';
import { Redirect, Route, useParams } from 'react-router';
import { home, images, checkmarkCircle } from 'ionicons/icons'; // Import des icônes Ionicons
import HomeTab from '../details/HomeTab';
import PhotosTab from '../details/PhotoTab';
import StatusTab from '../details/StatusTab';


const Details: React.FC = () => {
    return (

                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/details/home" component={HomeTab}  />
                        <Route path="/details/photos" component={PhotosTab} />
                        <Route path="/details/status" component={StatusTab} />
                        <Route exact path="/details">
                            <Redirect to="/details/home"/>
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="home"href="/details/home">
                            <IonIcon icon={home} />
                            <IonLabel>Accueil</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="photos" href="/details/photos">
                            <IonIcon icon={images} />
                            <IonLabel>Photos</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="status" href="/details/status">
                            <IonIcon icon={checkmarkCircle} />
                            <IonLabel>Statut</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>

    );
};

export default Details;
