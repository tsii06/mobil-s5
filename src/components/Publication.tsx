import React, { useEffect, useState } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonItem,
    IonLabel,
    IonCardContent,
    IonText,
    IonList,
    IonButton,
    IonIcon,
    IonRouterLink
} from '@ionic/react';
import { heartOutline } from 'ionicons/icons';
import axios from 'axios';

import { useHistory } from 'react-router-dom'; 

interface PublicationProps {
    publication: {
        userAvatar: string;
        userName: string;
        content: string;
        likes: string;
        comments: number;
        shares: number;
    };

    onFinish: () => void;
}

const Publication: React.FC<PublicationProps> = ({ publication, onFinish }) => {
    const [categorie, setCategorie] = useState<Photo[]>([]);
    const [likesCount, setLikesCount] = useState<number>(0);
    const token = localStorage.getItem('authToken');
    const history = useHistory();
    
    useEffect(() => {
        // Appeler l'API pour obtenir les photos
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`https://vaikaback-production.up.railway.app/photos/${publication.likes}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
                    }
                });
                setCategorie(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        // Appeler l'API pour obtenir le nombre de likes
        const fetchLikesCount = async () => {
            try {
                const response = await axios.get(`https://vaikaback-production.up.railway.app/countByAnnonce/${publication.likes}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
                    }
                });
                setLikesCount(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching likes count:', error);
            }
        };

        fetchPhotos();
        fetchLikesCount();
    }, [token]); // Assurez-vous de mettre à jour l'état en fonction de tout changement dans le token

    const handleDetailsClick = (likes: string) => {
        sessionStorage.setItem('annonceId', likes);
        history.push(`/details`); // Navigation vers la page de détails avec l'ID comme paramètre
    };

    return (
        <IonRouterLink onClick={() => handleDetailsClick(publication.likes)} routerDirection="forward">
            <IonCard>
                <IonCardHeader>
                    {categorie.length > 0 && (
                        <img src={`data:image/jpeg;base64,${categorie[0].path}`} className="card-img-top" alt="Annonce Preview" />
                    )}
                </IonCardHeader>

                <IonCardContent>
                    <IonText>
                        <p>{publication.content}</p>
                    </IonText>
                </IonCardContent>

                <IonList lines="none">
                    <IonItem>
                        <IonButton fill="clear">
                            <IonIcon icon={heartOutline} slot="start" />
                            <IonLabel>{likesCount}</IonLabel>
                        </IonButton>
                    </IonItem>
                </IonList>
            </IonCard>
        </IonRouterLink>
    );
};

export default Publication;
