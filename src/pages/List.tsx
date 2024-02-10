import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonSkeletonText, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Publication from '../components/Publication';


const List: React.FC = () => {

    const [annonce, setAnnonces] = useState([]);
    const token = localStorage.getItem('authToken');
    const idUser = localStorage.getItem('idUser');
    

    useEffect(() => {
        loadEquipes();
    }, []);

    const loadEquipes = async () => {
        try {
            setTimeout(async () => {
                const result = await axios.get(`https://vaikaback-production.up.railway.app/annonces/utilisateur/${idUser}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
                }
            });
                setAnnonces(result.data);
                console.log(result.data)
                console.log("idannonc",result.data[0].idAnnonce)
                setLoading(false); 
            }, 1000); 
        } catch (error) {
            console.error("Error fetching equipes:", error);
            setLoading(false); 
        }
    };
    const handleRefresh = async (e) => {
        await loadEquipes();
        e.detail.complete();
    };

    const [loading, setLoading] = useState(true); 

    return (
        <IonPage>
            <IonHeader>              
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonMenuButton></IonMenuButton>
                    </IonButtons>
                    <IonTitle>List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {loading && 
                [...Array(3)].map((_, index)=>(
                    <IonItem key={index}>
                                <IonLabel>
                                    <IonSkeletonText/>
                                </IonLabel>
                                <IonChip/>
                    </IonItem>
                ))}

                <IonList>
                    {
                        annonce.map((annonce, index) => (
                            <Publication
                                key={index}
                                publication={{
                                    userAvatar: annonce.description,
                                    userName: annonce.description,
                                    content: annonce.description,
                                    likes: annonce.idAnnonce,
                                    comments: annonce.statut,
                                    shares: annonce.statut
                                }}
                                onFinish={() => { /* Logique pour terminer la publication */ }}
                            />
                        ))
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default List;

